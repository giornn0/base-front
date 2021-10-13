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
    if (localStorage.getItem("token") && localStorage.getItem("token").length >=0) return true;
    this.router.navigate(["login"]);
    return false;
  }
}
