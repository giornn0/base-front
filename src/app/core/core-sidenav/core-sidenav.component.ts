import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RootService } from '../../services/http/root.service';
import { navItems } from '../../_nav';
@Component({
  selector: 'app-core-sidenav',
  templateUrl: './core-sidenav.component.html',
  styleUrls: ['./core-sidenav.component.scss']
})
export class CoreSidenavComponent implements OnInit {

  constructor(private rootService:RootService, private fBuilder: FormBuilder) { }

  ngOnInit(): void {
  }


  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }


  @ViewChildren('primaryModal') public primaryModal: ModalDirective;

  options = [{value:'09',description:'ASOR 09'},{value:'04',description:'ASOR 04'}]

  show = false

  tablaForm: FormGroup = this.fBuilder.group({
    tipo_tabla : [null,[Validators.required]]
  })  

  tabla = new FormData();
  archivoName = null

  cleanImportador(){
    this.archivoName = null
    this.tablaForm.reset() 
  }

  uploadTabla(event){
    this.archivoName = event.target.files[0].name
    this.tabla.append('csv',event.target.files[0],event.target.files[0].name)
  };
  insertarTablas(){
    if(this.tablaForm.controls['tipo_tabla'].value ==='09')this.rootService.create('tablas/a09',this.tabla).subscribe(res=>{
      this.cleanImportador()
      console.log(res)
    })
    if(this.tablaForm.controls['tipo_tabla'].value ==='04')this.rootService.create('tablas/a04',this.tabla).subscribe(res=>{
      this.cleanImportador()
      console.log(res)
    })
  }

}
