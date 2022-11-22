import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from 'src/models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  postMenu(menu: Menu) {
    this.http.post<{ message: string }>('http://localhost:3000/add-menu', menu).subscribe(res => {
      //this.getMenu();
    });
  }

  getMenu() {
    //this.http.get<>();
  }
}
