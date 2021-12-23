import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NotificationsService } from "../../services/notifications/notifications.service";

@Component({
  selector:"notifications",
  templateUrl:"notifications.component.html"
})
export class NotificationsComponent implements OnInit{
  constructor(private notificationsService: NotificationsService,){}
  notifications=[]
  ngOnInit(): void {
      this.notificationsService.getNotifications.subscribe(notificaciones=>{this.notifications = notificaciones})
  }
  dropNoti=false

  deleteNotification(mensaje){
    this.notifications = this.notifications.filter(alerta=> alerta !=mensaje)
    this.notificationsService.deleteNotification(mensaje)
  }
}