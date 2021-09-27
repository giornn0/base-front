import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ContratosService } from "../../../../services/http/contratos/contratos.service";
import { Contrato } from "../../../../shared/models/contrato.model";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { Pago } from "../../../../shared/models/pago.model";
import { LoaderService } from "../../../../services/loader/loader.service";
import { PagosService } from "../../../../services/http/pagos/pagos.service";
import { formatDate } from '../../../../shared/functions/formDate';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["../../../../app.component.css"],
})
export class ListComponent implements OnInit {
  contratos: Contrato[] = [];
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 30;
  totalPages = 0;
  searchValue: string = "";
  queryParams = { queryParams: { page: 1, take: 30, search: null } };

  accordionHoving = null;
  onModalClose = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contratosService: ContratosService,
    private router: Router,
    private pagosService: PagosService,
  ) {}

  isOpen: number[] = [];
  isLoading: number[] = [];
  pagosCharged: number[] = [];
  pagosErrors: number[] = [];
  clienteCharged: number[] = [];
  clienteErrors: boolean[] = [];

  takeOptions: number[] = [5, 10, 15, 30, 50, 100];

  mediosPago=[ 'Transferencia','Efectivo']

  ngOnInit() {
    this.isOpen = [];
    this.isLoading = [];
    this.pagosCharged = [];
    this.pagosErrors = [];
    this.clienteCharged = [];
    this.clienteErrors = [];
    this.activatedRoute.data.subscribe((data) => {
      this.contratos = data.contratos.data as Contrato[];
      if (data.contratos.pagination) {
        this.totalPages = data.contratos.pagination.totalPages;
        this.currentPage = data.contratos.pagination.actualPage;
        this.totalItems = data.contratos.pagination.totalResults;
        this.itemsPerPage = data.contratos.pagination.resultPerPage;
        this.queryParams.queryParams.page =
          data.contratos.pagination.actualPage;
        this.queryParams.queryParams.take =
          data.contratos.pagination.resultPerPage;
      }
    });
    this.activatedRoute.queryParams.subscribe((query) => {
      this.contratosService
        .index(query.page, query.take, query.search)
        .subscribe((res: any) => {
          this.contratos = res.data as Contrato[];
          this.isLoading = [];
          this.pagosCharged = [];
          this.pagosErrors = [];
          this.clienteCharged = [];
          this.clienteErrors = [];
          this.isOpen = [];
          this.itemsPerPage = res.pagination.resultPerPage;
          this.totalItems = res.pagination.totalResults;
          this.totalPages = res.pagination.totalPages;
        });
    });
  }

  openCloseAccordion(index: number) {
    if (this.isActive(index)) {
      this.isOpen.splice(this.isOpen.indexOf(index), 1);
      return;
    }
    if (this.gettingData(index)) return;
    if (!this.isActive(index)) {
      this.isOpen.push(index);
      if(this.pagosCharged.includes(index))return
      this.isLoading.push(index);
      this.pagosService.getContrato(this.contratos[index].contrato_id).subscribe((res:any)=>{
        this.pagosCharged.push(index)
        this.contratos[index].pagos = res.data
        this.isLoading.splice(this.isLoading.indexOf(index), 1);
      },error=>{
        this.pagosErrors.push(index)
      })
    }
  }
  isActive(index: number): boolean {
    return this.isOpen.includes(index);
  }
  gettingData(index: number): boolean {
    return this.isLoading.includes(index);
  }
  hoving(index: any) {
    if (this.accordionHoving < 0) return (this.accordionHoving = index + 1);
    if (this.accordionHoving === index) return (this.accordionHoving = -1);
  }
  notHoving() {
    if (this.onModalClose) return;
    return (this.accordionHoving = -1);
  }

  changeTotalItems(total: number) {
    this.itemsPerPage = total;
    this.queryParams.queryParams.take = total;
    this.router.navigate([`/contratos/listar`], this.queryParams);
  }

  pageChange(pageChange: PageChangedEvent) {
    this.queryParams.queryParams.page = pageChange.page;
    this.router.navigate([`/contratos/listar`], this.queryParams);
  }

  search(busqueda: string) {
    this.searchValue = busqueda;
    this.queryParams.queryParams.search = busqueda;
    this.queryParams.queryParams.page = 1;
    if (!busqueda.length) this.queryParams.queryParams.search = undefined;
    return this.router.navigate([`/contratos/listar`], this.queryParams);
  }
  
  searchByEvent(event: any, busqueda: string) {
    if (event.key === "Enter") {
      return this.search(busqueda)
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
    this.contratosService.delete(id).subscribe((res) => {
      console.log(res);
      this.contratosService
        .index(
          this.queryParams.queryParams.page,
          this.queryParams.queryParams.take,
          this.queryParams.queryParams.search
        )
        .subscribe((res: any) => {
          this.contratos = res.data as Contrato[];
          if (this.queryParams.queryParams.search)
            this.totalItems = res.pagination.totalResults;
        });
    });
  }
  deletePlan(id: number, indexObra: number, indexPlan: number) {
    console.log(id, indexObra, indexPlan);
    // this.contratos[indexObra].pagos.splice(indexPlan,1)
    // this.pagosSocialesService.delete(id).subscribe((res) => {
    //   console.log(res);
    // });
  }

  formatDate = formatDate
}
