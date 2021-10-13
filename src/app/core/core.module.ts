import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CoreHeaderComponent } from "./core-header/core-header.component";
import { CoreRightnavComponent } from "./core-rightnav/core-rightnav.component";
import { CoreFooterComponent } from "./core-footer/core-footer.component";

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ChartsModule } from "ng2-charts";
import { CoreSidenavComponent } from "./core-sidenav/core-sidenav.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  declarations: [
    CoreHeaderComponent,
    CoreRightnavComponent,
    CoreFooterComponent,
    CoreSidenavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PerfectScrollbarModule,
    AppHeaderModule,
    AppAsideModule,
    TabsModule.forRoot(),
    AppFooterModule,
    AppSidebarModule,
    BsDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
  ],
  exports: [
    CoreHeaderComponent,
    CoreRightnavComponent,
    CoreFooterComponent,
    CoreSidenavComponent,
  ],
})
export class CoreModule {}
