import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-buttons-actions',
  templateUrl: './buttons-actions.component.html',
  styleUrls: ['../../../app.component.css']
})
export class ButtonsActionsComponent implements OnInit {
  @Input()seccion:string =''
  @Input()id:number =0
  @Input()nombre:string =''
  @Input()wantEdit=true
  @Input()wantDelete = true
  @Input()wantShow=true
  @Input()action=true
  @Output()deleting: EventEmitter<boolean>= new EventEmitter()
  @Output()confirmDelete: EventEmitter<number> =new EventEmitter()


  @ViewChild('dangerModal') public dangerModal: ModalDirective;

  editRoute=''
  watchRoute=''

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.editRoute=`${this.seccion}/${this.id}/editar`
    this.watchRoute=`${this.seccion}/${this.id}/ver`

  }
  goEdit(){
    if(this.action)this.router.navigate([this.editRoute])
  }
  modalDelete(){
    this.confirmDelete.emit(this.id)
    this.deleting.emit(false)
    this.dangerModal.hide()
  }
  modalClose(){
    this.deleting.emit(false)
    this.dangerModal.hide()
  }
  goWatch(){
    if(this.action)this.router.navigate([this.watchRoute])
  }
  openDeleteModal(){
    this.deleting.emit(true)
    this.dangerModal.show()
  }
  
}
