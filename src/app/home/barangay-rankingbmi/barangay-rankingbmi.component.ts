import { Component, OnInit } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';

@Component({
  selector: 'app-barangay-rankingbmi',
  templateUrl: './barangay-rankingbmi.component.html',
  styleUrls: ['./barangay-rankingbmi.component.css'],
})
export class BarangayRankingbmiComponent implements OnInit {
  barangaylist: any[] = [];

  rankedBarangays: { barangay: string; count: number }[] = [];

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
      console.error('Error retrieving familyrecords:', error);
    }
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

}