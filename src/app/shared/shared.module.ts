import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutofocusDirective } from './directives/autofocus.directive';
import { ButtonsActionsComponent } from './components/buttons-actions/buttons-actions.component';

import{ModalModule} from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { OnMouseHoverDirective } from './directives/on-mouse-hover.directive';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedTakePaginatorComponent } from './components/shared-take-paginator/shared-take-paginator.component';
import { SharedSearcherComponent } from './components/shared-searcher/shared-searcher.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { OnClickDirective } from './directives/on-click.directive';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [
    AutofocusDirective,
    ButtonsActionsComponent,
    ConfirmModalComponent,
    OnMouseHoverDirective,
    SharedTakePaginatorComponent,
    SharedSearcherComponent,
    ClickOutsideDirective,
    OnClickDirective,
    AutofocusDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    TooltipModule,
    PaginationModule,
    BsDropdownModule
  ],
  exports:[
    ButtonsActionsComponent,
    ConfirmModalComponent,
    SharedTakePaginatorComponent,
    SharedSearcherComponent,
    ClickOutsideDirective,
    OnMouseHoverDirective,
    OnClickDirective,
    AutofocusDirective,
  ]
})
export class SharedModule { }
