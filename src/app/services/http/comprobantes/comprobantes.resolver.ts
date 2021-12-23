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
export class AllComprobantesResolver implements Resolve<unknown> {
  constructor(private rootService:RootService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    return this.rootService.getAll('comprobantes')
  }
}
@Injectable({
  providedIn: 'root'
})
export class ComprobanteResolver implements Resolve<unknown> {
  constructor(private rootService:RootService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    const{id} = route.params
    return this.rootService.getOne('comprobantes',id)
  }
}
@Injectable({
  providedIn: 'root'
})
export class ComprobantesResolver implements Resolve<unknown> {
  constructor(private rootService:RootService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    const {take,page,search} = route.queryParams
    return this.rootService.index('comprobantes',page,take,search)
  }
}

@Injectable({
  providedIn: 'root'
})
export class ComprobantePDF implements Resolve<unknown>{
  constructor(private rootService:RootService){}
  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<unknown>{
    const {id} = route.params
    return this.rootService.getPDF('comprobantes',id)
  }
}