import { Component, OnInit } from "@angular/core";
import { AlertsService } from "../../services/alerts/alerts.service";

@Component({
  selector:"app-core-alerts",
  templateUrl: "alerts.component.html",
})
export class CoreAlertsComponent implements OnInit{
  constructor(private alertsService: AlertsService){}

  alertsCRUD=[]
  alerts=[]

  ngOnInit(){
    this.alertsService.getAlertCRUD.subscribe(alerts=>this.alertsCRUD = alerts)
    this.alertsService.getAlert.subscribe(alerts=>this.alerts = alerts)
  }
  removeAlert(alert) {
    this.alertsService.removeAlert(alert);
  }
  removeAlertCRUD(alert) {
    this.alertsService.removeAlertCRUD(alert);
  }

}