import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Menu } from 'src/app/models/menu.model';

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

  getMenu(){
    return this.http.get<any>(`http://localhost:3000/menu-list`);
  }



  deleteMenu(id: string) {
    return this.http.delete<Menu>(`http://localhost:3000/remove-menu/${id}`);
  }

  updateMenu(id: string, updatedMenu: Menu) {
    return this.http.put<Menu>(`http://localhost:3000/update-menu/${id}`, updatedMenu);
  }
}
