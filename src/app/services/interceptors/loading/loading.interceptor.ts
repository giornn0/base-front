import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../../loader/loader.service';
import { finalize, retryWhen, tap } from 'rxjs/operators';
import { GenericDelay } from '../../../shared/functions/generic-delay';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadService:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const reqLast = request.url.split('/').slice(-3)
    if((reqLast[0]==='obrasSociales'|| reqLast[0]==='autorizaciones'||  reqLast[0]==='planes') && (reqLast[2]==='planes'||reqLast[2].includes('prestaciones'))){
      this.loadService.startLoading(true)
      return next.handle(request).pipe(
        tap(()=>{},error=>{
          if(error.status == 403 )this.loadService.waiting = true
        }),
        finalize(()=>{this.loadService.endLoading(true)}));
      }
      if(request.url.includes('log_refresh'))return next.handle(request).pipe(finalize(()=>{this.loadService.waiting=false}))
      {
        this.loadService.startLoading()
        return next.handle(request).pipe(
        tap(()=>{},error=>{
          if(error.status == 419 )this.loadService.waiting = true
        }),
        finalize(()=>{this.loadService.endLoading()}));
    }
  }
}
