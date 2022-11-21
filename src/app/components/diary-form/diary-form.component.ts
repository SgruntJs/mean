import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private diarySrv: DiaryDataService, private router: Router, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe( paramMap => {
        if(paramMap.has('id')) {
              this.editMode = true;
        } else {
          this.editMode = false;
        }
    });
    this.diaryForm = new FormGroup({
      "date": new FormControl(null, [Validators.required]),
      "entry": new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    
    const newEntry = new DiaryEntry(this.diaryForm.value.date, this.diaryForm.value.entry);
    console.log(newEntry);
    this.diarySrv.onAddDiaryEntry(newEntry);
    this.router.navigateByUrl("/");
  }

}
