import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AlertsService } from '../../services/alerts/alerts.service';
import { RootService } from '../../services/http/root.service';
import { MaskedDate } from '../../shared/functions/mask.date';
import { InputTemplate } from '../../shared/models/basic/template.form.model';

@Component({
  selector: 'app-root-form',
  templateUrl: './root-form.component.html',
  styleUrls: ['../../app.component.css']
})
export class RootFormComponent implements OnInit {

  dateMask = MaskedDate

  @Input()section = ''
  @Input()prefix = ''
  @Input()camps:string[] = []
  @Input()forEdit = false
  @Input()title = ''
  @Input()wantActions=true
  @Input()wantTitle=true

  @Input()routeForReroute=null
  @Input()FileRoute=null
  @Input()maxFileSize='2MB'

  @Input()reRoute = false
  @Input()disableIfInvalid = false

  @Input()selectOptions:any[][] = []

  @Input()template:Array<InputTemplate[]> =  []
  @Input()validation = {}

  useProjectRoutes = ''
  @Input()loadTemplate=true
  @Input() warnedCamps = null

  @Input()validationFiltro=null

  @Output()selectionOfAnObject: EventEmitter<any> =  new EventEmitter()

  @ViewChildren('filterOptions')filterOpt:QueryList<ElementRef>

  listFromFilter=[]
  refreshingFilter=false
  listSelectedFromFilter=[]
  constructor(private rootService:RootService,private router: Router, private fBuilder: FormBuilder, private alertService: AlertsService) { }


  submitted = {}
  form : FormGroup = this.fBuilder.group({
    id:'',
  })

  filtroForm:FormGroup=this.fBuilder.group({
  })

  ngOnInit(): void {
    const production = environment.production
    this.reRoute = this.reRoute || production
    this.camps.forEach(key=>{
      this.form.addControl(key,this.fBuilder.control(this.validation[key][0],this.validation[key][1]))
    })
    if(this.validationFiltro)Object.keys(this.validationFiltro).forEach(key=>{
      this.filtroForm.addControl(key,this.fBuilder.control(this.validationFiltro[key][0],this.validationFiltro[key][1]))
    })
    if(this.forEdit){
      this.submitted = this.forEdit
      this.form.reset(this.forEdit)
    }
    this.form.valueChanges.subscribe(form=>{
      this.submitted = form
    })
    if(!this.routeForReroute) this.useProjectRoutes =`/${(this.prefix?this.prefix+'/':'')+this.section}/listar`
    else this.useProjectRoutes = this.routeForReroute
  }

  isTouched(field: string): boolean {
    return !!this.form.controls[field].touched;
  }
  isInvalid(field: string): boolean {
    return !! this.form.controls[field].invalid;
    }
    hasValue(field: string,options:[]|null=null,access:string|null=null){
    if(options){
      let arr = []
      options.forEach(option=>arr.push(option[access]))
      return !!(this.form.controls[field].value==="" || arr.includes(this.form.controls[field].value) )
    }
    return !!(this.form.controls[field].value==="" && this.form.controls[field].value !=0)
  }

  addFocusInput(campo: string) {
    console.log(campo)
    document.getElementById(campo).focus();
  }

  submit() {
    if (this.form.valid) {
      if (this.forEdit) {
        this.rootService
          .update(this.section,this.submitted, this.form.controls["id"].value)
          .subscribe((res:any) => {if(this.reRoute)this.router.navigate([`${this.useProjectRoutes}`]);console.log(res);
            if(this.FileRoute)this.rootService.createUpdateSetFile(this.section,this.FileRoute,this.newFormData,res.id).subscribe(res=>{
              console.log(res)
            })
        });
      } else {
        this.rootService
        .create(this.section,this.submitted)
        .subscribe((res:any) => {if(this.reRoute)this.router.navigate([`${this.useProjectRoutes}`]);console.log(res);
          if(this.FileRoute)this.rootService.createUpdateSetFile(this.section,this.FileRoute,this.newFormData,res.id).subscribe(res=>{
            console.log(res)
          })
        });
      }
    } else {
      this.form.markAllAsTouched();
      this.camps.some((campo) => {
        if (this.form.controls[campo].invalid) {
          this.addFocusInput(campo);
          return true;
        }
      });
      let arrInvalidCamps = []
      this.camps.forEach((campo)=>{
        if(this.form.controls[campo].invalid)arrInvalidCamps.push(this.styleCamp(campo))
      })
      this.alertService.addAlert('warning','Campos Erróneos!',`Por favor, completar/revisar los campos: ${arrInvalidCamps.join(', ')}`)
    }
  }

