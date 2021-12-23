import { Injectable } from '@angular/core';
import {Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RootService } from '../root.service';

@Injectable({
  providedIn: 'root'
})
export class AllEstadosComprobantesResolver implements Resolve<unknown> {
  constructor(private rootService:RootService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    return this.rootService.getAll('estadosComprobantes')
  }
}
@Injectable({
  providedIn: 'root'
})
export class EstadoComprobanteResolver implements Resolve<unknown> {
  constructor(private rootService:RootService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    const{id} = route.params
    return this.rootService.getOne('estadosComprobantes',id)
  }
}
@Injectable({
  providedIn: 'root'
})
export class EstadosComprobantesResolver implements Resolve<unknown> {
  constructor(private rootService:RootService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    const {take,page,search} = route.queryParams
    return this.rootService.index('estadosComprobantes',page,take,search)
  }
}
