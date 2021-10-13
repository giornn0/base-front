import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { RootModule } from '../../root/root.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    RootModule
  ],
  declarations: [ HomeComponent ]
})
export class HomeModule { }
