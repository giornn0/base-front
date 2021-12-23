import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from "../../../environments/environment";
import {  Observable, of, timer } from "rxjs";
import { catchError,  debounce,  map,  retryWhen} from 'rxjs/operators';
import { GenericDelay } from '../../shared/functions/generic-delay';

@Injectable({
  providedIn: "root",
})
export class RootService {
  constructor(private http: HttpClient) {}

  getAll(section:string,): Observable<unknown> {
    return this.http.get(`${env.API_URL}/${section}?disable_pagination=true`).pipe(
      map((object)=>{return object[0]}),
      retryWhen( GenericDelay({})),
      catchError(error=> of(error))
      );;;
    }
    getRelation(section:string,id: number|string,relation:string,page = 1, take = 30, search = null,disable_pagination=false): Observable<unknown> {
      let params = new HttpParams();
      params = params.append("page", page.toString());
      params = params.append("take", take.toString());
      if (search) params = params.append("search", search);
      if (disable_pagination) params = params.append("disable_pagination", disable_pagination);
      return this.http.get(`${env.API_URL}/${section}/${id}/${relation}`,{ params: params }).pipe(
      map((object)=>{return object}),
      retryWhen( GenericDelay({})),
      catchError(error=> of(error))
      );;;
  }
    getEventos(section:string,id: number|string,page = 1, take = 30, search = null,tipo=null,evento_model=null,fecha_inicio=null,fecha_fin=null,recent=null): Observable<unknown> {
      let params = new HttpParams();
      params = params.append("page", page.toString());
      params = params.append("take", take.toString());
      if (search) params = params.append("search", search);
      if (tipo) params = params.append("tipo", tipo);
      if (evento_model) params = params.append("evento_model", evento_model);
      if (fecha_inicio) params = params.append("fecha_inicio", fecha_inicio);
      if (fecha_fin) params = params.append("fecha_fin", fecha_fin);
      if (recent) params = params.append("recent", recent);
      return this.http.get(`${env.API_URL}/${section}/eventos/${id}/nuevaRuta`,{ params: params }).pipe(
      debounce(() => timer(5000)),
      map((object)=>{return object[0]}),
      retryWhen( GenericDelay({})),
      catchError(error=> of(error))
      );;;
  }
    getRelationNewRoute(section:string,id: number|string,relation:string,page = 1, take = 30, search = null,estado=null,fecha_inicio=null,fecha_fin=null,tipo=null,recent=null): Observable<unknown> {
      let params = new HttpParams();
      params = params.append("page", page.toString());
      params = params.append("take", take.toString());
      if (search) params = params.append("search", search);
      if (estado) params = params.append("estado", estado);
      if (fecha_inicio) params = params.append("fecha_inicio", fecha_inicio);
      if (fecha_fin) params = params.append("fecha_fin", fecha_fin);
      if (tipo) params = params.append("tipo", tipo);
      if (recent) params = params.append("recent", recent);
      return this.http.get(`${env.API_URL}/${section}/${relation}/${id}/nuevaRuta`,{ params: params }).pipe(
      map((object)=>{return object[0]}),
      retryWhen( GenericDelay({})),
      catchError(error=> of(error))
      );;;
  }

  index(section:string,page = 1, take = 30, search = null,): Observable<unknown> {
    let params = new HttpParams();
    params = params.append("page", page.toString());
    params = params.append("take", take.toString());
    if (search) params = params.append("search", search);
    return this.http.get(`${env.API_URL}/${section}`, { params: params }).pipe(
      map((object)=>{return object[0]}),
      retryWhen( GenericDelay({})),
      catchError(error=> of(error))
      );;;
  }
  getSpecificPath(path:string,page = 1, take = 30, search = null,estado=null,fecha_inicio=null,fecha_fin=null,recent=null,centro_atencion=null): Observable<unknown>{
    let params = new HttpParams();
    params = params.append("page", page.toString());
    params = params.append("take", take.toString());
    if (search) params = params.append("search", search);
    if (estado) params = params.append("estado", estado);
    if (fecha_inicio) params = params.append("fecha_inicio", fecha_inicio);
    if (fecha_fin) params = params.append("fecha_fin", fecha_fin);
    if (recent) params = params.append("recent", recent);
    if (centro_atencion) params = params.append("centro_atencion", centro_atencion);
    return this.http.get(`${env.API_URL}/${path}`,{ params: params }).pipe(
    debounce(() => timer(5000)),
    map((object)=>{return object[0]}),
    retryWhen( GenericDelay({})),
    catchError(error=> of(error))
    );;;
  }
  getAllAdmins(page = 1, take = 30, search = null,): Observable<unknown> {
    let params = new HttpParams();
    params = params.append("page", page.toString());
    params = params.append("take", take.toString());
    if (search) params = params.append("search", search);
    return this.http.get(`${env.API_URL}/admins/`, { params: params }).pipe(
      map((object)=>{return object[0]}),
      retryWhen( GenericDelay({})),
      catchError(error=> of(error))
      );;;
  }
  getUsuarios(id:string|number,page = 1, take = 30, search = null,): Observable<unknown> {
    let params = new HttpParams();
    params = params.append("page", page.toString());
    params = params.append("take", take.toString());
    if (search) params = params.append("search", search);
    return this.http.get(`${env.API_URL}/usuarios/${id}`, { params: params }).pipe(
      map((object)=>{return object[0]}),
      retryWhen( GenericDelay({})),
      catchError(error=> of(error))
      );;;
  }
  getOne(section:string,id: number): Observable<unknown> {
    return this.http.get(`${env.API_URL}/${section}/${id}`).pipe(
      map((object)=>{return object[0]}),
      retryWhen( GenericDelay({})),
      catchError(error=> of(error))
      );;;
  }
  getPDF(section:string,id:number|string){
    return this.http.get(`${env.API_URL}/${section}/${id}/pdf/nuevaRuta`).pipe(
      map((object)=>{return object[0]}),
      retryWhen(GenericDelay({})),
      catchError(error=>of(error))
    )
  }
  delete(section:string,id: number): Observable<unknown> {
    return this.http.post(`${env.API_URL}/${section}/eliminar`, { id }).pipe(
      map((object)=>{return object[0]}),
      retryWhen( GenericDelay({})),
      // catchError(error=> of(error))
      );;;
  }

  create(section:string,value: any): Observable<unknown> {    
    return this.http.post(`${env.API_URL}/${section}`, value).pipe(
      ).pipe(
        map((object)=>{return object[0]}),
        retryWhen( GenericDelay({})),
        // catchError(error=> of(error))
        );;;
  }
  update(section:string,value: any, id: number): Observable<unknown> {
    return this.http.put(`${env.API_URL}/${section}/${id}`, value).pipe(
      ).pipe(
        map((object)=>{return object[0]}),
        retryWhen( GenericDelay({})),
        // catchError(error=> of(error))
        );;;;
  }
  createUpdateSetFile(section:string,route:string,file,id=null): Observable<unknown>{
    return this.http.post(`${env.API_URL}/${section}/${route}${id?'/'+id.toString():''}`,file)
  }
}
