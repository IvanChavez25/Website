import { Component, OnInit } from '@angular/core';
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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  barangaylist: any[] = [];
  rankedBarangays: { barangay: string; count: number }[] = [];

  nutritionalRecords: any[] = [];
  barangayData: WeightForAgeTotals[] = [];

  constructor(public database: Database) {
    this.fetchBmiRecord().then(() => {
      this.rankBarangays();
    });
    this.fetchNutritionalRecords();
  }

  async ngOnInit() {
    await this.fetchBmiRecord();
    this.rankBarangays();
    this.createBarGraph();
  }

  async fetchBmiRecord() {
    const barangayRef = ref(this.database, 'BmiRecord');
    try {
      const snapshot = await get(barangayRef);
      if (snapshot.exists()) {
        this.barangaylist = Object.values(snapshot.val());
      } else {
        this.barangaylist = [];
      }
    } catch (error) {
      console.error('Error retrieving familyrecords:', error);
    }
  }

  async fetchNutritionalRecords() {
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

  rankBarangays() {
    const counts: { [key: string]: number } = {};

    this.fetchBmiRecord();

    // Group and count by barangay
    const filteredRecords = this.barangaylist.filter(
      (record) =>
        record.resultMessage === 'Underweight' ||
        record.resultMessage === 'Severely underweight'
    );

    // Group and count by barangay
    for (const record of filteredRecords) {
      if (counts[record.barangay]) {
        counts[record.barangay]++;
      } else {
        counts[record.barangay] = 1;
      }
    }

    // Convert to an array of objects
    this.rankedBarangays = Object.entries(counts).map(([barangay, count]) => ({
      barangay,
      count,
    }));

    // Sort by count in descending order
    this.rankedBarangays.sort((a, b) => b.count - a.count);
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

  createBarGraph() {
    const ctx = document.getElementById('barGraph') as HTMLCanvasElement;
    const labels = this.rankedBarangays.map((barangay) => barangay.barangay);
    const data = this.rankedBarangays.map((barangay) => barangay.count);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Severely Underweight and Underweight Count',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              font: {
                size: 5, // Adjust the font size for x-axis labels
              },
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 5, // Adjust the font size for y-axis labels
              },
            },
          },
        },
      },
    });
  }

  createLineGraph() {
    const ctx = document.getElementById('lineGraph') as HTMLCanvasElement;

    const labels = this.barangayData.map((record) => record.barangay);
    const severelyUnderweightData = this.barangayData.map(
      (record) => record.severelyUnderweight
    );
    const underweightData = this.barangayData.map(
      (record) => record.underweight
    );
    const normalWeightData = this.barangayData.map(
      (record) => record.normalWeight
    );
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