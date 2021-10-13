import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../../environments/environment";
import { Observable } from "rxjs";
import { User } from "../../shared/models/user.model";
import { LogResponse } from "../../shared/models/logresponse.model";
import { shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) {}

  log = false;


  login(user: User): Observable<LogResponse> {
    return this.http.post<LogResponse>(`${env.API_URL}/login`, user);
  }

  logout(): Observable<unknown> {
    return this.http.delete(`${env.API_URL}/login`);
  }

  logStatus(): Observable<unknown> {
    return this.http.get(`${env.API_URL}/login`).pipe(shareReplay());
  }
}
