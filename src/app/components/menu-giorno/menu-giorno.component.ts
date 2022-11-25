import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  dinnerForm!: FormGroup;
  user = "Pippo Rossi";
  constructor(private menuSrv: MenuService) { }

  ngOnInit(): void {
    this.oggi = new Date();
    this.domani = new Date();
    this.domani.setDate(this.domani.getDate() + 1);
    this.getNextMenu();
  

    this.dinnerForm = new FormGroup({
      "dataPasto": new FormControl(this.domani, [Validators.required]), 
      "user": new FormControl(this.user, [Validators.required]),
      "primo": new FormControl(null, [Validators.required]),
      "secondo": new FormControl(null, [Validators.required]),

    })
  }



  getNextMenu() {
    console.log('this.domani', this.domani.toISOString());
    const newDomani = this.domani.toISOString().split("T")[0];
    //25/11/2022
    //giorno 2022-11-24T00:00:00.000Z
    this.menuSrv.getOrderedMenu().subscribe(res => {
      this.menu$.next(res.body);
    });
    const map$ = this.menu$.pipe(
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

  onSubmit(){
    console.log(this.dinnerForm.value);
    this.menuSrv.postMOrder(this.dinnerForm.value).subscribe(data=> {
      this.riceviPrenotazioni();
    });
  }

  riceviPrenotazioni() {

    this.menuSrv.receiveOrder().subscribe( ord => {
      console.log(ord)
    })
  }
}


