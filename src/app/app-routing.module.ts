import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DiaryFormComponent } from './components/diary-form/diary-form.component';
import { DinerLoginComponent } from './components/diner-login/diner-login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuFormComponent } from './components/menu-form/menu-form.component';
import { MenuGiornoComponent } from './components/menu-giorno/menu-giorno.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';

const routes: Routes = [
  {
    path:"", component: HomeComponent
  },
  {
    path:"data-entry", component: DiaryFormComponent
  }, 
  {
    path:"edit/:id", component: DiaryFormComponent
  },
  {
    path:"aggiungi-menu", component: MenuFormComponent, canActivate: [AuthGuard]
  },
  {
    path:"lista-menu", component: MenuListComponent, canActivate: [AuthGuard]
  },
  {
    path:"edit-menu/:id", component: MenuFormComponent, canActivate: [AuthGuard]
  },
  {
    path:"admin", component: AdminLoginComponent
  },
  {
    path:"diner", component: DinerLoginComponent
  },
  {
    path:"prenota-menu", component: MenuGiornoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
