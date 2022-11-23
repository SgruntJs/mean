import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinerLoginComponent } from './diner-login.component';

describe('DinerLoginComponent', () => {
  let component: DinerLoginComponent;
  let fixture: ComponentFixture<DinerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DinerLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DinerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
