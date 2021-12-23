import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { RootService } from '../../../services/http/root.service';
import { LoaderService } from '../../../services/loader/loader.service';
import { RelatedSubscriptionsService } from '../../../services/related-subscriptions/related.subscriptions.service';
import { SubscriptionStatus } from '../../models/basic/template.list.model';

@Component({
  selector: 'app-buttons-actions',
  templateUrl: './buttons-actions.component.html',
  styleUrls: ['../../../app.component.css']
})
export class ButtonsActionsComponent implements OnInit {
  @Input()seccion:string =''
  @Input()routeURL:string =''
  @Input()id:number =0
  @Input()nombre:string =''
  @Input()wantEdit=true
  @Input()wantDelete = true
  @Input()wantShow=true
  @Input()statusToggle={status:'not',index:-1}
  @Input()title= ''
  @Input()action=true

  @Input()especificShow=false

  @Output()deleting: EventEmitter<boolean>= new EventEmitter()
  @Output()confirmDelete: EventEmitter<number> =new EventEmitter()
  @Output()changeToggle: EventEmitter<any> =new EventEmitter()
  @Output()openAccordeon: EventEmitter<any> =new EventEmitter()

  @Input()estadoOptions=null
  @Input()valueEstado=null
  @Input()classEstado="btn-secondary"
  @Output()changingEstado: EventEmitter<any>= new EventEmitter()
   
  @Input()userType = 'owner'

  @Input()subscribableSection:boolean=false
  @Input()subscriptionStatus:boolean = false
  @Output()changedSubscriptionStatus: EventEmitter<boolean>=  new EventEmitter()

  @ViewChild('dangerModal') public dangerModal: ModalDirective;

  editRoute=''
  watchRoute=''

  constructor(private rootService:RootService,private loaderService: LoaderService,private relatedSubscriptionsService:RelatedSubscriptionsService) { }

  ngOnInit(): void {
    this.editRoute=`#/${this.routeURL}/${this.id}/editar`
    this.watchRoute=`#/${this.routeURL}/${this.id}/ver`
    this.userType = localStorage.getItem('role')
    this.setClassEstado()
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
  openDeleteModal(){
    this.deleting.emit(true)
    this.dangerModal.show()
  }

  @Input()changingEstadoState=false

  setValueEstado(description:string,classEstado:string,value){
    this.valueEstado ='... '
    this.changingEstado.emit({value,description,classEstado})
  }
  setClassEstado(){
    if(this.valueEstado&&this.estadoOptions)this.estadoOptions.forEach(opcion=>{
      if(opcion.description === this.valueEstado)this.classEstado=opcion.class
    })
  }
  changingSubscription=false
  subcriptionAction(){
    this.changingSubscription=true
    const postData = {
      id:this.id,
      onlySubscriptionStatus:true,
      status:!this.subscriptionStatus
    }
    this.loaderService.inPageLoad=true
    this.rootService.update(this.seccion,postData,this.id).subscribe((res=>{
      this.changingSubscription=false
      this.changedSubscriptionStatus.emit(!this.subscriptionStatus)
      if(postData.status)this.relatedSubscriptionsService.pushValue(this.id.toString(),this.seccion)
      if(!postData.status)this.relatedSubscriptionsService.eraseValue(this.id.toString(),this.seccion)
    }))
  }

  hoveringBell=false
  
}
