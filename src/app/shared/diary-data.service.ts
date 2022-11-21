import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { DiaryEntry } from './diary-entry.model';

@Injectable({
  providedIn: 'root'
})
export class DiaryDataService {

  maxId!: number;

  constructor(private http: HttpClient) { }

  public diarySubject = new Subject<DiaryEntry[]>();

  diaryEntries!: DiaryEntry[];

  onDeleteEntry(id: number) {
    this.http.delete<{ message: string }>('htttp://localhost:3000/remove-entry/' + id)
    .subscribe(jsondata => {
      this.getDiaryEntries();
      console.log('delete');
    })

  }
  // push() used to add an element into an array
  onAddDiaryEntry(diaryEntry: DiaryEntry) {
    this.http.get<{ maxId: number }>('http://localhost:3000/max-id').subscribe((jsonData) => {
      diaryEntry.id = jsonData.maxId + 1;
      this.http.post<{ message: string }>('http://localhost:3000/add-entry', diaryEntry).subscribe(res => {
        this.getDiaryEntries();
      });
    })
    // this.diaryEntries.push(diaryEntry);
    // this.diarySubject.next(this.diaryEntries);
  }

  getDiaryEntries() {
    this.http.get<{ diaryEntries: any}>('http://localhost:3000/diary-entries')
    .pipe(map((responseData: any) => {
      return responseData.diaryEntries.map((entry: {date: string; entry: string; _id: string}) => {
        return {
          date: entry.date,
          entry: entry.entry,
          id: entry._id
        }
      })
    }))
    .subscribe((updateResponse: any) => {
      this.diaryEntries = updateResponse;
      this.diarySubject.next(this.diaryEntries);
    });



  }

  getDiaryEntry(id: number) {
     const index = this.diaryEntries.findIndex(el => {
       return el.id == id
     });
     return this.diaryEntries[index];

    // return {...this.diaryEntries[id]}

  }

  onUpdateEntry(index: number, entry: DiaryEntry) {
    this.http.put<{message: string}>('htttp://localhost:3000/update-entry/'+ identifierName, entry).subscribe( jsonData => {
      console.log(jsonData.message);
      this.getDiaryEntries();
    })
    // this.diaryEntries[paramId] = newEntry;
    // this.diarySubject.next(this.diaryEntries);
  }
}
