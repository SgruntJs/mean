import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DiaryDataService } from 'src/app/shared/diary-data.service';
import { DiaryEntry } from 'src/app/shared/diary-entry.model';
import { DiaryComponent } from '../diary/diary.component';

@Component({
  selector: 'app-diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.scss']
})
export class DiaryFormComponent implements OnInit {

  diaryForm!: FormGroup;
  editMode = false;
  diaryEntry!: DiaryEntry;
  paramId!: string;

  constructor(private diarySrv: DiaryDataService, private router: Router, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.editMode = true;
        this.paramId = paramMap.get('id')!;// dato che è una string lo trasformaimo in number con il + e il ! che dic eche non è null
        this.diaryEntry = this.diarySrv.getDiaryEntry(this.paramId);
      } else {
        this.editMode = false;
      }
    });
    this.diaryForm = new FormGroup({
      "date": new FormControl(this.editMode ? this.diaryEntry.date : '', [Validators.required]),
      "entry": new FormControl(this.editMode ? this.diaryEntry.entry : '', [Validators.required])
    })
  }

  onSubmit() {
    const entry = new DiaryEntry('', this.diaryForm.value.date, this.diaryForm.value.entry);
    if (this.editMode) {
      entry.id = this.paramId;
      this.diarySrv.onUpdateEntry(this.paramId, entry)
    } else {
      this.diarySrv.onAddDiaryEntry(entry);
      console.log('entry', entry)
    }
    // console.log('entry', entry)
    this.router.navigateByUrl("/");
  }

}
