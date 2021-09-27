import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input()cabecera:string =''
  @Input()id:number =0
  @Input()accion:string =''
  @Output()confirmDelete: EventEmitter<number> =new EventEmitter()


  @ViewChild('dangerModal') public dangerModal: ModalDirective;

  constructor() { }

  ngOnInit(): void {
  }

  modalDelete(){
    this.confirmDelete.emit(this.id)
    this.dangerModal.hide()
  }

}
