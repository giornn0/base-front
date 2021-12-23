import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from "../../../../environments/environment";
import {  Observable, of, timer } from "rxjs";
import { catchError,  debounce,  delayWhen,  map,  retryWhen} from 'rxjs/operators';
import { GenericDelay } from '../../../shared/functions/generic-delay';

@Injectable({
  providedIn: "root",
})
export class PacienteService {
  constructor(private http: HttpClient) {}
  getAllPacienteCentro(id:number|string,apellido:string=null,dni:number|string=null):Observable<unknown>{
      let params = new HttpParams();
      if(dni)params = params.append("dni", dni);
      if(apellido)params = params.append("apellido", apellido);
    return this.http.get(`${env.API_URL}/pacientes/comprobanteForm/${id}/nuevaRuta`,{ params: params }).pipe(
        map((object)=>{return object[0]}),
        retryWhen( GenericDelay({})),
        catchError(error=> of(error))
    )
  }
}
