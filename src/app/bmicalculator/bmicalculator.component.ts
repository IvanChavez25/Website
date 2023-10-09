import { Component } from '@angular/core';

@Component({
  selector: 'app-bmi-calculator',
  templateUrl: './bmicalculator.component.html',
  styleUrls: ['./bmicalculator.component.css']
})
export class BmiCalculatorComponent {
  childName: string = '';
  barangay: string = '';
  weight: number = 0;
  height: number = 0 ;
  age: number = 0;
  bmi: number = 0;
  resultMessage: string = '';
  showResult: boolean = false;
  results: { childName: string, barangay: string, weight: number, height: number, age: number, bmi: number, resultMessage: string }[] = [];

  calculateBMI() {
    const height_m = this.height / 100;
    this.bmi = this.weight / (height_m ** 2);
  
    if (this.age > 5) {
      this.resultMessage = 'Age must be 5 or below';
      return;
    }
  
    if (this.bmi >= 30) {
      this.resultMessage = 'Obese';
    } else if (this.bmi >= 25) {
      this.resultMessage = 'Overweight';
    } else if (this.bmi >= 16) {
      this.resultMessage = 'Healthy weight';
    } else if (this.bmi >= 13) {
      this.resultMessage = 'Underweight';
    } else {
      this.resultMessage = 'Severely underweight';
    }
  
    if (this.age > 5) {
      if (this.bmi >= 30) {
        this.resultMessage += ' (Obese for children)';
      } else if (this.bmi >= 25) {
        this.resultMessage += ' (Overweight for children)';
      } else if (this.bmi >= 16) {
        this.resultMessage += ' (Healthy weight for children)';
      } else if (this.bmi >= 13) {
        this.resultMessage += ' (Underweight for children)';
      } else {
        this.resultMessage += ' (Severely underweight for children)';
      }
    }
  
    const newResult = {
      childName: this.childName,
      barangay: this.barangay,
      weight: this.weight,
      height: this.height,
      age: this.age,
      bmi: this.bmi,
      resultMessage: this.resultMessage
    };
  
    this.results.push(newResult);
  
    this.results.sort((a, b) => a.bmi - b.bmi);
    this.childName = '';
    this.barangay = '';
    this.weight = 0;
    this.height = 0;
    this.age = 0;
  }
  
 }



