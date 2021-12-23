import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CoreHeaderComponent } from "./core-header/core-header.component";
import { CoreRightnavComponent } from "./core-rightnav/core-rightnav.component";
import { CoreFooterComponent } from "./core-footer/core-footer.component";

import {
  AppAsideModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { CoreSidenavComponent } from "./core-sidenav/core-sidenav.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from "ngx-bootstrap/modal";
import { MedicoHeaderComponent } from "./core-header/options/medico/medico.header.component";
import { MedicoSidenavComponent } from "./core-sidenav/option/medico/medico.sidebar.component";
import { LoaderComponent } from "./loader/loader.component";
import { NotificationsComponent } from './notifications/notification.component';
import { AplicacionesComponent } from "./aplicaciones/aplicaciones.component";
import { SharedModule } from '../shared/shared.module';
import { CoreAlertsComponent } from "./alerts/alerts.component";

@NgModule({
  declarations: [
    CoreHeaderComponent,
    CoreRightnavComponent,
    CoreFooterComponent,
    CoreSidenavComponent,
    NotificationsComponent,
    LoaderComponent,
    AplicacionesComponent,
    MedicoHeaderComponent,
    MedicoSidenavComponent,
    CoreAlertsComponent
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
    SharedModule
  ],
  exports: [
    CoreHeaderComponent,
    CoreRightnavComponent,
    CoreFooterComponent,
    CoreSidenavComponent,
    LoaderComponent,
    CoreAlertsComponent
  ],
})
export class CoreModule {}
