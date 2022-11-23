import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = true;


  constructor(private http: HttpClient, private router: Router) {
 
  }

  login(username: string, password: string) {
// service
  }
}