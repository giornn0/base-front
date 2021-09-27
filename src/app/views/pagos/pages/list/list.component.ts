import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Pago } from "../../../../shared/models/pago.model";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { PagosService } from "../../../../services/http/pagos/pagos.service";
import { formatDate } from "../../../../shared/functions/formDate";
import { Contrato } from "../../../../shared/models/contrato.model";
import { ContratosService } from "../../../../services/http/contratos/contratos.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
  templateUrl: "list.component.html",
  styleUrls: ["../../../../app.component.css"],
})
export class ListComponent implements OnInit {
  formatDate = formatDate;
  pagos: Pago[] = [];
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 5;
  totalPages = 0;
  searchValue: string = "";
  queryParams = { queryParams: { page: 1, take: 5, search: null } };

  accordionHoving = null;
  onModalClose = false;

  isOpen: number[] = [];
  isLoading: number[] = [];
  medioPagoCharged: number[] = [];
  medioPagoErrors: boolean[] = [];
  sppiner: boolean = false;

  takeOptions: number[] = [5, 10, 15, 30, 50, 100];

  constructor(
    private activatedRoute: ActivatedRoute,
    private pagosService: PagosService,
    private contratosService: ContratosService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  imgSource: SafeUrl[] = [];

  contratos: any[] = [];

  Buffer2URL(buffer, type) {
    if (buffer && buffer.data.length) {
      const uint = new Uint8Array(buffer.data);
      const blob = new Blob([uint], { type });
      const source = window.URL.createObjectURL(blob);
      const url = this.sanitizer.bypassSecurityTrustUrl(source);
      this.imgSource.push([url,false]);
    }
    else this.imgSource.push(['',false])
  }

  ngOnInit() {
    this.isOpen = [];
    this.isLoading = [];
    this.activatedRoute.data.subscribe((data) => {
      if(data.pagos.data)data.pagos.data.forEach((pago: Pago) => {
        this.Buffer2URL(pago.comprobante, pago.type_comprobante);
      });
      this.pagos = data.pagos.data as Pago[];
      if (data.pagos.pagination) {
        data.pagos.pagination.resultPerPage;
        this.totalPages = data.pagos.pagination.totalPages;
        this.currentPage = data.pagos.pagination.actualPage;
        this.totalItems = data.pagos.pagination.totalResults;
        this.itemsPerPage = data.pagos.pagination.resultPerPage;
        this.queryParams.queryParams.page = data.pagos.pagination.actualPage;
        this.queryParams.queryParams.take = data.pagos.pagination.resultPerPage;
      }
    });
    this.activatedRoute.queryParams.subscribe((query) => {
      this.imgSource = [];
      this.pagosService
        .index(query.page, query.take, query.search)
        .subscribe((res: any) => {
          if(res.data)res.data.forEach((pago:Pago)=>{this.Buffer2URL(pago.comprobante,pago.type_comprobante)})
          this.pagos = res.data as Pago[];
          this.isLoading = [];
          this.isOpen = [];
          this.totalItems = res.pagination.totalResults;
          this.totalPages = res.pagination.totalPages;
        });
      });
    }

    mediosPago = ["Transferencia", "Efectivo"];
    
    openCloseAccordion(index: number) {
      if (this.isLoading.includes(index)) return;
    if (this.isActive(index)) {
      this.isOpen.splice(this.isOpen.indexOf(index), 1);
      return;
    }
    if (!this.isActive(index)) {
      this.isOpen.push(index);
      if (this.contratos[index]&&this.contratos[index][1]) return;
      this.isLoading.push(index);
      this.contratos[index]=[]
      this.contratosService
        .getOne(this.pagos[index].contrato_id, false)
        .subscribe((res: any) => {
          this.contratos[index][0] = res.data[0];
          this.contratos[index][1]=true;
          this.isLoading.splice(this.isLoading.indexOf(index), 1);
        },rej=>{
          this.contratos[index][1]=false
        });
    }
  }
  isActive(index: number): boolean {
    return this.isOpen.includes(index);
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
    this.router.navigate([`/pagos/listar`], this.queryParams);
  }
  pageChange(pageChange: PageChangedEvent) {
    this.queryParams.queryParams.page = pageChange.page;
    this.router.navigate([`/pagos/listar`], this.queryParams);
  }
  search(busqueda: string) {
    this.searchValue = busqueda;
    this.queryParams.queryParams.search = busqueda;
    this.queryParams.queryParams.page = 1;
    if (!busqueda.length) this.queryParams.queryParams.search = undefined;
    return this.router.navigate([`/pagos/listar`], this.queryParams);
  }
  searchByEvent(event: any, busqueda: string) {
    if (event.key === "Enter") {
      this.search(busqueda);
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
    this.pagosService.delete(id).subscribe((res) => {
      this.imgSource=[]
      this.pagosService
      .index(
        this.queryParams.queryParams.page,
        this.queryParams.queryParams.take,
          this.queryParams.queryParams.search
          )
          .subscribe((res: any) => {
            this.pagos = res.data as Pago[];
                if(res.data)res.data.forEach((pago: Pago) => {
                  this.Buffer2URL(pago.comprobante, pago.type_comprobante);
                });
                this.isLoading = [];
                this.isOpen = [];
                this.totalItems = res.pagination.totalResults;
                this.totalPages = res.pagination.totalPages;
          if (this.queryParams.queryParams.search)
            this.totalItems = res.pagination.totalResults;
        });
    });
  }
}
