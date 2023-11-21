import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  set uid(value: string) {
    localStorage.setItem('uid', value);
  }

  get uid(): string {
    return localStorage.getItem('uid') || '';
  }

  logout(): void {
    localStorage.removeItem('uid');
  }
}
