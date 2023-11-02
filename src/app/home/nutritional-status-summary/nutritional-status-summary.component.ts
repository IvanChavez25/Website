import { Component } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';
import Chart from 'chart.js/auto';

interface WeightForAgeTotals {
  barangay: string;
  severelyUnderweight: number;
  underweight: number;
  normalWeight: number;
  overweight: number;
}

@Component({
  selector: 'app-nutritional-status-summary',
  templateUrl: './nutritional-status-summary.component.html',
  styleUrls: ['./nutritional-status-summary.component.css'],
})
export class NutritionalStatusSummaryComponent {
  nutritionalRecords: any[] = [];
  barangayData: WeightForAgeTotals[] = [];

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

  calculateTotalsByBarangay() {
    const groupedData: WeightForAgeTotals[] = [];

    this.nutritionalRecords.forEach((record) => {
      const barangayName = record.barangay;
      const existingBarangay = groupedData.find(
        (data) => data.barangay === barangayName
      );

      if (existingBarangay) {
        switch (record.weightForAge) {
          case 'SUW':
            existingBarangay.severelyUnderweight++;
            break;
          case 'UW':
            existingBarangay.underweight++;
            break;
          case 'N':
            existingBarangay.normalWeight++;
            break;
          case 'OW':
            existingBarangay.overweight++;
            break;
          default:
            break;
        }
      } else {
        const totals: WeightForAgeTotals = {
          barangay: barangayName,
          severelyUnderweight: 0,
          underweight: 0,
          normalWeight: 0,
          overweight: 0,
        };

        switch (record.weightForAge) {
          case 'SUW':
            totals.severelyUnderweight++;
            break;
          case 'UW':
            totals.underweight++;
            break;
          case 'N':
            totals.normalWeight++;
            break;
          case 'OW':
            totals.overweight++;
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
    const ctx = document.getElementById('lineGraph') as HTMLCanvasElement;

    const labels = this.barangayData.map((record) => record.barangay);
    const severelyUnderweightData = this.barangayData.map((record) => record.severelyUnderweight);
    const underweightData = this.barangayData.map((record) => record.underweight);
    const normalWeightData = this.barangayData.map((record) => record.normalWeight);
    const overweightData = this.barangayData.map((record) => record.overweight);

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
            label: 'Normal Weight',
            data: normalWeightData,
            borderColor: 'rgba(75, 192, 192, 1)', // Customize color as needed
            fill: false,
          },
          {
            label: 'Overweight',
            data: overweightData,
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

