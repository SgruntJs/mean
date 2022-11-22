import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Menu } from 'src/models/menu.model';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  menu: Menu[] = [];

  constructor(private menuSrv: MenuService, private router: Router) { }

  ngOnInit(): void {
    this.showAllMenu();
  }

  showAllMenu() {
      this.menuSrv.getMenu()
      .subscribe( updateRes => {
        this.menu = updateRes.menu;
        console.log(this.menu);
      });
  }

  removeMenu(id: string) {
    console.log(id);
    this.menuSrv.deleteMenu(id).subscribe( res => {
      console.log(res);
      this.showAllMenu()
    });
  }

  onUpdateMenu(id: string) {
      console.log(id);
      this.router.navigate(['edit-menu', id]);
  }

}
