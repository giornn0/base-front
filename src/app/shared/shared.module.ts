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


@NgModule({
  declarations: [
    AutofocusDirective,
    ButtonsActionsComponent,
    ConfirmModalComponent,
    OnMouseHoverDirective,
    SharedTakePaginatorComponent,
    SharedSearcherComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    PaginationModule,
  ],
  exports:[ButtonsActionsComponent, ConfirmModalComponent,OnMouseHoverDirective, SharedTakePaginatorComponent, SharedSearcherComponent,
    ClickOutsideDirective]
})
export class SharedModule { }
