import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from "../../../environments/environment";
import {  Observable, of } from "rxjs";
import { catchError,  retryWhen,} from 'rxjs/operators';
import { GenericDelay } from '../../shared/functions/generic-delay';

@Injectable({
  providedIn: "root",
})
export class RootService {
  constructor(private http: HttpClient) {}

  getAll(section:string,): Observable<unknown> {
    return this.http.get(`${env.API_URL}/${section}?disable_pagination=true`).pipe(
      retryWhen( GenericDelay({})),
      catchError(error=> of(error))
      );;;
  }
  getRelation(section:string,id: number,relation:string): Observable<unknown> {
    return this.http.get(`${env.API_URL}/${section}/${id}/${relation}`).pipe(
      retryWhen( GenericDelay({})),
      catchError(error=> of(error))
      );;;
  }

  index(section:string,page = 1, take = 30, search = undefined,): Observable<unknown> {
    let params = new HttpParams();
    params = params.append("page", page.toString());
    params = params.append("take", take.toString());
    if (search) params = params.append("search", search);
    return this.http.get(`${env.API_URL}/${section}`, { params: params }).pipe(
      retryWhen( GenericDelay({})),
      catchError(error=> of(error))
      );;;
  }
  getOne(section:string,id: number): Observable<unknown> {
    return this.http.get(`${env.API_URL}/${section}/${id}`).pipe(
      retryWhen( GenericDelay({})),
      catchError(error=> of(error))
      );;;
  }
  delete(section:string,id: number): Observable<unknown> {
    return this.http.post(`${env.API_URL}/${section}/eliminar`, { id }).pipe(
      retryWhen( GenericDelay({})),
      catchError(error=> of(error))
      );;;
  }

  create(section:string,value: any): Observable<unknown> {    
    return this.http.post(`${env.API_URL}/${section}`, value).pipe(
      ).pipe(
        retryWhen( GenericDelay({})),
        catchError(error=> of(error))
        );;;
  }
  update(section:string,value: any, id: number): Observable<unknown> {
    return this.http.put(`${env.API_URL}/${section}/${id}`, value).pipe(
      ).pipe(
        retryWhen( GenericDelay({})),
        catchError(error=> of(error))
        );;;;
  }
}
