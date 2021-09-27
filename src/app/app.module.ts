import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { IconModule, IconSetModule } from "@coreui/icons-angular";

import { AppComponent } from "./app.component";

import { IndexComponent } from "./containers/";
// Import containers

const APP_CONTAINERS = [IndexComponent];

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";

// Import routing module
import { AppRoutingModule } from "./app.routing";

// Import 3rd party components
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CoreModule } from "./core/core.module";
import { AuthInterceptor } from "./services/interceptors/auth/authenticated.interceptor";
import { ReactiveFormsModule } from "@angular/forms";
import { AlertModule } from "ngx-bootstrap/alert";
import { AlertsInterceptor } from "./services/interceptors/alerts/alerts.interceptor";

import { BsDatepickerModule, BsLocaleService } from "ngx-bootstrap/datepicker";

import "../app/config/ngx-bootstrap.config";
import { LoadingInterceptor } from "./services/interceptors/loading/loading.interceptor";
import { SharedModule } from "./shared/shared.module";
import { LoadingSpinnerComponent } from "./shared/components/loading-spinner/loading-spinner.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    IconModule,
    HttpClientModule,
    CoreModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    LoadingSpinnerComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AlertsInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [BsDatepickerModule],
})
export class AppModule {
  constructor(private bsLocaleService: BsLocaleService) {
    this.bsLocaleService.use("es");
  }
}
