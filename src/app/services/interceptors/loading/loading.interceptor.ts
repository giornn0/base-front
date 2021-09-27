import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../../loader/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadService:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.urlWithParams.split('?')[1] && request.urlWithParams.split('?')[1].includes('no_loader')){
      this.loadService.show(true)
      return next.handle(request).pipe(finalize(()=>{this.loadService.hide(true)}));
    }
    {
      this.loadService.show()
      return next.handle(request).pipe(finalize(()=>{this.loadService.hide()}));
    }
  }
}
