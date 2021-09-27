import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { AuthGuard } from "./services/interceptors/auth/auth.guard";
import { LogStatusResolver } from "./services/login/log-status.resolver";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { IndexComponent } from './containers/default/index.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    redirectTo: "contratos",
  },
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
    canActivateChild: [AuthGuard],
    data: {
      title: "Inicio",
    },
    children: [
      {
        path: "clientes",
        loadChildren: () =>
          import("./views/clientes/clientes.module").then((m) => m.ClientesModule),
      },
      {
        path: "pagos",
        loadChildren: () =>
          import("./views/pagos/pagos.module").then((m) => m.PagosModule),
      },
      {
        path: "contratos",
        loadChildren: () =>
          import("./views/contratos/contratos.module").then((m) => m.ContratosModule),
      },
      {
        path: "home",
        loadChildren: () =>
          import("./views/home/home.module").then(
            (m) => m.HomeModule
          ),
      },
      {
        path:'usuarios',
        loadChildren: ()=>
        import("./views/usuarios/usuarios.module").then((m)=>m.UsuariosModule)
      },
      {
        path:'vendedores',
        loadChildren: () =>
        import("./views/vendedores/vendedores.module").then(m=>m.VendedoresModule)
      }      
    ],
  },
  // { path: "**", component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
