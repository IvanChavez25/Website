import { Component } from '@angular/core';
import { Renderer2, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-monthly-dropdown',
  templateUrl: './monthly-dropdown.component.html',
  styleUrls: ['./monthly-dropdown.component.css'],
})
export class MonthlyDropdownComponent {
  isDropdownOpen = false;
  clickListener: (() => void) | null = null;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;

    if (this.isDropdownOpen) {
      this.clickListener = this.renderer.listen(
        'document',
        'click',
        (event: Event) => this.closeDropdownOutside(event)
      );
    } else if (this.clickListener) {
      this.clickListener();
    }
  }

  closeDropdownOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
      if (this.clickListener) {
        this.clickListener();
      }
    }
  }
  ngOnDestroy() {
    if (this.clickListener) {
      this.clickListener();
    }
  }
}
