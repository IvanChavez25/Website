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

interface WeightForHeightTotals {
  barangay: string;
  severelyUnderweight: number;
  underweight: number;
  normal: number;
  obese: number;
}

interface HeightForAgeTotals {
  barangay: string;
  severelyStunted: number;
  stunted: number;
  normal: number;
  tall: number;
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
    severelyUnderweight: number;
    underweight: number;
  }[] = [];

  nutritionalRecords: any[] = [];
  barangayDataAge: WeightForAgeTotals[] = [];
  barangayDataHeight: WeightForHeightTotals[] = [];
  barangayDataHeightAge: HeightForAgeTotals[] = [];

  constructor(public database: Database) {
    this.fetchData();
  }

  async ngOnInit() {
    await this.fetchData();
    this.createBarGraph();
    this.createLineGraphAge();
    this.createLineGraphHeight();
    this.createLineGraphHeightAge();
  }

  async fetchData() {
    try {
      await this.fetchBmiRecord();
      await this.fetchNutritionalRecords();
      this.rankBarangays();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
        this.calculateTotalsByBarangayHeight();
        this.calculateTotalsByBarangayHeightAge();
      } else {
        this.nutritionalRecords = [];
      }
    } catch (error) {
      console.error('Error retrieving NutritionalRecord:', error);
      throw error; // Rethrow the error to handle it in fetchData()
    }
  }

  rankBarangays() {
    const counts: {
      [key: string]: { severelyUnderweight: number; underweight: number };
    } = {};

    this.fetchBmiRecord();

    // Group and count by barangay
    const filteredRecords = this.barangaylist.filter(
      (record) =>
        record.resultMessage === 'Severely underweight' ||
        record.resultMessage === 'Underweight'
    );

    // Group and count by barangay
    for (const record of this.barangaylist) {
      if (!counts[record.barangay]) {
        counts[record.barangay] = { severelyUnderweight: 0, underweight: 0 };
      }
    }

    for (const record of this.barangaylist) {
      if (record.resultMessage === 'Severely underweight') {
        counts[record.barangay].severelyUnderweight++;
      } else if (record.resultMessage === 'Underweight') {
        counts[record.barangay].underweight++;
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
      } else {
        return b.underweight - a.underweight;
      }
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

  calculateTotalsByBarangayHeight() {
    const groupedData: WeightForHeightTotals[] = [];

    this.nutritionalRecords.forEach((record) => {
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

    this.barangayDataHeight = groupedData;
  }

  calculateTotalsByBarangayHeightAge() {
    const groupedData: HeightForAgeTotals[] = [];

    this.nutritionalRecords.forEach((record) => {
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

    this.barangayDataHeightAge = groupedData;
  }

  createBarGraph() {
    const ctx = document.getElementById('barGraph') as HTMLCanvasElement;
    const labels = this.rankedBarangays.map((barangay) => barangay.barangay);
    const severelyUnderweightData = this.rankedBarangays.map(
      (barangay) => barangay.severelyUnderweight
    );
    const underweightData = this.rankedBarangays.map(
      (barangay) => barangay.underweight
    );

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Severely Underweight Count',
            data: severelyUnderweightData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Underweight Count',
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
            text: 'BMI Result SUW and UW',
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

  createLineGraphAge() {
    const ctx = document.getElementById('lineGraph') as HTMLCanvasElement;

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
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'SUW',
            data: severelyUnderweightData,
            borderColor: 'rgba(255, 99, 132, 1)', // Customize color as needed
            fill: false,
          },
          {
            label: 'UW',
            data: underweightData,
            borderColor: 'rgba(54, 162, 235, 1)', // Customize color as needed
            fill: false,
          },
          {
            label: 'NW',
            data: normalWeightData,
            borderColor: 'rgba(75, 192, 192, 1)', // Customize color as needed
            fill: false,
          },
          {
            label: 'OW',
            data: overweightData,
            borderColor: 'rgba(255, 206, 86, 1)', // Customize color as needed
            fill: false,
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

  createLineGraphHeight() {
    const ctx = document.getElementById(
      'lineGraphWeightHeight'
    ) as HTMLCanvasElement;

    const labels = this.barangayDataHeight.map((record) => record.barangay);
    const severelyUnderweightData = this.barangayDataHeight.map(
      (record) => record.severelyUnderweight
    );
    const underweightData = this.barangayDataHeight.map(
      (record) => record.underweight
    );
    const normalData = this.barangayDataHeight.map((record) => record.normal);
    const obeseData = this.barangayDataHeight.map((record) => record.obese);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'SUW',
            data: severelyUnderweightData,
            borderColor: 'rgba(255, 99, 132, 1)', // Customize color as needed
            fill: false,
          },
          {
            label: 'UW',
            data: underweightData,
            borderColor: 'rgba(54, 162, 235, 1)', // Customize color as needed
            fill: false,
          },
          {
            label: 'N',
            data: normalData,
            borderColor: 'rgba(75, 192, 192, 1)', // Customize color as needed
            fill: false,
          },
          {
            label: 'O',
            data: obeseData,
            borderColor: 'rgba(255, 206, 86, 1)', // Customize color as needed
            fill: false,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Weight For Height', // Add your chart title here
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

  createLineGraphHeightAge() {
    const ctx = document.getElementById('lineGraphHeight') as HTMLCanvasElement;

    const labels = this.barangayDataHeightAge.map((record) => record.barangay);
    const severelyStuntedData = this.barangayDataHeightAge.map(
      (record) => record.severelyStunted
    );
    const stuntedData = this.barangayDataHeightAge.map(
      (record) => record.stunted
    );
    const normalData = this.barangayDataHeightAge.map(
      (record) => record.normal
    );
    const tallData = this.barangayDataHeightAge.map((record) => record.tall);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'SSt',
            data: severelyStuntedData,
            borderColor: 'rgba(255, 99, 132, 1)', // Customize color as needed
            fill: false,
          },
          {
            label: 'St',
            data: stuntedData,
            borderColor: 'rgba(54, 162, 235, 1)', // Customize color as needed
            fill: false,
          },
          {
            label: 'N',
            data: normalData,
            borderColor: 'rgba(75, 192, 192, 1)', // Customize color as needed
            fill: false,
          },
          {
            label: 'T',
            data: tallData,
            borderColor: 'rgba(255, 206, 86, 1)', // Customize color as needed
            fill: false,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Height For Age', // Add your chart title here
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
