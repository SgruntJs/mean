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
    this.diarySubscription = this.diarySrv.diarySubject.subscribe(diaryEntries => {
      this.diaryEntries = diaryEntries;
    });
    this.diaryEntries = this.diarySrv.diaryEntries;
  }

  onDelete(index: number) {
      this.diarySrv.onDelete(index);
      this.diaryEntries = this.diarySrv.diaryEntries;
  }

  onEdit(index: number) {
      this.router.navigate(["edit", index]);
  }

  ngOnDestroy(): void {
    this.diarySubscription.unsubscribe();
  }

  getDiaryEntry(index: number) {
    return {...this.diaryEntries[index]}
  }

}
