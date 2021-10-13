import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routingComponents, UsuariosRoutingModule } from './usuarios-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: routingComponents,
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    PaginationModule,
    SharedModule
  ]
})
export class UsuariosModule { }
