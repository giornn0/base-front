import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


// Buttons Routing
import { PagosRoutingModule, routingComponents } from './pagos-routing.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SharedModule } from '../../shared/shared.module';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// Angular

@NgModule({
  imports: [
    CommonModule,
    PagosRoutingModule,
    ReactiveFormsModule,
    AlertModule,
    PaginationModule,
    AccordionModule,
    FormsModule,
    SharedModule,
    BsDatepickerModule
  ],
  declarations:routingComponents
})
export class PagosModule { }
