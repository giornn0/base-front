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
export class AllTiposObrasSocialesResolver implements Resolve<unknown> {
  constructor(private rootService:RootService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    return this.rootService.getAll('tiposObrasSociales')
  }
}
@Injectable({
  providedIn: 'root'
})
export class TipoObraSocialResolver implements Resolve<unknown> {
  constructor(private rootService:RootService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    const{id} = route.params
    return this.rootService.getOne('tiposObrasSociales',id)
  }
}
@Injectable({
  providedIn: 'root'
})
export class TiposObrasSocialesResolver implements Resolve<unknown> {
  constructor(private rootService:RootService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    const {take,page,search} = route.queryParams
    return this.rootService.index('tiposObrasSociales',page,take,search)
  }
}
