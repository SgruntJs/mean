import { Component, OnInit } from '@angular/core';
import { filter, find, from, map, mergeAll, mergeMap, Subject, switchMap, tap } from 'rxjs';
import { Menu } from 'src/app/models/menu.model';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-menu-giorno',
  templateUrl: './menu-giorno.component.html',
  styleUrls: ['./menu-giorno.component.scss']
})
export class MenuGiornoComponent implements OnInit {

  oggi!: Date;
  domani!: Date;
  menu$ = new Subject<any>;
  tomorrowMenu : any;

  constructor(private menuSrv: MenuService) { }

  ngOnInit(): void {
    this.oggi = new Date();
    this.domani = new Date();
    this.domani.setDate(this.domani.getDate() + 1);
    this.getNextMenu();
  }

  getNextMenu() {
    console.log('this.domani', this.domani.toISOString());
    const newDomani = this.domani.toISOString().split("T")[0];
    //25/11/2022
    //giorno 2022-11-24T00:00:00.000Z
    this.menuSrv.getOrderedMenu().subscribe(res => {
      this.menu$.next(res.body);
    });
    // this.menuSrv.getOrderedMenu().pipe(
    //   map(date => date.body.giorno.toISOString().split("T")[0]),
    //   filter(day => day.giorno === newDomani)
    // ).subscribe(res => {
    //   console.log('date concide?', res)
    // })

    const map$ = this.menu$.pipe(
      // map(x => { return x[0].giorno.split("T")[0]}),
      // filter(day => { return day.giorno === newDomani})
      map( item => {
        item.forEach((y: any) => {
        y.giorno = y.giorno.split("T")[0];
         console.log('y.giorno', y.giorno)
        });
        return item
      }),
      tap( data => data.filter( (d:any) => d.giorno = newDomani)),
       mergeMap( x => x),
      
       )
      
    map$.subscribe((data:any) => {
      this.tomorrowMenu = data;
    
    });
  }

}


