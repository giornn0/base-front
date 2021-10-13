import { Component,  EventEmitter,  Input,  OnInit, Output, } from '@angular/core';
import {  ActivatedRoute, } from '@angular/router';
import { RootService } from '../../services/http/root.service';
import { ListTemplate } from '../../shared/models/template.list.model';
import { formatDate } from '../../shared/functions/formatDate';

@Component({
  selector: 'app-root-list',
  templateUrl: './root-list.component.html',
  styleUrls: ['../../app.component.css']
})
export class RootListComponent implements OnInit {
  @Input()listado : any[] = []
  @Input()template:ListTemplate = {} as  ListTemplate
  @Input()section = ''

   @Input()mainShow=false  
   @Input()mainEdit=true  
   @Input()mainDelete=true  

   @Output("setDataRelation")setDataRelation:EventEmitter<any> = new EventEmitter()
  
    accordionHoving = null; 
    onModalClose = false
  
    constructor(
      private rootService: RootService,
    ) {}

   @Input()queryPlus :any[]=[]
  
  
    isOpen: number[] =[];
    isLoading: number[]=[]

    relationsStatus: any[] =[]
  
  
    ngOnInit() {
      this.isOpen = []
      this.isLoading = []
    }
        
        openCloseAccordion(index:number){
          if(this.isActive(index))return this.isOpen.splice(this.isOpen.indexOf(index),1);
          this.isOpen.push(index)
          if(this.gettingData(index) || this.listado[index]['charged']) return
          this.isLoading.push(index)
          this.template.relations.forEach(relation=>{
            this.rootService.getRelation(this.section,this.listado[index].id,relation.section).subscribe((res:any)=>{
              this.listado[index][relation.section] = res.data
              this.listado[index]['charged'] = true
              this.isLoading.splice(this.isLoading.indexOf(index),1)
            },error=>{
              this.listado[index]['charged'] = true
              this.listado[index][relation.section] = 'error'
              this.isLoading.splice(this.isLoading.indexOf(index),1)
            })
          })
      }
    

    getStatusRelation(title:string,index : number){
      const relation = this.relationsStatus.filter(relation=>relation.title === title)[index]
    }

    gettingTemplateDate(object:any){
      const obj = object
      return this.template.header
    }

    isActive(index:number):boolean{
      return this.isOpen.includes(index)
    }
    gettingData(index:number):boolean{
      return this.isLoading.includes(index)
    }
  
    hoving(index:any){
      if(this.accordionHoving<0)return this.accordionHoving = index +1
      if(this.accordionHoving === index)return this.accordionHoving = -1
    }
    notHoving(){
      if(this.onModalClose)return
      return this.accordionHoving = -1
    }

  
    delete(id: number,index:number) {
      console.log(id, index)
      this.rootService.delete(this.section,id).subscribe(res=>{
        this.listado.splice(index,1)
      })
    }
    deleteRelation(id: number,indexObj:number, indexRelation:number, relation:string) {
      console.log(id,indexRelation, indexObj,relation)
      this.rootService.delete(relation,id).subscribe((res=>{
        this.listado[indexObj][relation].splice(indexRelation,1)
      }))
    }
    formatDate= formatDate
}
