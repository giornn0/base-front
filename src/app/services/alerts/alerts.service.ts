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

  alert: BehaviorSubject<Alert> = new BehaviorSubject({exists:false,type:'',message:'',title:''});

  addAlert(type: string, title:string ,message='' ) {
    this.alert.next({
      exists:true,
      type,
      message,
      title
    });
    if(type!='danger'){
      setTimeout(()=>{
        this.removeAlert()
      },5000)
    }
  }
  removeAlert(){
    this.alert.next({
      exists:false
    })
  }

  get Alert(): Observable<Alert> {
    return this.alert.asObservable();
  }
}
