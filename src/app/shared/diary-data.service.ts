import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DiaryEntry } from './diary-entry.model';

@Injectable({
  providedIn: 'root'
})
export class DiaryDataService {

  constructor() { }

  diarySubject = new Subject<DiaryEntry[]>();

  diaryEntries: DiaryEntry[] = [
    new DiaryEntry("Jan 1st", "Entry 1"),
    new DiaryEntry("Jan 2nd", "Entry 2"),
    new DiaryEntry("Feb 22nd", "Entry 3"),
  ]

  onDelete(index: number) {
    this.diaryEntries.splice(index, 1);
    this.diarySubject.next(this.diaryEntries);
  }
// push() used to add an element into an array
  onAddDiaryEntry(diaryEntry: DiaryEntry) {
      this.diaryEntries.push(diaryEntry);
      this.diarySubject.next(this.diaryEntries);
  }

  getDiaryEntry(index: number) {
    return {...this.diaryEntries[index]}
  }
}
