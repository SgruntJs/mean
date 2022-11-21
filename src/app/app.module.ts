import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DiaryComponent } from './components/diary/diary.component';
import { DiaryFormComponent } from './components/diary-form/diary-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuFormComponent } from './components/menu-form/menu-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DiaryComponent,
    DiaryFormComponent,
    MenuFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
