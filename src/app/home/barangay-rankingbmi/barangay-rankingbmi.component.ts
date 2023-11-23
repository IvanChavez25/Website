import { Component, OnInit } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-barangay-rankingbmi',
  templateUrl: './barangay-rankingbmi.component.html',
  styleUrls: ['./barangay-rankingbmi.component.css'],
})
export class BarangayRankingbmiComponent implements OnInit {
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

  constructor(public database: Database) {
    this.rankBarangays();
  }

  ngOnInit() {
    this.fetchBmiRecord();
  }

  fetchBmiRecord() {
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

  onYearFilterChange() {
    this.rankBarangays();
    this.createBarChart();
  }

  // Event handler for month selection
  onMonthYearSelect() {
    this.rankBarangays();
    this.createBarChart();
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
}
