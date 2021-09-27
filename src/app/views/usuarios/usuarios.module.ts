import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routingComponents, UsuariosRoutingModule } from './usuarios-routing.module';



@NgModule({
  declarations: routingComponents,
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
