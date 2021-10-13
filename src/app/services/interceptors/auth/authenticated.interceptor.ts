import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor,HttpEvent,
  HttpErrorResponse,
  HttpHeaders,
  HttpClient, } from "@angular/common/http";
import {  } from "@angular/core";
import { Router } from "@angular/router";
import {  Observable, throwError } from "rxjs";
import { catchError,} from "rxjs/operators";
import { AlertsService } from '../../alerts/alerts.service';
import { LoginService } from '../../login/login.service';
import { RefreshService } from '../../http/refresh/refresh.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private router: Router, private alertService: AlertsService,private refreshService:RefreshService) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const  httpHeader = {headers:new HttpHeaders({'Contentent-Type':`application/json,application/x-www-form-urlencoded,multipart/encoded`,'Accept':`application/json`})}
    if(token){
      request = request.clone({headers: httpHeader.headers.set('Authorization',`Bearer ${token}`)}) 
    }
    if(request.url.includes('log_refresh')){
      return next.handle(request).pipe(catchError((error: HttpErrorResponse)=>{
        if(error.status == 403 || error.status == 401 ){
          localStorage.clear()
          this.alertService.addAlert('danger','Imposible revalidar','Por favor inicie sesion nuevamente')
          this.refreshService.cleanRetry()
          this.router.navigate(['login'])
        }
        return throwError(error)
      }))
   }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error)
          if(error.status != 403 && error.status != 401){
            this.alertService.addAlert('danger','Error procesando los datos!',`Por favor consulte con soporte técnico (${error.status})`)
          } 
          if(error.status == 403){
            if(error.error && error.error.message =='Usuario no autorizado para realizar esta accion') {
              this.alertService.addAlert('warning',error.error.message)
              return throwError(error);
            }
          }
          if(error.status==401){
            this.alertService.addAlert('warning',error.error.message)
            localStorage.clear()
            this.router.navigate(['/login']);
          }
          if(error.status == 419 ){
              this.alertService.addAlert('warning','Refrescando','Revalidando credenciales')
              this.refreshService.quedRequest.push({method:request.method,body:request.body,url:request.urlWithParams})
              localStorage.setItem('token',localStorage.getItem('_token'))
              this.refreshService.refresh().subscribe(res=>{
                // this.refreshService.retryRequests()
              })
          }
          return throwError(error);
      })
    );
  }
}