import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGiornoComponent } from './menu-giorno.component';

describe('MenuGiornoComponent', () => {
  let component: MenuGiornoComponent;
  let fixture: ComponentFixture<MenuGiornoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuGiornoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuGiornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
