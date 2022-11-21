import { Component, OnInit } from '@angular/core';
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

  constructor(private diarySrv: DiaryDataService) { }

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

  ngOnDestroy(): void {
    this.diarySubscription.unsubscribe();
  }

}
