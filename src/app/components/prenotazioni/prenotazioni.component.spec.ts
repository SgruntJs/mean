import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioniComponent } from './prenotazioni.component';

describe('PrenotazioniComponent', () => {
  let component: PrenotazioniComponent;
  let fixture: ComponentFixture<PrenotazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrenotazioniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrenotazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
