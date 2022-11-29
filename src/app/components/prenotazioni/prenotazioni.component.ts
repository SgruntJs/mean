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

	constructor(private menuSrv: MenuService, pipe: DecimalPipe ) {
    this.prenotazioni$ =  this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text, pipe)),
    );
     this.prenotazioni$ = this.menuSrv.receiveOrder().pipe(
        map( data => data.pasti)
      ); 
	}
  // https://stackoverflow.com/questions/55644948/reverse-an-observable-array-in-angularfire2-angular-6
  ngOnInit(): void {
    this.menuSrv.receiveOrder().subscribe( res => { 
      this.prenotazioni = res.pasti;
      this.ordini$.next(this.prenotazioni);
    });

  }


  search(text: string, pipe: PipeTransform): any {

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
                   new Date(res.dataPasto).toISOString().includes(term) ||
                   pipe.transform(res.primo).includes(term) ||
                   pipe.transform(res.secondo).includes(term)
                 );
          } )
         }
      )

   
  }




}
