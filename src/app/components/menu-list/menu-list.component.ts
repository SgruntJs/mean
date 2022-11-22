import { Component, OnInit } from '@angular/core';
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

  constructor(private menuSrv: MenuService) { }

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

}
