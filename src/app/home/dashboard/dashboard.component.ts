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

interface HeightForAgeTotals {
  barangay: string;
  severelyStunted: number;
  stunted: number;
  normal: number;
  tall: number;
}

interface WeightForHeightTotals {
  barangay: string;
  severelyUnderweight: number;
  underweight: number;
  normal: number;
  obese: number;
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
    healthyweight: number;
    overweight: number;
    obese: number;
  }[] = [];
  selectedMonth: any = '0';
  selectedYear: number = new Date().getFullYear();
  selectedBarangayInfo: any[] = [];

  nutritionalRecords: any[] = [];
  barangayDataAge: WeightForAgeTotals[] = [];
  barangayData: HeightForAgeTotals[] = [];
  barangayDataWH: WeightForHeightTotals[] = [];

  originalChildRecords: any[] = [];
  childRecords: any[] = [];

  girlsCount: number = 0;
  boysCount: number = 0;

  constructor(public database: Database) {
    this.fetchData();
    this.rankBarangays();
  }

  async ngOnInit() {
    await this.fetchData();
    await this.fetchChildRecords();
    await this.fetchBmiRecord();
    this.createBarChart();
    this.createBarGraphAge();
    this.createBarGraphHeight();
    this.createBarGraphWH();
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

    get(barangayRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.barangaylist = Object.values(snapshot.val());
          this.createBarChart();
        } else {
          this.barangaylist = [];
          console.log(this.barangaylist);
        }
      })
      .catch((error) => {
        console.error('Error retrieving records:', error);
      });
  }

  async fetchNutritionalRecords() {
    const nutritionalRef = ref(this.database, 'NutritionalRecord');

    try {
      const snapshot = await get(nutritionalRef);
      if (snapshot.exists()) {
        this.nutritionalRecords = Object.values(snapshot.val());
        this.calculateTotalsByBarangayAge();
        this.calculateTotalsByBarangayHeight();
        this.calculateTotalsByBarangayWH();
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

  onYearFilterChange() {
    this.rankBarangays();
    this.createBarChart();
  }

  onMonthYearSelect() {
    this.rankBarangays();
    this.createBarChart();
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

  rankBarangays() {
    const counts: {
      [key: string]: {
        severelyUnderweight: number;
        underweight: number;
        healthyweight: number;
        overweight: number;
        obese: number;
      };
    } = {};

    this.fetchBmiRecord();

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
          healthyweight: 0,
          overweight: 0,
          obese: 0,
        };
      }
      if (record.resultMessage === 'Severely underweight') {
        counts[record.barangay].severelyUnderweight++;
      } else if (record.resultMessage === 'Underweight') {
        counts[record.barangay].underweight++;
      } else if (record.resultMessage === 'Healthy weight') {
        counts[record.barangay].healthyweight++;
      } else if (record.resultMessage === 'Overweight') {
        counts[record.barangay].overweight++;
      } else if (record.resultMessage === 'Obese') {
        counts[record.barangay].obese++;
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
      } else if (b.healthyweight !== a.healthyweight) {
        return b.healthyweight - a.healthyweight;
      } else if (b.overweight !== a.overweight) {
        return b.overweight - a.overweight;
      } else {
        return b.obese - a.obese;
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
        record.barangay === barangayName && record.resultMessage === category
    );

    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
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

    this.barangayData = groupedData;
  }

  calculateTotalsByBarangayWH() {
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

    this.barangayDataWH = groupedData;
  }

  createBarChart() {
    const ctx = document.getElementById('bmiChart') as HTMLCanvasElement;

    // dinagdag koo
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    const filteredData = this.barangaylist.filter((record) => {
      const recordYear = new Date(record.Date).getFullYear();
      return recordYear === this.selectedYear;
    });

    //hangangditoo

    // Calculate counts for each month in the selected year
    const countsPerMonth: {
      [key: string]: { severelyUnderweight: number; underweight: number };
    } = {};

    filteredData.forEach((record) => {
      const month = this.getMonth(new Date(record.Date).getMonth());
      const resultMessage = record.resultMessage;

      if (!countsPerMonth[month]) {
        countsPerMonth[month] = {
          severelyUnderweight: 0,
          underweight: 0,
          // Add other categories here...
        };
      }

      if (resultMessage === 'Severely underweight') {
        countsPerMonth[month].severelyUnderweight++;
      } else if (resultMessage === 'Underweight') {
        countsPerMonth[month].underweight++;
      }
      // Add other category counts similarly...
    });

    // Extract counts for each category
    const labels = Object.keys(countsPerMonth);
    const severelyUnderweightData = Object.values(countsPerMonth).map(
      (countObj) => countObj.severelyUnderweight
    );
    const underweightData = Object.values(countsPerMonth).map(
      (countObj) => countObj.underweight
    );
    // Add other categories similarly...

    // Create the chart with filtered data
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Severely Underweight',
            data: severelyUnderweightData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Underweight',
            data: underweightData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          // Add other datasets for different categories similarly...
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `Total Severely Underweight and Underweight Cases for ${this.selectedYear}`,
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 7,
              },
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 7,
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

  createBarGraphHeight() {
    const ctx = document.getElementById('barGraphHeight') as HTMLCanvasElement;

    const labels = this.barangayDataAge.map((record) => record.barangay);
    const severelyStuntedData = this.barangayData.map(
      (record) => record.severelyStunted
    );
    const stuntedData = this.barangayData.map((record) => record.stunted);
    const normalData = this.barangayData.map((record) => record.normal);
    const tallData = this.barangayData.map((record) => record.tall);

    new Chart(ctx, {
      type: 'bar', // Change the type to 'bar' for a bar graph
      data: {
        labels,
        datasets: [
          {
            label: 'SSt',
            data: severelyStuntedData,
            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Customize bar color as needed
          },
          {
            label: 'St',
            data: stuntedData,
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Customize bar color as needed
          },
          {
            label: 'N',
            data: normalData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Customize bar color as needed
          },
          {
            label: 'T',
            data: tallData,
            backgroundColor: 'rgba(255, 206, 86, 0.6)', // Customize bar color as needed
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

  createBarGraphWH() {
    const ctx = document.getElementById('barGraphWH') as HTMLCanvasElement;

    const labels = this.barangayDataWH.map((record) => record.barangay);
    const severelyUnderweightData = this.barangayData.map(
      (record) => record.severelyStunted
    );
    const underweightData = this.barangayDataWH.map(
      (record) => record.underweight
    );
    const normalData = this.barangayDataWH.map((record) => record.normal);
    const obeseData = this.barangayDataWH.map((record) => record.obese);

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
            label: 'N',
            data: normalData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Customize bar color as needed
          },
          {
            label: 'O',
            data: obeseData,
            backgroundColor: 'rgba(255, 206, 86, 0.6)', // Customize bar color as needed
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
}
