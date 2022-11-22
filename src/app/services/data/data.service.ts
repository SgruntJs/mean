import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public isUpdated: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  onSendTrueUpdate(value: boolean) {
    this.isUpdated.next(value);
  }

  onReceiveTrueEdited() {
    return this.isUpdated.asObservable();
  }
}
