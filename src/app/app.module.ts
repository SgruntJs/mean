import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DiaryComponent } from './components/diary/diary.component';
import { DiaryFormComponent } from './components/diary-form/diary-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuFormComponent } from './components/menu-form/menu-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { MenuGiornoComponent } from './components/menu-giorno/menu-giorno.component';
import { DinerLoginComponent } from './components/diner-login/diner-login.component';
import { registerLocaleData } from '@angular/common';

import localeItSm from '@angular/common/locales/it-SM';

registerLocaleData(localeItSm);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DiaryComponent,
    DiaryFormComponent,
    MenuFormComponent,
    MenuListComponent,
    AdminLoginComponent,
    MenuGiornoComponent,
    DinerLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: "it-SM" } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
