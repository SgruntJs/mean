import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-diner-login',
  templateUrl: './diner-login.component.html',
  styleUrls: ['./diner-login.component.scss']
})
export class DinerLoginComponent implements OnInit {
  dinerForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.dinerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    //do something
    console.log(this.dinerForm.value);
    //navigate
  }
}
