import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AlertsService } from "../../alerts/alerts.service";

@Injectable()
export class AlertsInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertsService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.method != "GET") {
      return next.handle(request).pipe(
        tap((res: HttpEvent<any>) => {
          if (res instanceof HttpResponse) {
            if (res.body && res.body.message) {
              if(res.status==201 ||res.status==202 )this.alertService.addAlertCRUD("info", res.body.message);
              else this.alertService.addAlert("info", res.body.message);
            }
          }
        })
      );
    }
    return next.handle(request);
  }
}
