import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, share } from "rxjs/operators";
import { environment  as env} from "../../../environments/environment";

export interface notificacion{
    mensaje:string
}

@Injectable({
    providedIn:'root'
})

export class NotificationsService{

    constructor(private http:HttpClient){}

    searching = false

    notifications:BehaviorSubject<notificacion[]>= new BehaviorSubject([])

    addNotification(mensaje){
        if(!this.notifications.value.includes(mensaje))this.notifications.next([...this.notifications.value,mensaje])
    }

    deleteNotification(mensaje){
        this.http.get(`${env.API_URL}/comprobantesMensajes/alerta/sinLeer/${mensaje.id}`).pipe(
            map(obj=>{return obj[0]})
        ).subscribe(res=>{
            this.notifications.next(this.notifications.value.filter((alerta:any)=>alerta.id!=mensaje.id))
        })
    }

    refreshNoti(){
        if(!this.searching){
            this.searching = true
            this.http.get(`${env.API_URL}/comprobantesMensajes/alerta/sinLeer`).pipe(
                share(),
                map(obj=>{return obj[0]})
                ).subscribe((res:any)=>{
                    res.forEach(alert=>this.addNotification(alert))
                    this.searching = false
            })
        }
    }

    get getNotifications():Observable<notificacion[]>{
        return this.notifications.asObservable()
    }

}