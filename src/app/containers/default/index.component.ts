import { Component,  OnInit } from "@angular/core";
import { Alert, AlertsService } from "../../services/alerts/alerts.service";
import { LoaderService } from "../../services/loader/loader.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./index.component.html",
  styleUrls: ["../../app.component.css"],
})
export class IndexComponent implements OnInit {
  alert: Alert = {} as Alert;
  loading: boolean =true

  version:string = '1.2.3.4'
  fecha:string = '15/08/98'

  constructor(
    private alertService: AlertsService,
    private loadService: LoaderService
  ) {}

  ngOnInit() {
    this.alertService.getAlert().subscribe((res) => {
      setTimeout(() => {
        this.alert = res;
      }, );
    });
    this.loadService.getLoad().subscribe((isLoading) => {
      setTimeout(() => {
        this.loading = isLoading;
      },)
    });
  }
  removeAlert() {
    this.alertService.removeAlert();
  }
}
