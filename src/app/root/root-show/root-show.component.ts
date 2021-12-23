import { Component,  EventEmitter,  Input,  OnInit, Output, } from '@angular/core';
import { RootService } from '../../services/http/root.service';
import { ListTemplate, MainListTemplate } from '../../shared/models/basic/template.list.model';
import { formatDate } from '../../shared/functions/formatDate';
import { LoaderService } from '../../services/loader/loader.service';
import { showFromBehind, showFromLeft } from '../../shared/animations/show';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root-show',
  templateUrl: './root-show.component.html',
  styleUrls: ['../../app.component.css'],
  animations:[
    showFromLeft,
    showFromBehind
  ]
})
export class RootShowComponent implements OnInit {
  @Input()listado : ListTemplate[] = []
  @Input()queryPlus :any[]=[]
  @Input()template:MainListTemplate = {} as  MainListTemplate;
  @Input()section = '';
  @Input()route = '';

   @Input()mainShow=false  
   @Input()mainEdit=true  
   @Input()mainDelete=true 
   @Input()opcionesEstadoListar=null

   @Input()open = false

   @Output("setDataRelation")setDataRelation:EventEmitter<any> = new EventEmitter();
   @Output()changeStatus:EventEmitter<any> =  new EventEmitter()
    accordionHoving = null; 
    onModalClose = false
  
    constructor(
      private rootService: RootService,
      private loadService: LoaderService,
      private router:Router
    ) {}

  
  
    isOpen: number[] =[];
    isLoading: number[]=[]

    relationsStatus: any[] =[]
  
  
    ngOnInit() {
      this.isOpen = []
      this.isLoading = []
      if(this.open) this.openCloseAccordion(0)
    }
        
        openCloseAccordion(index:number){
          if(this.isActive(index))return this.isOpen.splice(this.isOpen.indexOf(index),1);
          this.isOpen.push(index)
          if(this.gettingData(index) || this.listado[index]['charged']) return
          this.isLoading.push(index)
          if(this.template.relations && this.template.relations.length)this.template.relations.forEach(relation=>{
            this.loadService.inPageLoad = true
            if(!relation.unique ) this.rootService.getRelation(this.section,this.listado[index].id,relation.section).subscribe((res:any)=>{
              this.listado[index][relation.section] = res[0].data.length ? res[0].data : 'empty'
              this.listado[index]['charged'] = true
              this.isLoading.splice(this.isLoading.indexOf(index),1)
            },error=>{
              this.listado[index]['charged'] = true
              this.listado[index][relation.section] = 'error'
              this.isLoading.splice(this.isLoading.indexOf(index),1)
            })
            else{
              if(this.listado[index][relation.section]) this.rootService.getOne(relation.section,this.listado[index][relation.section]).subscribe((res:any)=>{
                this.listado[index][relation.section] = res[0]
                this.listado[index]['charged'] = true
                this.isLoading.splice(this.isLoading.indexOf(index),1)
              },error=>{
                this.listado[index]['charged'] = true
                this.listado[index][relation.section] = 'error'
                this.isLoading.splice(this.isLoading.indexOf(index),1)
              })
              else{
                this.listado[index]['charged'] = true
                this.listado[index][relation.section] = 'empty'
                this.isLoading.splice(this.isLoading.indexOf(index),1)
              }
            }
          })
          else{
            this.isLoading.splice(this.isLoading.indexOf(index),1)
          }
      }
    
      isActive(index:number):boolean{
        return this.isOpen.includes(index)
      }

    getStatusRelation(title:string,index : number){
      const relation = this.relationsStatus.filter(relation=>relation.title === title)[index]
    }

    gettingTemplateDate(object:any){
      const obj = object
      return this.template.headIcon
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

  
    delete(id: number) {
      this.rootService.delete(this.section,id).subscribe(res=>{
        this.router.navigate([this.route+'/listar'])
      })
    }
    deleteRelation(id: number,indexObj:number, indexRelation:number, relation:string) {
      console.log(id,indexRelation, indexObj,relation)
      this.rootService.delete(relation,id).subscribe((res=>{
        this.listado[indexObj][relation].splice(indexRelation,1)
      }))
    }
    changeEstado(valor:valores,id:number){
      const changeEstado= {
        onlyEstado:true,
        valor:valor.value,
        id
      }
      this.listado[0].classEstadoChanging = true
      this.loadService.inPageLoad=true
      this.rootService.update(this.section,changeEstado,id).subscribe((res:any)=>{
        this.listado[0].classEstado = valor.classEstado
        this.listado[0].estado = valor.description
        this.listado[0].classEstadoChanging = false
      })
    }

    isNan(value){
      return isNaN(value)
    }
    isArr(value){
      return Array.isArray(value) 
    }
    formatDate= formatDate
}
interface valores{
  description:string
  classEstado:string
  value:number
}