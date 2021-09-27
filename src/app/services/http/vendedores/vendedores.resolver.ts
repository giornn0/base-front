import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { VendedoresService } from './vendedores.service';

@Injectable({
  providedIn: "root",
})
export class VendedoresAllResolver implements Resolve<unknown> {
  constructor(private vendedoresService: VendedoresService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<unknown> {
    return this.vendedoresService.all();
  }
}
@Injectable({
  providedIn: "root",
})
export class VendedorResolver implements Resolve<unknown> {
  constructor(private vendedoresService: VendedoresService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<unknown> {
    const { id } = route.params;
    return this.vendedoresService.getOne(id);
  }
}
@Injectable({
  providedIn: "root",
})
export class VendedoresResolver implements Resolve<unknown> {
  constructor(private vendedoresService: VendedoresService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<unknown> {
    const{page} = route.queryParams
    const{take} = route.queryParams
    const{search} = route.queryParams
    return this.vendedoresService.index(page,take,search);
  }
}
