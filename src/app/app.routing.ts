import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./services/interceptors/auth/auth.guard";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { IndexComponent } from './containers/default/index.component';
import { projectRoutes } from "./_routes";

export const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "solicitudes/listar",
  //   pathMatch: "full",
  // },
  // {
  //   path: "home",
  //   redirectTo: "solicitudes/listar",
  // },
  {
    path: "404",
    component: P404Component,
    data: {
      title: "Page 404",
    },
  },
  {
    path: "500",
    component: P500Component,
    data: {
      title: "Page 500",
    },
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },
  {
    path: "",
    component:IndexComponent,
    // canActivateChild: [AuthGuard],
    data: {
      title: "Inicio",
    },
    children: projectRoutes,
  },
  // { path: "**", component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" ,scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
