import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor( private router: Router, private service: AuthService) {

  }


  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.service.haveRoleAccess(route.url[0].path)) {
        return true;
    } else {
        alert('Non hai i permessi di accesso!');
        return false;
    }
    }
  
  
}
