import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
// import { ObraSocial } from "../../../shared/models/obra-social.model";
import { RootService } from '../../../services/http/root.service';
import { fontName, fontNumber, fontPrimary } from "../../../shared/models/template.form.model";
import { formatDate } from "../../../shared/functions/formatDate";


@Component({
  selector: "app-list",
  templateUrl: "./list.template.html",
  styleUrls: ["../../../app.component.css"],
})
export class ListComponent implements OnInit {
@ViewChild('topScrollAnchor')topScroll:ElementRef
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 30;
  totalPages = 0;
  searchValue: string = "";
  queryParams = { queryParams: { page: 1, take: 30, search: null } };

  constructor(
    private activatedRoute: ActivatedRoute,
    private rootService: RootService,
    private router: Router, 
  ) {}


  ngOnInit() {    
    this.activatedRoute.data.subscribe((data) => {
      this.obras = data.obrasSociales.data
      this.obras.forEach(obra=>{
          const obraData = this.setData(obra)
        this.listForTemplate.push(obraData)
      })
      if (data.obrasSociales.pagination) {
        this.totalPages = data.obrasSociales.pagination.totalPages;
        this.currentPage = data.obrasSociales.pagination.actualPage;
        this.totalItems = data.obrasSociales.pagination.totalResults;
        this.itemsPerPage = data.obrasSociales.pagination.resultPerPage;
        this.queryParams.queryParams.page =
          data.obrasSociales.pagination.actualPage;
        this.queryParams.queryParams.take =
          data.obrasSociales.pagination.resultPerPage;
      }
    });
    this.activatedRoute.queryParams.subscribe((query) => {
      console.log(query)
      this.rootService
        .index('obrasSociales',query.page, query.take, query.search)
        .subscribe((res: any) => {
          this.obras = res.data
          this.obras.forEach(obra=>{
              const obraData = this.setData(obra)
              const obraQuery = this.setValueQueryPlus(obra)
              this.queryPlusSet.push(obraQuery)
            this.listForTemplate.push(obraData)
          })
          this.itemsPerPage =res.pagination.resultPerPage;
          this.totalItems = res.pagination.totalResults;
           this.totalPages = res.pagination.totalPages;
        });
        });
      }
  changeTotalItems(total: number) {
    this.topScroll.nativeElement.scrollIntoView();
    this.queryParams.queryParams.take = total;
    this.router.navigate([`/obrasSociales/listar`], this.queryParams);
  }
  
  pageChange(pageChange) {
    this.topScroll.nativeElement.scrollIntoView();
    this.queryParams.queryParams.page = pageChange.page;
    this.router.navigate([`/obrasSociales/listar`], this.queryParams);
  }

  search(busqueda: string) {
    this.searchValue = busqueda;
    this.queryParams.queryParams.search = busqueda;
    this.queryParams.queryParams.page = 1;
    return this.router.navigate([`/obrasSociales/listar`], this.queryParams);
  }
  templ = {
    headIcon: 'fa fa-institution mr-4 text-primary scaling',
    relations:[
        {
            title : 'Planes',
            section:'planes',
            plusText:'AGREGAR PLAN',
            tableHeaders: [
              'Código' ,' Nombre','Estado','N° Tabla asociada','Fecha creacion','Fecha actualizacion'
            ],
            properties:[
              {access:'codigo',font:fontPrimary},
              {access:'titulo',font:fontPrimary},
              {access:'estado',font:fontPrimary,type:'boolean',textTrue:'Activo',textFalse:'Inactivo'},
              {access:'numero_tabla_asociada',font:fontPrimary+' text-right'},
              {access:'created_at',font:fontNumber+' text-right',type:'date'},
              {access:'updated_at',font:fontNumber+' text-right',type:'date'},
            ]
        }
    ]
}

obras: any[] = []
listForTemplate : any[] =[]
queryPlusSet=[]

  setData(obj:any){
    return {
      header: `${obj.codigo} - ${obj.titulo}  /  ${obj.estado? 'Activo':'Inactivo'}`,
      properties: [
      {
          icon:'fa fa-id-card-o',
          font:fontPrimary,
          label:'Código',
          data: obj.codigo
      },
      {
          icon:'fa fa-user-o',
          font: fontName,
          label:'Nombre',
          data: obj.titulo
      },
      {
          icon: obj.estado?'fa fa-check text-success':'fa fa-times text-danger',
          font: obj.estado?'mb-0  font-weight-bold text-success':' mb-0 font-weight-bold text-danger',
          label:'Estado',
          data: obj.estado?'Activo':'Inactivo'
      },
      {
          icon:'fa fa-calendar',
          font:fontNumber,
          label:'Fecha creacion',
          data: formatDate(obj.created_at)
      },
      {
          icon:'fa fa-calendar',
          font:fontNumber,
          label:'Fecha actualización',
          data: obj.codigo
      },

  ],
  id: obj.id
}
}
setValueQueryPlus(obj){
  return {obra_social_id : obj.id}
}
}
