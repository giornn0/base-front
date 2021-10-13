import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login/login.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Alert, AlertsService } from "../../services/alerts/alerts.service";
import { LoaderService } from "../../services/loader/loader.service";

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

  version = '1.2.3.4'
  fecha = '15/08/1998'

  ngOnInit() {
    this.alertsService.getAlert().subscribe((res) => {
      this.alert = res;
    });
    this.loadService
      .getLoad()
      .subscribe((isLoading) => (this.loading = isLoading));
  }

  alert: Alert = {} as Alert;
  loading = false;

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
          localStorage.setItem("token", res.ATO);
          localStorage.setItem("_token", res.RTO);
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
