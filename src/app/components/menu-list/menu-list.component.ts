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
      this.menuSrv.getOrderedMenu()
      .subscribe( updateRes => {
        this.menu = updateRes.body;
      
        //funzione per mettere in ordine di data
       
        //   this.menu.sort( (a: any, b:any) => {   
        //     // '01/03/2014'.split('/')
        //     // gives ["2022", "11", "24"]
        //     a = +a.giorno.split("T")[0].split('-').reverse().join();
        //     b = +b.giorno.split("T")[0].split('-').reverse().join();
        //     return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
        
        // });
      
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
