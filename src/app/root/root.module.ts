import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { RootFormComponent } from "./root-form/root-form.component";
import { RootListComponent } from "./root-list/root-list.component";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { SharedModule } from '../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ListComponent } from "./root-list/example-use/list.template";

@NgModule({
  declarations: [
    RootFormComponent,
    RootListComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    BsDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    BsDatepickerModule,
    AccordionModule,
    PaginationModule,
    SharedModule
  ],
  exports: [
    RootFormComponent,
    RootListComponent,
  ],
})
export class RootModule {}