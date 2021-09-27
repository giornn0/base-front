import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutofocusDirective } from './directives/autofocus.directive';
import { ButtonsActionsComponent } from './components/buttons-actions/buttons-actions.component';

import{ModalModule} from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { onClickDirective } from './directives/on-click.directive';


@NgModule({
  declarations: [
    AutofocusDirective,
    ButtonsActionsComponent,
    ConfirmModalComponent,
    onClickDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule
  ],
  exports:[ButtonsActionsComponent,onClickDirective, ConfirmModalComponent,AutofocusDirective]
})
export class SharedModule { }
