import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routingComponents, VendedoresRoutingModule } from './vendedores-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: routingComponents,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    VendedoresRoutingModule
  ]
})
export class VendedoresModule { }
