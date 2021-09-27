import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment as env} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class TiposDniService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(`${env.API_URL}/tipos_documento`)
  }

}
