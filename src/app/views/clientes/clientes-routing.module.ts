import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsComponent } from './pages/forms/forms.component';
import { ListComponent } from './pages/list/list.component';
import { PlanesSocialesResolver } from '../../services/http/pagos/pagos.resolver';
import { ClientesResolver, ClienteResolver } from '../../services/http/clientes/clientes.resolver';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Clientes'
    },
    children: [
      {
        path:'',
        redirectTo:'listar',
        pathMatch:'full'
      },
      {
        path: 'crear',
        component: FormsComponent,
        resolve:{planes:PlanesSocialesResolver,},
        data: {
          title: 'Crear Cliente'
        }
      },
      {
        path: 'listar',
        component: ListComponent,
        resolve:{clientes: ClientesResolver},
        data: {
          title: 'Mis Clientes'
        }
      },
      {
        path:':id/editar',
        component: FormsComponent,
        resolve:{planes:PlanesSocialesResolver, clienteParaEditar: ClienteResolver},
        data:{
          title:'Editar Cliente'
        }
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule {}

export const routingComponents = [ FormsComponent,ListComponent]