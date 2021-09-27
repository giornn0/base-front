// Angular
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule, LOCALE_ID } from '@angular/core';


// Components Routing
import { ClientesRoutingModule, routingComponents } from './clientes-routing.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule } from '@angular/router';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import{AccordionModule} from 'ngx-bootstrap/accordion'
import { SharedModule } from '../../shared/shared.module';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    AlertModule,
    BsDatepickerModule,
    RouterModule,
    PaginationModule,
    AccordionModule,
    SharedModule,
    BsDropdownModule
  ],
  declarations: routingComponents,
  providers: [
  ],
})
export class ClientesModule {
 }
