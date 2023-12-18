import { Component, OnInit } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';

@Component({
  selector: 'app-monthlyweightranking',
  templateUrl: './monthlyweightranking.component.html',
  styleUrls: ['./monthlyweightranking.component.css']
})
export class MonthlyweightrankingComponent implements OnInit {
  barangaylist: any[] = [];
  rankedBarangays: {
    barangay: string;
    severelyUnderweight: number;
    underweight: number;
    normal: number;
  }[] = [];
  selectedMonth: any = '0';
  selectedYear: number = new Date().getFullYear();
  selectedBarangayInfo: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(public database: Database) {
    this.rankBarangays();
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return this.startIndex + this.itemsPerPage;
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  ngOnInit() {
    this.fetchMonthlyWeightRecord();
  }

  fetchMonthlyWeightRecord() {
    const barangayRef = ref(this.database, 'MonthlyWeightRecord');

    get(barangayRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.barangaylist = Object.values(snapshot.val());
        } else {
          this.barangaylist = [];
          console.log(this.barangaylist);
        }
      })
      .catch((error) => {
        console.error('Error retrieving records:', error);
      });
  }

  onMonthYearSelect() {
    this.rankBarangays();
  }

  rankBarangays() {
    const counts: {
      [key: string]: {
        severelyUnderweight: number;
        underweight: number;
        normal: number;
      };
    } = {};

    this.fetchMonthlyWeightRecord();

    // Filter records based on the selected month
    if (this.selectedMonth) {
      this.barangaylist = this.barangaylist.filter((record) => {
        const year = new Date(record.Date).getFullYear();
        const month = new Date(record.Date).getMonth();

        return month == this.selectedMonth && year == this.selectedYear;
      });
    }

    // Group and count by barangay
    for (const record of this.barangaylist) {
      if (!counts[record.barangay]) {
        counts[record.barangay] = {
          severelyUnderweight: 0,
          underweight: 0,
          normal: 0,
        };
      }
      if (record.weightForAge === 'SUW') {
        counts[record.barangay].severelyUnderweight++;
      } else if (record.weightForAge === 'UW') {
        counts[record.barangay].underweight++;
      } else if (record.weightForAge === 'N') {
        counts[record.barangay].normal++;
      }
    }

    // Convert to an array of objects
    this.rankedBarangays = Object.entries(counts).map(([barangay, count]) => ({
      barangay,
      ...count,
    }));

    // Sort by count in descending order
    this.rankedBarangays.sort((a, b) => {
      if (b.severelyUnderweight !== a.severelyUnderweight) {
        return b.severelyUnderweight - a.severelyUnderweight;
      } else if (b.underweight !== a.underweight) {
        return b.underweight - a.underweight;
      } else {
        return b.normal - a.normal;
      }
    });
  }

  // Function to show detailed information for severely underweight individuals
  showModal = false;

  showDetailedInfoByCategory(
    barangayName: string,
    category: string,
    barangayValue: number
  ) {
    // Filter records based on the selected month
    let filteredRecords = this.barangaylist;
    if (this.selectedMonth) {
      this.barangaylist = this.barangaylist.filter((record) => {
        const year = new Date(record.Date).getFullYear();
        const month = new Date(record.Date).getMonth();

        return month == this.selectedMonth && year == this.selectedYear;
      });
    }

    if (barangayValue === 0) {
      return;
    }

    // Filter records for the specific barangay and category
    this.selectedBarangayInfo = filteredRecords.filter(
      (record) =>
        record.barangay === barangayName && record.weightForAge === category
    );

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  getMonth(month: any) {
    if (month === 0) {
      month = 'January';
      return month;
    }

    if (month === 1) {
      month = 'February';
      return month;
    }

    if (month === 2) {
      month = 'March';
      return month;
    }

    if (month === 3) {
      month = 'April';
      return month;
    }

    if (month === 4) {
      month = 'May';
      return month;
    }

    if (month === 5) {
      month = 'June';
      return month;
    }

    if (month === 6) {
      month = 'July';
      return month;
    }

    if (month === 7) {
      month = 'August';
      return month;
    }

    if (month === 8) {
      month = 'September';
      return month;
    }

    if (month === 9) {
      month = 'October';
      return month;
    }

    if (month === 10) {
      month = 'November';
      return month;
    }

    if (month === 11) {
      month = 'December';
      return month;
    }
  }
}

