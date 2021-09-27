import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from "../../../../environments/environment";
import { Pago } from '../../../shared/models/pago.model';
import {  Observable } from "rxjs";
import { LoginService } from "../../login/login.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PagosService {
  constructor(private http: HttpClient, ) {}

  getAll(): Observable<unknown> {
    return this.http.get(`${env.API_URL}/pagos?disable_pagination=true`);
  }

  getContrato(id: number): Observable<unknown> {
    return this.http.get(
      `${env.API_URL}/pagos/${id}/contratos?no_loader=true`
    );
  }
  postImage(id: number,image:Blob): Observable<unknown> {
    return this.http.post(`${env.API_URL}/pagos/${id}/images`,image)
  }
  index(page = 1, take = 30, search = undefined): Observable<unknown> {
    let params = new HttpParams();
    params = params.append("page", page.toString());
    params = params.append("take", take.toString());
    if (search) params = params.append("search", search);
    return this.http.get(`${env.API_URL}/pagos`, { params: params })
  }
  getOne(id: number): Observable<unknown> {
    return this.http.get(`${env.API_URL}/pagos/${id}`);
  }
  delete(id: number): Observable<unknown> {
    return this.http.delete(`${env.API_URL}/pagos/${id }`);
  }

  create(pago: Pago): Observable<unknown> {
    return this.http.post(`${env.API_URL}/pagos`, pago)
  }
  relogAndCreate(pago: Pago){
    // return this.http.
  }
  update(pago: Pago, id: number): Observable<unknown> {
    return this.http.put(`${env.API_URL}/pagos/${id}`, pago);
  }
}
