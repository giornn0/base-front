import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AlertsService } from '../../alerts/alerts.service';
import { LoginService } from '../../login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private router: Router, private alertService: AlertsService, private logService: LoginService) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const  httpHeader = {headers:new HttpHeaders({'Contentent-Type':`application/json`,'Accept':`application/json`})}
    if(token){
      request = request.clone({headers: httpHeader.headers.set('Authorization',`Bearer ${token}`)}) 
    }
    if(request.url.includes('log_refresh')){
      return next.handle(request).pipe(catchError((error: HttpErrorResponse)=>{
        if(error.status == 403 || error.status == 401 ){
          console.log(request.headers)
          this.router.navigate(['login'])
          this.alertService.addAlert('danger','Imposible revalidar','Por favor inicie sesion nuevamente')
          localStorage.clear()
        }
        return throwError(error)
      }))
   }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error)
          if(error.status != 403 && error.status != 401){
            this.alertService.addAlert('danger','Error procesando los datos!',`Error ${error.error.message} (${error.status})`)
          } 
          if(error.status === 401){
            localStorage.clear()
            this.router.navigate(['/login']);
          }
          if(error.status == 403 || error.status == 401){
            this.router.navigate(['/login']);
            this.alertService.addAlert('warning','Refrescando',`Error: ${error.error.message}`)
            localStorage.setItem('token',localStorage.getItem('_token'))
            this.logService.refresh().subscribe(res=>{if(!res)this.router.navigate(['login']);return [res]})
          }
          if(error.error.message==="jwt expired")this.router.navigate(['/login']);
          return throwError(error);
      })
    );
  }
}
