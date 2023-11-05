import { Component, OnInit } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';

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
  }[] = [];
  selectedMonth: string = 'January';

  constructor(public database: Database) {
    this.fetchBmiRecord().then(() => {
      this.rankBarangays();
    });
  }

  async ngOnInit() {
    await this.fetchBmiRecord();
    this.rankBarangays();
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
      console.error('Error retrieving BMI records:', error);
    }
  }

  // Event handler for month selection
  onMonthSelect() {
    this.rankBarangays();
  }

  rankBarangays() {
    const counts: {
      [key: string]: { severelyUnderweight: number; underweight: number };
    } = {};

    this.fetchBmiRecord();
    
    // Filter records based on the selected month
    if (this.selectedMonth) {
      this.barangaylist = this.barangaylist.filter(
        (record) => record.measurementMonth === this.selectedMonth
      );
    }

    // Group and count by barangay
    for (const record of this.barangaylist) {
      if (!counts[record.barangay]) {
        counts[record.barangay] = { severelyUnderweight: 0, underweight: 0 };
      }
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
}
