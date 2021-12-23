import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../../shared/models/user.model";
import { LogResponse } from "../../shared/models/basic/logresponse.model";
import { shareReplay } from "rxjs/operators";
import { NotificationsService } from "../notifications/notifications.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient, private notificationsService:NotificationsService) {}

  logRole:BehaviorSubject<string> = new BehaviorSubject(localStorage.getItem('role'));
  logName:BehaviorSubject<string> = new BehaviorSubject(localStorage.getItem('name'));


  login(user: User): Observable<LogResponse> {
    return this.http.post<LogResponse>(`${env.API_URL}/login`, user);
  }

  logout(): Observable<unknown> {
    this.notificationsService.notifications.next([])
    return this.http.delete(`${env.API_URL}/login`);
  }

  logStatus(): Observable<unknown> {
    return this.http.get(`${env.API_URL}/login`).pipe(shareReplay());
  }

  get getRole(): Observable<string> {
    return this.logRole.asObservable()
  }
  get getName(): Observable<string> {
    return this.logName.asObservable()
  }

}
