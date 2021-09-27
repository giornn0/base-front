import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClientesService } from './clientes.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesResolver implements Resolve<unknown> {

  constructor(private cleintesService: ClientesService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    const{page} = route.queryParams
    const{take} = route.queryParams
    const{search} = route.queryParams
    return this.cleintesService.index(page,take,search)
  }
}

@Injectable({
  providedIn: 'root'
})
export class ClientesAllResolver implements Resolve<unknown> {

  constructor(private cleintesService: ClientesService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    return this.cleintesService.all()
  }
}
@Injectable({
  providedIn: 'root'
})
export class ClienteResolver implements Resolve<unknown> {

  constructor(private cleintesService: ClientesService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    const{id} = route.params
    return this.cleintesService.getOne(id)
  }
}
