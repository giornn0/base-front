import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if ((localStorage.getItem("token") && localStorage.getItem("token" ).length >=0 )&&(localStorage.getItem("_token") && localStorage.getItem("_token" ).length >=0 )&&(localStorage.getItem("id") && localStorage.getItem("id" ).length >=0 )&&(localStorage.getItem("owned") && localStorage.getItem("owned" ).length >=0 )&&(localStorage.getItem("role") && localStorage.getItem("role" ).length >=0 )) return true;
    this.router.navigate(["login"]);
    return false;
  }
}