  styleCamp(string:string){
    if(string==='password')return'contraseña'
    if(string==='username'||string ==='name')return 'usuario'
    return string.replaceAll('_',' ').replace('id','')
  }

  cuitMask(event:any){
      var v = event.target.value;
      if (v.match(/^\d{2}$/) !== null) {
        if(this.camps.includes('dni'))return  event.target.value = v + '-'+this.form.controls['dni'].value+'-';
        event.target.value+=  '-';
      } else if (v.match(/^\d{2}\-\d{8}$/) !== null) {
        event.target.value = v + '-';
      }
  }
  zerofill(event:any,length,control){
    var z = event.target.value;
    event.target.value = z.replace(/[^\d]/,'')
    const withUse = event.target.value
    if(withUse.length>length){
      this.form.controls[control].patchValue( withUse.substring(1))
    }
    else{
      this.form.controls[control].patchValue( '0'.repeat(length-withUse.length)+withUse)
    }
  }
  newFormData=new FormData();
  fileName=null

  uploadItem(event,control){
    const uploadedFile = event.target.files[0]
    if(uploadedFile.size>2000000){
      this.alertService.addAlert('warning',`Archivo muy grande! (max: ${this.maxFileSize})`)
    }
    else{
      this.fileName = event.target.files[0].name
      this.newFormData.append(control,event.target.files[0],event.target.files[0].name)
      this.form.controls[control].patchValue(this.newFormData)
    }
  }
  
  cleanFile(control){
    this.newFormData = new FormData()
    this.fileName = null
    this.form.controls[control].patchValue(null)
  }

  updatingArr(value,control){
    if(!value)return
    let array = this.form.controls[control].value
    if(!array.includes(value)){
      array.push(value)
      this.form.controls[control].setValue(array)
    }
    else{
      array.splice(array.indexOf(value),1)
      this.form.controls[control].setValue(array)
    }
  }

  filterFocus=0

  actionsFilter(event:KeyboardEvent,index){
      if(event.key=='ArrowDown'){
        if(this.filterOpt.toArray()[index+1])this.filterOpt.toArray()[index+1].nativeElement.focus()
        else this.filterOpt.toArray()[0].nativeElement.focus()
      }
      else if(event.key=='ArrowUp'){
        if(this.filterOpt.toArray()[index-1])this.filterOpt.toArray()[index-1].nativeElement.focus()
        else this.filterOpt.toArray()[this.filterOpt.toArray().length-1].nativeElement.focus()
      }
      else if(event.key =='Enter'){
        this.filterOpt.toArray()[index].nativeElement.click()
      }
    // this.changing=false
  }

  pushToFilter(option,control){
    const {classAnimationIn,classAnimationOut,...trueOption} = option
    this.form.controls[control].value.push(trueOption)
    this.listFromFilter=[]
  }
  removeFromFilter(option,control){
    setTimeout(()=>{
      this.form.controls[control].patchValue(this.form.controls[control].value.filter((objList)=>objList.id!=option.id))
    },1200)
  }
  
  isSelectedForTheFilter(option,control):boolean{
    const {classAnimationIn,classAnimationOut,...trueOption} = option
    return this.form.controls[control].value.includes(option)
  }

}
