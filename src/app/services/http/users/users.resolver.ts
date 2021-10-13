import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RootService } from '../root.service';

@Injectable({
  providedIn: 'root'
})
export class AllUsersResolver implements Resolve<unknown> {
  constructor(private rootService:RootService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    return this.rootService.getAll('users')
  }
}
@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<unknown> {
  constructor(private rootService:RootService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    const{id} = route.params
    return this.rootService.getOne('users',id)
  }
}
@Injectable({
  providedIn: 'root'
})
export class UsersResolver implements Resolve<unknown> {
  constructor(private rootService:RootService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    const {take,page,search} = route.queryParams
    return this.rootService.index('users',page,take,search)
  }
}
