import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, find, from, map, mergeAll, mergeMap, single, Subject, switchMap, tap } from 'rxjs';
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
  tomorrowMenu: any;
  dinnerForm!: FormGroup;
  user!: string;
  success = false;
  errors: any;

  constructor(private menuSrv: MenuService) { }

  ngOnInit(): void {
    this.oggi = new Date();
    this.domani = new Date();
    this.domani.setDate(this.domani.getDate() + 1);
    this.user = localStorage.getItem('username')!;
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
    //può essere fatto con switchmap() che restituisce una serie di valori, come un array e poi map per mappare il singolo oggetto 
    const map$ = this.menu$.pipe(
      map(item => {
        item.forEach((y: any) => {
          y.giorno = y.giorno.split("T")[0];
          //console.log('y.giorno', y.giorno)
        });
        return item
      }),
      map(data => data.filter((day: any) => day.giorno === newDomani)),
      mergeMap(x => x),

    )

    map$.subscribe((data: any) => {
      this.tomorrowMenu = data;
      console.log('this.tomorrowMenu', this.tomorrowMenu);

    });
  }

  onSubmit() {
    console.log(this.dinnerForm.value);
    this.menuSrv.postOrder(this.dinnerForm.value)
      .subscribe(
        {
          next: (result) => {
            this.riceviPrenotazioni();
          },
          error: error => {
            this.errors = error;
          },
          complete: () => {
            this.success = true;
            this.dinnerForm.reset();
          }
        });
  }

  riceviPrenotazioni() {
    this.menuSrv.receiveOrder().subscribe(ord => {
      console.log(ord)
    })
  }
}


