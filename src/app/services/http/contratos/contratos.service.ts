import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { Contrato } from '../../../shared/models/contrato.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  constructor(private http: HttpClient){}

  all():Observable<unknown>{
    return this.http.get(`${env.API_URL}/contratos`)
  }
  getPlan(id:number):Observable<unknown>{
    return this.http.get(`${env.API_URL}/contratos/${id}/planes`)
  }
  postImage(id: number,image:Blob): Observable<unknown> {
    return this.http.post(`${env.API_URL}/contratos/${id}/images`,image)
  }

  index(page=1, take=30,search=undefined):Observable<unknown>{
    let params = new HttpParams();
    params = params.append('page',page.toString())
    params = params.append('take',take.toString());
    if(search)params = params.append('search',search.toString())
    return this.http.get(`${env.API_URL}/contratos`,{params:params})
  }
  getOne(id:number, mainLoader=true):Observable<unknown>{
    if(!mainLoader)return this.http.get(`${env.API_URL}/contratos/${id}?no_loader=true`)
    return this.http.get(`${env.API_URL}/contratos/${id}`)
  }
  delete(id:number):Observable<unknown>{
    return this.http.delete(`${env.API_URL}/contratos/${id}`)
  }

  create(contrato :Contrato ):Observable<unknown>{
    return this.http.post(`${env.API_URL}/contratos`,contrato)
  }
  update(contrato :Contrato, id:number ):Observable<unknown>{
    return this.http.put(`${env.API_URL}/contratos/${id}`,contrato)
  }
}
