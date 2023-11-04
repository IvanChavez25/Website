import { Component } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';
import Chart from 'chart.js/auto';

interface WeightForHeightTotals {
  barangay: string;
  severelyUnderweight: number;
  underweight: number;
  normal: number;
  obese: number;
}

@Component({
  selector: 'app-nutritional-status-summary-weightforheight',
  templateUrl: './nutritional-status-summary-weightforheight.component.html',
  styleUrls: ['./nutritional-status-summary-weightforheight.component.css'],
})
export class NutritionalStatusSummaryWeightforheightComponent {
  nutritionalRecords: any[] = [];
  barangayData: WeightForHeightTotals[] = [];

  selectedMonth: string = 'January';
  lineChart: Chart | null = null;

  constructor(public database: Database) {
    this.fetchNutritionalRecords();
  }

  fetchNutritionalRecords() {
    const nutritionalRef = ref(this.database, 'NutritionalRecord');

    get(nutritionalRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.nutritionalRecords = Object.values(snapshot.val());
          this.calculateTotalsByBarangay();
          this.createLineGraph();
        } else {
          this.nutritionalRecords = [];
        }
      })
      .catch((error) => {
        console.error('Error retrieving records:', error);
      });
  }

  onMonthSelect() {
    this.fetchNutritionalRecords();
  }

  calculateTotalsByBarangay() {
    const groupedData: WeightForHeightTotals[] = [];

    this.nutritionalRecords
      .filter((record) => record.measurementMonth === this.selectedMonth) // Filter by selected month
      .forEach((record) => {
        const barangayName = record.barangay;
        const existingBarangay = groupedData.find(
          (data) => data.barangay === barangayName
        );

        if (existingBarangay) {
          switch (record.weightForHeight) {
            case 'SUW':
              existingBarangay.severelyUnderweight++;
              break;
            case 'UW':
              existingBarangay.underweight++;
              break;
            case 'N':
              existingBarangay.normal++;
              break;
            case 'OW':
              existingBarangay.obese++;
              break;
            default:
              break;
          }
        } else {
          const totals: WeightForHeightTotals = {
            barangay: barangayName,
            severelyUnderweight: 0,
            underweight: 0,
            normal: 0,
            obese: 0,
          };

          switch (record.weightForHeight) {
            case 'SUW':
              totals.severelyUnderweight++;
              break;
            case 'UW':
              totals.underweight++;
              break;
            case 'N':
              totals.normal++;
              break;
            case 'OW':
              totals.obese++;
              break;
            default:
              break;
          }

          groupedData.push(totals);
        }
      });

    this.barangayData = groupedData;
  }

  createLineGraph() {
    const ctx = document.getElementById(
      'lineGraphWeightHeight'
    ) as HTMLCanvasElement;

    const labels = this.barangayData.map((record) => record.barangay);
    const severelyUnderweightData = this.barangayData.map(
      (record) => record.severelyUnderweight
    );
    const underweightData = this.barangayData.map(
      (record) => record.underweight
    );
    const normalData = this.barangayData.map((record) => record.normal);
    const obeseData = this.barangayData.map((record) => record.obese);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Severely Underweight',
            data: severelyUnderweightData,
            borderColor: 'rgba(255, 99, 132, 1)', // Customize color as needed
            fill: false,
          },
          {
            label: 'Underweight',
            data: underweightData,
            borderColor: 'rgba(54, 162, 235, 1)', // Customize color as needed
            fill: false,
          },
          {
            label: 'Normal',
            data: normalData,
            borderColor: 'rgba(75, 192, 192, 1)', // Customize color as needed
            fill: false,
          },
          {
            label: 'Obese',
            data: obeseData,
            borderColor: 'rgba(255, 206, 86, 1)', // Customize color as needed
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              font: {
                size: 12, // Adjust the font size for x-axis labels
              },
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 12, // Adjust the font size for y-axis labels
              },
            },
          },
        },
      },
    });
  }
}
