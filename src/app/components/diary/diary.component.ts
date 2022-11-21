import { Component, OnInit } from '@angular/core';
import { DiaryDataService } from 'src/app/shared/diary-data.service';
import { DiaryEntry } from 'src/app/shared/diary-entry.model';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss']
})
export class DiaryComponent implements OnInit {

  diaryEntries!: DiaryEntry[];

  constructor(private diaryStrv: DiaryDataService) { }

  ngOnInit(): void {
    this.diaryEntries = this.diaryStrv.diaryEntry;
  }

}
