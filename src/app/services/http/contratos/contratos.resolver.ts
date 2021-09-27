import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { ContratosService } from "./contratos.service";

@Injectable({
  providedIn: "root",
})
export class ContratosAllResolver implements Resolve<unknown> {
  constructor(private contratosService: ContratosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<unknown> {
    return this.contratosService.all();
  }
}
@Injectable({
  providedIn: "root",
})
export class ContratoResolver implements Resolve<unknown> {
  constructor(private contratosService: ContratosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<unknown> {
    const { id } = route.params;
    return this.contratosService.getOne(id);
  }
}
@Injectable({
  providedIn: "root",
})
export class ContratosResolver implements Resolve<unknown> {
  constructor(private contratosService: ContratosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<unknown> {
    const{page} = route.queryParams
    const{take} = route.queryParams
    const{search} = route.queryParams
    return this.contratosService.index(page,take,search);
  }
}
