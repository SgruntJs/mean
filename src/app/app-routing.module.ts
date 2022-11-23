import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DiaryFormComponent } from './components/diary-form/diary-form.component';
import { DiaryComponent } from './components/diary/diary.component';
import { MenuFormComponent } from './components/menu-form/menu-form.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';

const routes: Routes = [
  {
    path:"", component: DiaryComponent
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
