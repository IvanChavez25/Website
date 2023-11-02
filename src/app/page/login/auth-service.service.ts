import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private _uid!: string;

  set uid(value: string) {
    this._uid = value;
  }

  get uid(): string {
    return this._uid;
  }
}