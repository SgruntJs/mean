import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable, of, Subject } from 'rxjs';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { Pasto } from 'src/app/models/orderPasto';
import { MenuService } from 'src/app/services/menu/menu.service';


@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.scss'],
  providers: [DecimalPipe],
})
export class PrenotazioniComponent implements OnInit {

  prenotazioni!: Pasto[];
  prenotazioni$!: Observable<Pasto[]>;
	filter = new FormControl('', { nonNullable: true });
  ordini$= new Subject<Pasto[]>;

	constructor(private menuSrv: MenuService ) {
    this.prenotazioni$ =  this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text)),
    );
     this.prenotazioni$ = this.menuSrv.receiveOrder().pipe(
        map( data => data.pasti)
      ); 
	}

  ngOnInit(): void {
    this.menuSrv.receiveOrder().subscribe( res => { 
      this.prenotazioni = res.pasti;
      this.ordini$.next(this.prenotazioni);
    });

  }


  search(text: string): any {

      // return this.ordini.filter((res) => {
      //  //  console.log('filter res', res);
      //   const term = text.toLowerCase();
      //   return (
      //     new Date(res.dataPasto).toISOString().includes(term)
      //   );
      // });
      this.ordini$.subscribe(
         data => {
          data.filter( res => {
            const term = text.toLowerCase();
            return (
                   new Date(res.dataPasto).toISOString().includes(term)
                 );
          } )
         }
      )

   
  }




}
