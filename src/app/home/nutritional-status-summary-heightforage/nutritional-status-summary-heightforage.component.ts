import { Component } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';
import Chart from 'chart.js/auto';

interface HeightForAgeTotals {
  barangay: string;
  severelyStunted: number;
  stunted: number;
  normal: number;
  tall: number;
}

@Component({
  selector: 'app-nutritional-status-summary-heightforage',
  templateUrl: './nutritional-status-summary-heightforage.component.html',
  styleUrls: ['./nutritional-status-summary-heightforage.component.css'],
})
export class NutritionalStatusSummaryHeightforageComponent {
  nutritionalRecords: any[] = [];
  barangayData: HeightForAgeTotals[] = [];

  selectedMonth: string = 'January';

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
    const groupedData: HeightForAgeTotals[] = [];

    this.nutritionalRecords
      .filter((record) => record.measurementMonth === this.selectedMonth) // Filter by selected month
      .forEach((record) => {
        const barangayName = record.barangay;
        const existingBarangay = groupedData.find(
          (data) => data.barangay === barangayName
        );

      if (existingBarangay) {
        switch (record.heightForAge) {
          case 'SSt':
            existingBarangay.severelyStunted++;
            break;
          case 'St':
            existingBarangay.stunted++;
            break;
          case 'N':
            existingBarangay.normal++;
            break;
          case 'T':
            existingBarangay.tall++;
            break;
          default:
            break;
        }
      } else {
        const totals: HeightForAgeTotals = {
          barangay: barangayName,
          severelyStunted: 0,
          stunted: 0,
          normal: 0,
          tall: 0,
        };

        switch (record.heightForAge) {
          case 'SSt':
            totals.severelyStunted++;
            break;
          case 'St':
            totals.stunted++;
            break;
          case 'N':
            totals.normal++;
            break;
          case 'T':
            totals.tall++;
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
    const ctx = document.getElementById('lineGraphHeight') as HTMLCanvasElement;

    const labels = this.barangayData.map((record) => record.barangay);
    const severelyStuntedData = this.barangayData.map(
      (record) => record.severelyStunted
    );
    const stuntedData = this.barangayData.map((record) => record.stunted);
    const normalData = this.barangayData.map((record) => record.normal);
    const tallData = this.barangayData.map((record) => record.tall);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Severely Stunted',
            data: severelyStuntedData,
            borderColor: 'rgba(255, 99, 132, 1)', // Customize color as needed
            fill: false,
          },
          {
            label: 'Stunted',
            data: stuntedData,
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
            label: 'Tall',
            data: tallData,
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
