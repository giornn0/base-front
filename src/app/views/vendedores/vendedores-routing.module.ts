import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendedoresResolver, VendedorResolver } from '../../services/http/vendedores/vendedores.resolver';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  {
    path:'',
    data:{
      title:'Vendedores'
    },
    children:[
      {
        path:'',
        redirectTo:'listar',
        pathMatch:'full'
      },
      {
        path:'crear',
        component: FormComponent,
      },
      {
        path:':id/editar',
        resolve:{vendedorParaEditar: VendedorResolver},
        component: FormComponent
      },
      // {
      //   path:':id/ver',
      //   resolve:{vendedorParaEditar: VendedorResolver},
      //   component:
      // },
      {
        path:'listar',
        resolve:{vendedores: VendedoresResolver},
        component:ListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendedoresRoutingModule { }

export const  routingComponents= [FormComponent, ListComponent]
