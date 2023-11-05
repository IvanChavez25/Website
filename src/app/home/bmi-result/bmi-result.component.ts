import { Component } from '@angular/core';
import { Database, ref, get, remove } from '@angular/fire/database';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bmi-result',
  templateUrl: './bmi-result.component.html',
  styleUrls: ['./bmi-result.component.css'],
})
export class BMIResultComponent {
  originalBmiRecords: any[] = [];
  bmiRecords: any[] = [];
  bmiData: any = {};

  selectedBarangay: string = '';
  fromDate: string = '';
  toDate: string = '';
  selectedMeasurementMonth: string = '';

  resultMessage: string = '';
  showResult: boolean = false;
  results: {
    childName: string;
    measurementMonth: string;
    barangay: string;
    weight: number;
    height: number;
    age: number;
    bmi: number;
    resultMessage: string;
  }[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(public database: Database, private location: Location) {
    this.fetchBmiRecords();
  }

  fetchBmiRecords() {
    const baselineRef = ref(this.database, 'BmiRecord');

    get(baselineRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.originalBmiRecords = Object.values(snapshot.val());
          this.bmiRecords = Object.values(snapshot.val());
        } else {
          this.bmiRecords = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving BmiRecord:', error);
      });
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return this.startIndex + this.itemsPerPage;
  }

  filterRecords() {
    // Create a copy of the original data
    let filteredRecords = [...this.originalBmiRecords];

    // Apply the barangay filter
    if (this.selectedBarangay) {
      filteredRecords = filteredRecords.filter(
        (record) => record.barangay === this.selectedBarangay
      );
    }

    // Apply the date range filter if either fromDate or toDate is provided
    if (this.fromDate || this.toDate) {
      filteredRecords = filteredRecords.filter((record) => {
        const recordDate = new Date(record.Date);
        recordDate.setHours(23, 59, 59, 999);

        if (this.fromDate && this.toDate) {
          const fromDateObj = new Date(this.fromDate);
          const toDateObj = new Date(this.toDate);
          toDateObj.setHours(23, 59, 59, 999);

          return recordDate >= fromDateObj && recordDate <= toDateObj;
        } else if (this.fromDate) {
          const fromDateObj = new Date(this.fromDate);
          return recordDate >= fromDateObj;
        } else if (this.toDate) {
          const toDateObj = new Date(this.toDate);
          toDateObj.setHours(23, 59, 59, 999);
          return recordDate <= toDateObj;
        }

        return true; // No date filter applied
      });
    }

    if (this.selectedMeasurementMonth) {
      filteredRecords = filteredRecords.filter(
        (record) => record.measurementMonth === this.selectedMeasurementMonth
      );
    }

    // Update the monthlyHeightRecords with the filtered data
    this.bmiRecords = filteredRecords;
  }

  clearFilters() {
    // Clear the selected barangay, from date, and to date
    this.selectedBarangay = '';
    this.fromDate = '';
    this.toDate = '';
    this.selectedMeasurementMonth = '';

    // Reset the monthlyHeightRecords to the original data
    this.bmiRecords = [...this.originalBmiRecords];
  }

  calculateBMI() {
    const height_m = this.bmiData.height / 100;
    this.bmiData.bmi = this.bmiData.weight / height_m ** 2;

    if (this.bmiData.age > 5) {
      this.bmiData.resultMessage = 'Age must be 5 or below';
      return;
    }

    if (this.bmiData.bmi >= 30) {
      this.bmiData.resultMessage = 'Obese';
    } else if (this.bmiData.bmi >= 25) {
      this.bmiData.resultMessage = 'Overweight';
    } else if (this.bmiData.bmi >= 15) {
      this.bmiData.resultMessage = 'Healthy weight';
    } else if (this.bmiData.bmi >= 12) {
      this.bmiData.resultMessage = 'Underweight';
    } else {
      this.bmiData.resultMessage = 'Severely underweight';
    }

    const newResult = {
      childName: this.bmiData.childName,
      measurementMonth: this.bmiData.measurementMonth,
      barangay: this.bmiData.barangay,
      weight: this.bmiData.weight,
      height: this.bmiData.height,
      age: this.bmiData.age,
      bmi: this.bmiData.bmi,
      resultMessage: this.bmiData.resultMessage,
    };

    this.results.push(newResult);

    this.results.sort((a, b) => a.bmi - b.bmi);
  }

  reloadPage() {
    window.location.reload();
  }

  removeBmi(record: any) {
    const baselineRef = ref(this.database, 'BmiRecord/' + record.bmiRecordsId);

    remove(baselineRef)
      .then(() => {
        alert('BMI record deleted successfully');
        this.fetchBmiRecords();
      })
      .catch((error) => {
        alert('Error deleting BMI records: ' + error);
      });
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
  
}
