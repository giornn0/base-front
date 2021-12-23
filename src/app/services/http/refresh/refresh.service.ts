import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../../../shared/models/basic/Request.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment as env } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  quedRequest:Request[]=[]

  constructor(private http: HttpClient) { }


  retryRequests(){
    this.quedRequest.forEach(request=>{
      console.log(request)
      if(request.method==='GET'){
        return this.http.get(request.url).subscribe(res=>this.quedRequest.splice(this.quedRequest.indexOf(request),1))
      }
      if(request.method==='POST'){
        return this.http.post(request.url,request.body).subscribe(res=>this.quedRequest.splice(this.quedRequest.indexOf(request),1))
        
      }
      if(request.method==='PUT'){
        return this.http.put(request.url,request.body).subscribe(res=>this.quedRequest.splice(this.quedRequest.indexOf(request),1))
      }
      if(request.method==='DELETE'){
        return this.http.delete(request.url).subscribe(res=>this.quedRequest.splice(this.quedRequest.indexOf(request),1))
      }
    })
  }

  refresh(): Observable<unknown> {
    const response = this.http.get(`${env.API_URL}/log_refresh`).pipe(
      tap((token:any) => {
        if (token) {
          localStorage.setItem("token", token.ATO);
        }
      })
    );
    return response;
  }

  cleanRetry(){
    this.quedRequest = []
  }

}
