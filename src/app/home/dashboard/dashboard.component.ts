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
  rankedBarangays: {
    barangay: string;
    measurementMonth: string;
    severelyUnderweight: number;
    underweight: number;
  }[] = [];

  nutritionalRecords: any[] = [];
  barangayDataAge: WeightForAgeTotals[] = [];

  originalChildRecords: any[] = [];
  childRecords: any[] = [];

  girlsCount: number = 0;
  boysCount: number = 0;

  constructor(public database: Database) {
    this.fetchData();
  }

  async ngOnInit() {
    await this.fetchData();
    await this.fetchChildRecords();
    this.createBarGraph();
    this.createBarGraphAge();
  }

  async fetchData() {
    try {
      await this.fetchBmiRecord();
      await this.fetchNutritionalRecords();
      this.rankBarangays();
    } catch (error) {}
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
      console.error('Error retrieving BMIrecords:', error);
      throw error;
    }
  }

  async fetchNutritionalRecords() {
    const nutritionalRef = ref(this.database, 'NutritionalRecord');

    try {
      const snapshot = await get(nutritionalRef);
      if (snapshot.exists()) {
        this.nutritionalRecords = Object.values(snapshot.val());
        this.calculateTotalsByBarangayAge();
      } else {
        this.nutritionalRecords = [];
      }
    } catch (error) {
      console.error('Error retrieving NutritionalRecord:', error);
      throw error; // Rethrow the error to handle it in fetchData()
    }
  }

  async fetchChildRecords() {
    const childRef = ref(this.database, 'ChildRecord');

    try {
      const snapshot = await get(childRef);

      if (snapshot.exists()) {
        const records = Object.values(snapshot.val());

        this.calculateGirlsAndBoysCount(records);

        // Update the pie chart
        this.updatePieChart();
      } else {
        this.childRecords = [];
      }
    } catch (error) {
      console.error('Error retrieving records:', error);
    }
  }

  calculateGirlsAndBoysCount(records: any[]) {
    this.girlsCount = records.filter(
      (record) => record.gender === 'female'
    ).length;
    this.boysCount = records.filter(
      (record) => record.gender === 'male'
    ).length;
  }

  updatePieChart() {
    const chartElement = document.getElementById(
      'genderChart'
    ) as HTMLCanvasElement;

    if (chartElement) {
      const ctx = chartElement.getContext('2d') as CanvasRenderingContext2D;

      if (ctx) {
        const data = {
          labels: ['Girls', 'Boys'],
          datasets: [
            {
              data: [this.girlsCount, this.boysCount],
              backgroundColor: ['#FF5733', '#3498DB'], // Colors for Girls and Boys
            },
          ],
        };

        new Chart(ctx, {
          type: 'pie',
          data: data,
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Number Of Children In San Juan Batangas',
              },
            },
          },
        });
      } else {
        console.error('Context is null.');
      }
    } else {
      console.error('Element with id "genderChart" not found.');
    }
  }

  onMonthSelect() {
    this.createBarGraph();
  }

  rankBarangays() {
    const counts: {
      [key: string]: { severelyUnderweight: number; underweight: number };
    } = {};

    // Group and count by barangay
    for (const record of this.barangaylist) {
      if (!counts[record.barangay]) {
        counts[record.barangay] = { severelyUnderweight: 0, underweight: 0 };
      }
      const key = `${record.barangay}_${record.measurementMonth}`;
      if (!counts[key]) {
        counts[key] = { severelyUnderweight: 0, underweight: 0 };
      }
      if (record.resultMessage === 'Severely underweight') {
        counts[key].severelyUnderweight++;
      } else if (record.resultMessage === 'Underweight') {
        counts[key].underweight++;
      }
    }

    // Convert to an array of objects with 'measurementMonth'
    this.rankedBarangays = Object.entries(counts).map(([key, count]) => {
      const [barangay, measurementMonth] = key.split('_');
      return {
        barangay,
        measurementMonth, // Add measurementMonth property
        ...count,
      };
    });

    // Sort by measurementMonth and then by barangay
    this.rankedBarangays.sort((a, b) => {
      const monthComparison = a.measurementMonth.localeCompare(
        b.measurementMonth
      );
      if (monthComparison !== 0) {
        return monthComparison;
      }
      return a.barangay.localeCompare(b.barangay);
    });
  }

  calculateTotalsByBarangayAge() {
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

    this.barangayDataAge = groupedData;
  }

  createBarGraph() {
    const ctx = document.getElementById('barGraph') as HTMLCanvasElement;

    // Extract unique months from the rankedBarangays data
    const uniqueMonths = Array.from(
      new Set(this.rankedBarangays.map((entry) => entry.measurementMonth))
    );

    // Initialize data arrays for severely underweight and underweight counts
    const severelyUnderweightData: number[] = []; // Specify the type as number[]
    const underweightData: number[] = [];

    // Loop through unique months and calculate the total counts for each month
    uniqueMonths.forEach((month) => {
      const severelyUnderweightCount = this.rankedBarangays
        .filter((entry) => entry.measurementMonth === month)
        .reduce((total, entry) => total + entry.severelyUnderweight, 0);

      const underweightCount = this.rankedBarangays
        .filter((entry) => entry.measurementMonth === month)
        .reduce((total, entry) => total + entry.underweight, 0);

      severelyUnderweightData.push(severelyUnderweightCount);
      underweightData.push(underweightCount);
    });

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: uniqueMonths,
        datasets: [
          {
            label: 'Total Severely Underweight Count',
            data: severelyUnderweightData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Total Underweight Count',
            data: underweightData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Total Severely Underweight and Underweight Cases by Month',
          },
        },
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

  createBarGraphAge() {
    const ctx = document.getElementById('barGraphAge') as HTMLCanvasElement;

    const labels = this.barangayDataAge.map((record) => record.barangay);
    const severelyUnderweightData = this.barangayDataAge.map(
      (record) => record.severelyUnderweight
    );
    const underweightData = this.barangayDataAge.map(
      (record) => record.underweight
    );
    const normalWeightData = this.barangayDataAge.map(
      (record) => record.normalWeight
    );
    const overweightData = this.barangayDataAge.map(
      (record) => record.overweight
    );

    new Chart(ctx, {
      type: 'bar', // Change the type to 'bar' for a bar graph
      data: {
        labels,
        datasets: [
          {
            label: 'SUW',
            data: severelyUnderweightData,
            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Customize bar color as needed
          },
          {
            label: 'UW',
            data: underweightData,
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Customize bar color as needed
          },
          {
            label: 'NW',
            data: normalWeightData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Customize bar color as needed
          },
          {
            label: 'OW',
            data: overweightData,
            backgroundColor: 'rgba(255, 206, 86, 0.6)', // Customize bar color as needed
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Weight For Age', // Add your chart title here
          },
        },
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
}
