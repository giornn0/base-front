import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesAllResolver } from '../../services/http/clientes/clientes.resolver';
import { ContratosResolver, ContratoResolver } from '../../services/http/contratos/contratos.resolver';
import { VendedoresAllResolver } from '../../services/http/vendedores/vendedores.resolver';

import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Contratos'
    },
    children: [
      {
        path:'',
        redirectTo:'listar',
        pathMatch:'full'
      },
      {
        path:'crear',
        component:FormComponent,
        resolve:{ clientes: ClientesAllResolver,vendedores:VendedoresAllResolver},
        data:{
          title:'Nuevo Contrato'
        }
      },
      {
        path:'listar',
        component:ListComponent,
        resolve: {contratos : ContratosResolver},
        data:{
          title:'Mis Contratos'
        }
      },
      {
        path:':id/editar',
        component: FormComponent,
        resolve:{ contratoParaEditar: ContratoResolver, clientes: ClientesAllResolver,vendedores:VendedoresAllResolver},
        data:{
          title:'Editar Contrato'
        }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratosRoutingModule {}

export const routingComponents=[FormComponent,ListComponent]