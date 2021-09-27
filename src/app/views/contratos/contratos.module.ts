import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { SharedModule } from '../../shared/shared.module';
import { ContratosRoutingModule, routingComponents } from './contratos-routing.module';

@NgModule({
  imports: [
    ContratosRoutingModule,
    AlertModule,
    ReactiveFormsModule,
    CommonModule,
    PaginationModule,
    AccordionModule,
    FormsModule,
    BsDatepickerModule,
    SharedModule
  ],
  declarations: routingComponents
})
export class ContratosModule { }
