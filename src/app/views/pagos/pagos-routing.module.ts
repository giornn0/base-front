import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent } from "./pages/list/list.component";
import { FormComponent } from "./pages/form/form.component";
import {ContratosResolver } from "../../services/http/contratos/contratos.resolver";
import { PagoResolver, PagosResolver } from '../../services/http/pagos/pagos.resolver';

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Pagos",
    },
    children: [
      {
        path:'',
        redirectTo:'listar',
        pathMatch:'full'
      },
      {
        path: "crear",
        component: FormComponent,
        resolve: { contratos: ContratosResolver },
        data: {
          title: "Nuevo Pago",
        },
      },
      {
        path: "listar",
        component: ListComponent,
        resolve:{pagos: PagosResolver},
        data: {
          title: "Mis Pagos",
        },
      },
      {
        path:':id/editar',
        component: FormComponent,
        resolve:{contratos:ContratosResolver,pagoParaEditar: PagoResolver},
        data:{
          title:'Editar Pago'
        }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosRoutingModule {}
export const routingComponents = [FormComponent, ListComponent];
