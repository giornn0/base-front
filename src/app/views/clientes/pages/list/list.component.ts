import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { ClientesService } from "../../../../services/http/clientes/clientes.service";
import { Cliente } from "../../../../shared/models/cliente.model";
import { formatDate } from '../../../../shared/functions/formDate';

interface obj {
  nombre: string;
  definicions: string;
}

@Component({
  templateUrl: "list.component.html",
  styleUrls: ["../../../../app.component.css"],
})
export class ListComponent implements OnInit {
  clientes: Cliente[] = [];
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 5;
  totalPages = 0;
  searchValue: string = "";
  queryParams = { queryParams: { page: 1, take: 5, search: null } };

  accordionHoving = null;
  accordionDeleting= null;
  onModalClose = false;

  takeOptions: number[] =[5,10,15,30,50,100]

  isOpen: number[] =[];
  isLoading: number[]=[]
  prestacionesCharged: number[] =[]
  prestacionesErrors : boolean[]=[]
  sppiner: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientesService: ClientesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = []
    this.prestacionesCharged = []
    this.prestacionesErrors=[]
    this.isOpen = []
    this.activatedRoute.data.subscribe((data) => {
      this.clientes = data.clientes.data as Cliente[];
      if (data.clientes.pagination) {
          this.totalPages = data.clientes.pagination.totalPages;
        this.currentPage = data.clientes.pagination.actualPage;
        this.totalItems = data.clientes.pagination.totalResults;
        this.itemsPerPage = data.clientes.pagination.resultPerPage;
        this.queryParams.queryParams.page =
        data.clientes.pagination.actualPage;
        this.queryParams.queryParams.take =
          data.clientes.pagination.resultPerPage;
        }
      });
      this.activatedRoute.queryParams.subscribe((query) => {
        this.clientesService
        .index(query.page, query.take, query.search)
        .subscribe((res: any) => {
          this.clientes = res.data as Cliente[];
          this.itemsPerPage=res.pagination.resultPerPage
            this.totalItems = res.pagination.totalResults;
            this.totalPages = res.pagination.totalPages;          
            this.isLoading = []
            this.prestacionesCharged = []
            this.isOpen = []
            this.prestacionesErrors=[]
        });
    });
  }

  
  openCloseAccordion(index:number){
    if(this.isActive(index)) {this.isOpen.splice(this.isOpen.indexOf(index),1);return }
    if(this.gettingData(index))return
    if(!this.isActive(index)){
      this.isLoading.push(index)
      this.isOpen.push(index)
      this.isLoading.splice(this.isLoading.indexOf(index),1)
    }
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
  changeTotalItems(total: number) {
    this.itemsPerPage = total;
    this.queryParams.queryParams.take = total;
    this.router.navigate([`/clientes/listar`], this.queryParams);
  }

  pageChange(pageChange: PageChangedEvent) {
    this.queryParams.queryParams.page = pageChange.page;
    this.router.navigate([`/clientes/listar`], this.queryParams);
  }

  search(busqueda: string) {
    this.searchValue = busqueda;
    this.queryParams.queryParams.search = busqueda;
    this.queryParams.queryParams.page = 1;
    this.queryParams.queryParams.take = this.itemsPerPage;
    if (!busqueda.length) this.queryParams.queryParams.search = undefined;
    return this.router.navigate([`/clientes/listar`], this.queryParams);
  }
  searchByEvent(event: any, busqueda: string) {
    if (event.key === "Enter") {
      this.search(busqueda)
    }
    if (event.key === "Escape") {
      this.cleanSearch();
    }
  }
  cleanSearch() {
    (<HTMLInputElement>document.getElementById("busqueda")).value = "";
    document.getElementById("busqueda").focus();
  }

  
  delete(id: number) {
    console.log(id, "eliminando");
  }

  formatDate = formatDate
}
