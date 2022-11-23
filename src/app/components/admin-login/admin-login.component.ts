import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/services/apicall/apicall.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private api: ApicallService, private router: Router) { 
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  
  }

  onSubmit() {
    if(this.loginForm.valid){
      this.api.login(this.loginForm.value).subscribe( (res: any) => {
        if(res && res['status'] === 'ok' && res['data']['response'] && res['data']['authToken']){
          localStorage.setItem('token', res['data']['authToken']);
          this.router.navigate(['/aggiungi-menu']);
        }
      })
    }
      console.log(this.loginForm.value);
  }



}
