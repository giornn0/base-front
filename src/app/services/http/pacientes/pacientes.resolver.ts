import { Injectable } from '@angular/core';
import {Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RootService } from '../root.service';
import { PacienteService } from './pacientes.service';

@Injectable({
  providedIn: 'root'
})
export class AllPacientesResolver implements Resolve<unknown> {
  constructor(private rootService:RootService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    return this.rootService.getAll('pacientes')
  }
}
@Injectable({
  providedIn: 'root'
})
export class PacienteResolver implements Resolve<unknown> {
  constructor(private rootService:RootService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    const{id} = route.params
    return this.rootService.getOne('pacientes',id)
  }
}
@Injectable({
  providedIn: 'root'
})
export class PacientesResolver implements Resolve<unknown> {
  constructor(private rootService:RootService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    const {take,page,search} = route.queryParams
    return this.rootService.index('pacientes',page,take,search)
  }
}
@Injectable({
  providedIn: 'root'
})
export class AllPacientesCentroResolver implements Resolve<unknown> {
  constructor(private pacienteService:PacienteService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<unknown> {
    const centroID = localStorage.getItem('owned')
    return this.pacienteService.getAllPacienteCentro(centroID)
  }
}