import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataServiceService {
  constructor() {}
  private uid: string = '';

  setUid(uid: string) {
    this.uid = uid;
  }

  getUid(): string {
    return this.uid;
  }
}
