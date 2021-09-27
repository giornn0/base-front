import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login/login.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Alert, AlertsService } from "../../services/alerts/alerts.service";
import { LoaderService } from "../../services/loader/loader.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html",
  styleUrls: ["../../app.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private logService: LoginService,
    private alertsService: AlertsService,
    private loadService: LoaderService,
    private router: Router,
    private fBuilder: FormBuilder
  ) {}


  ngOnInit() {
    this.alertsService.Alert.subscribe(res=>{this.alert = res})
    this.loadService.isLoading.subscribe(res=>this.loading = res)
  }

  fecha:string
  version:string

  alert: Alert = {} as Alert;
  loading:boolean ;

  removeAlert() {
    this.alertsService.removeAlert();
  }

  logForm: FormGroup = this.fBuilder.group({
    email: [
      "",
      [
        Validators.required,
        Validators.email,
      ],
    ],
    password: ["", [Validators.required]],
  });

  isTouched(field: string): boolean {
    return !!this.logForm.controls[field].touched;
  }
  isInvalid(field: string): boolean {
    return !!(
      this.logForm.controls[field].touched &&
      this.logForm.controls[field].invalid
    );
  }

  logIn() {
    if (this.logForm.valid)
      this.logService.login(this.logForm.value).subscribe(
        (res:any) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("_token", res.data.token);
          localStorage.setItem("version", res.data.version);
          localStorage.setItem("fecha", res.data.fecha);
          this.fecha = localStorage.getItem('fecha')
          this.version = localStorage.getItem('version')
          console.log(res)
          this.router.navigate(["home"]);
        },
        (error) => {
          console.log("error");
        }
      );
    else {
      this.logForm.markAllAsTouched();
    }
  }
}
