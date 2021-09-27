import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { Vendedor } from '../../../shared/models/vendedor.model';

@Injectable({
  providedIn: 'root'
})
export class VendedoresService {

  constructor(private http: HttpClient) { }

  all():Observable<unknown>{
    return this.http.get(`${env.API_URL}/vendedores`)
  }
  getPlan(id:number):Observable<unknown>{
    return this.http.get(`${env.API_URL}/vendedores/${id}/planes`)
  }

  postImage(id: number,image:Blob): Observable<unknown> {
    return this.http.post(`${env.API_URL}/vendedores/${id}/images`,image)
  }

  index(page=1, take=30,search=undefined):Observable<unknown>{
    let params = new HttpParams();
    params = params.append('page',page.toString())
    params = params.append('take',take.toString());
    if(search)params = params.append('search',search)
    return this.http.get(`${env.API_URL}/vendedores`,{params:params})
  }
  getOne(id:number):Observable<unknown>{
    return this.http.get(`${env.API_URL}/vendedores/${id}`)
  }
  delete(id:number):Observable<unknown>{
    return this.http.delete(`${env.API_URL}/vendedores/${id}`)
  }

  create(vendedor :Vendedor ):Observable<unknown>{
    return this.http.post(`${env.API_URL}/vendedores`,vendedor)
  }
  update(vendedor :Vendedor, id:number ):Observable<unknown>{
    return this.http.put(`${env.API_URL}/vendedores/${id}`,vendedor)
  }
}
