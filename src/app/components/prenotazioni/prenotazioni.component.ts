import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { Pasto } from 'src/app/models/orderPasto';
import { ApicallService } from 'src/app/services/apicall/apicall.service';
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

	constructor(pipe: DecimalPipe, private menuSrv: MenuService ) {
    this.menuSrv.receiveOrder().subscribe( res => {
      console.log('res', res.pasti);
      this.prenotazioni = res.pasti;
    });
    this.prenotazioni$ = this.menuSrv.receiveOrder().pipe(
      map( data => data.pasti)
    );
    console.log('this.prenotazioni$', this.prenotazioni$);
	}

  ngOnInit(): void {
    
  }







}
