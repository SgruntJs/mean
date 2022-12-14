import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/services/apicall/apicall.service';

@Component({
  selector: 'app-diner-login',
  templateUrl: './diner-login.component.html',
  styleUrls: ['./diner-login.component.scss']
})
export class DinerLoginComponent implements OnInit {
  dinerForm!: FormGroup;

  constructor(private api: ApicallService, private router: Router) { }

  ngOnInit(): void {
    this.dinerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    if(this.dinerForm.valid){
      this.api.dinerLogin(this.dinerForm.value).subscribe( (res: any) => {
        if(res && res['status'] === 'ok' && res['data']['response'] && res['data']['authToken']){
          localStorage.setItem('diner-token', res['data']['authToken']);
          localStorage.setItem('username', res['data']['existUser']['username']);
          this.router.navigate(['/prenota-menu']);
        }
      })
    }
      console.log(this.dinerForm.value);
  }
}
