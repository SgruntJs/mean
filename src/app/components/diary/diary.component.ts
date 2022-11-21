import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DiaryDataService } from 'src/app/shared/diary-data.service';
import { DiaryEntry } from 'src/app/shared/diary-entry.model';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  diaryEntries!: DiaryEntry[];
  diarySubscription = new Subscription();

  constructor(private diarySrv: DiaryDataService, private router: Router) { }

  ngOnInit(): void {
    this.diarySrv.getDiaryEntries();
    this.diarySubscription = this.diarySrv.diarySubject.subscribe(diaryEntries => {
      this.diaryEntries = diaryEntries;
    });
    
  }

  onDelete(index: string) {
      this.diarySrv.onDeleteEntry(index);
      console.log(index)
      this.diaryEntries = this.diarySrv.diaryEntries;
  }

  onEdit(index: string) {
      this.router.navigate(["edit", index]);
  }

  ngOnDestroy(): void {
    this.diarySubscription.unsubscribe();
  }



}
