import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { PagosService } from './pagos.service';

@Injectable({
  providedIn: "root",
})
export class PlanesSocialesResolver implements Resolve<unknown> {
  constructor(private pagosService: PagosService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<unknown> {
    return this.pagosService.getAll();
  }
}

@Injectable({
  providedIn: "root",
})
export class PagoResolver implements Resolve<unknown> {
  constructor(private pagosService: PagosService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<unknown> {
    const { id } = route.params;
    return this.pagosService.getOne(id);
  }
}
@Injectable({
  providedIn: "root",
})
export class PagosResolver implements Resolve<unknown> {
  constructor(private pagosService: PagosService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<unknown> {
    const{page} = route.queryParams
    const{take} = route.queryParams
    const{search} = route.queryParams
    return this.pagosService.index(page,take,search);
  }
}
