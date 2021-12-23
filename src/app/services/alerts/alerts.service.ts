import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface Alert {
  exists:boolean,
  type?: string;
  message?: string;
  title?: string;
}

@Injectable({
  providedIn: "root",
})
export class AlertsService {
  constructor() {}

  alert: BehaviorSubject<Alert[]> = new BehaviorSubject([]);
  alertCRUD: BehaviorSubject<Alert[]> = new BehaviorSubject([]);

  addAlert(type: string, title:string ,message='' ) {
    const alert = {
      exists:true,
      type,
      message,
      title
    }
    this.alert.next([...this.alert.value,alert]);
    if(type!='danger'){
      setTimeout(()=>{
        this.removeAlert(alert)
      },5000)
    }
  }
  addAlertCRUD(type: string, title:string ,message='' ) {
    const alert = {
      exists:true,
      type,
      message,
      title
    }
    this.alertCRUD.next([...this.alertCRUD.value,alert]);
    if(type!='danger'){
      setTimeout(()=>{
        this.removeAlertCRUD(alert)
      },5000)
    }
  }
  removeAlert(erased){
    this.alert.next(this.alert.value.filter(alerta=>alerta!=erased))
  }
  removeAlertCRUD(erased){
    this.alertCRUD.next(this.alertCRUD.value.filter(alerta=>alerta!=erased))
  }

  get getAlert(): Observable<Alert[]> {
    return this.alert.asObservable();
  }
  get getAlertCRUD(): Observable<Alert[]> {
    return this.alertCRUD.asObservable();
  }
}
