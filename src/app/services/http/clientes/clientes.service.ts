import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { Cliente } from "../../../shared/models/cliente.model";

@Injectable({
  providedIn: "root",
})
export class ClientesService {
  constructor(private http: HttpClient) {}

  getPrestaciones(id:number):Observable<unknown>{
    return this.http.get(`${env.API_URL}/clientes/${id}/prestaciones`)
  }
  all(){
    return this.http.get(`${env.API_URL}/clientes`);
  }
  postImage(id: number,image:Blob): Observable<unknown> {
    return this.http.post(`${env.API_URL}/clientes/${id}/images`,image)
  }
  index(page=1,take=30,search=undefined): Observable<unknown> {
    let params = new HttpParams();
    params = params.append('page',page.toString())
    params = params.append('take',take.toString());
    if(search)params = params.append('search',search)
    return this.http.get(`${env.API_URL}/clientes`,{params:params});
  }
  getOne(id: number): Observable<unknown> {
    return this.http.get(`${env.API_URL}/clientes/${id}`);
  }
  delete(id: number): Observable<unknown> {
    return this.http.delete(`${env.API_URL}/clientes/${id}`);
  }

  create(cliente: Cliente): Observable<unknown> {
    return this.http.post(`${env.API_URL}/clientes`, cliente);
  }
  update(cliente: Cliente, id: number): Observable<unknown> {
    return this.http.put(`${env.API_URL}/clientes/${id}`, cliente);
  }
}
