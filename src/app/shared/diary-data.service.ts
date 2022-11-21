import { Injectable } from '@angular/core';
import { DiaryEntry } from './diary-entry.model';

@Injectable({
  providedIn: 'root'
})
export class DiaryDataService {

  constructor() { }

  diaryEntry: DiaryEntry[] = [
    new DiaryEntry("Jan 1st", "Entry 1"),
    new DiaryEntry("Jan 2nd", "Entry 2"),
    new DiaryEntry("Feb 22nd", "Entry 3"),
  ]
}
