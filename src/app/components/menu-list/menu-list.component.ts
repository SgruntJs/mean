import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Menu } from 'src/app/models/menu.model';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  menu: Menu[] = [];

  constructor(private menuSrv: MenuService, private router: Router, private dataSrv: DataService) { }

  ngOnInit(): void {
    this.dataSrv.onReceiveTrueEdited().subscribe(res => {
      this.showAllMenu();
    });
    this.showAllMenu();
  }

  showAllMenu() {
      this.menuSrv.getMenu()
      .subscribe( updateRes => {
        this.menu = updateRes.menu;
        console.log(this.menu);
        //funzione per mettere in ordine di data
        this.menu.sort(function(a, b){
          var aa = a.giorno.split('-').reverse().join(),
              bb = b.giorno.split('-').reverse().join();
          return aa < bb ? -1 : (aa > bb ? 1 : 0);
          });
        console.log(this.menu);
      });
  }
  // https://stackoverflow.com/questions/52440119/angular-how-to-display-a-date-in-french-format
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
