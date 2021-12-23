import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertsService } from '../services/alerts/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {
  constructor(private router: Router,private alertService: AlertsService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const role = localStorage.getItem('role')
      const owned = localStorage.getItem('owned')
      if(role==="admin"){
        return true
      } 
      if(role==="owner" &&state.url==="/centrosAtencion/listar"){
        this.router.navigate([`centrosAtencion/${owned}`])
        return false
      } 
      this.alertService.addAlert('warning','Sin Autorización!','Usuario sin permisos de acceso!')
      return false
    }
  
}
