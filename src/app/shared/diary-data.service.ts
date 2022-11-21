import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DiaryEntry } from './diary-entry.model';

@Injectable({
  providedIn: 'root'
})
export class DiaryDataService {

  constructor(private http: HttpClient) { }

  public diarySubject = new Subject<DiaryEntry[]>();

  diaryEntries: DiaryEntry[] = []

  onDelete(index: number) {
    this.diaryEntries.splice(index, 1);
    this.diarySubject.next(this.diaryEntries);
  }
// push() used to add an element into an array
  onAddDiaryEntry(diaryEntry: DiaryEntry) {
      this.diaryEntries.push(diaryEntry);
      this.diarySubject.next(this.diaryEntries);
  }

  getDiaryEntries() {
    this.http.get<{diaryEntries: DiaryEntry[]}>('localhost:3000/diary-entries').subscribe( jsonData => {
      this.diaryEntries = jsonData.diaryEntries;
    } );
    this.diarySubject.next(this.diaryEntries);
  }

  getDiaryEntry(index: number) {

    return {...this.diaryEntries[index]}
  }

  onUpdateEntry(paramId: number, newEntry: DiaryEntry) {
      this.diaryEntries[paramId] = newEntry;
      this.diarySubject.next(this.diaryEntries);
  }
}
