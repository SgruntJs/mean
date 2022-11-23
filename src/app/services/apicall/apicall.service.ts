import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Admin } from 'src/app/models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private http: HttpClient, private router: Router) { }

  login(adminData: Admin) {
    return this.http.post(`http://localhost:3000/auth/login`, adminData);
  }

  registerUser(adminData: any) {
    return this.http.post(`http://localhost:3000/auth/register`, adminData);
  }

  goToAreaRiservata(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:3000/auth/login', {headers: headers})

  }
}
