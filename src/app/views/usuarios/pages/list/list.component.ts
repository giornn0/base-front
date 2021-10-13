import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { RootService } from "../../../../services/http/root.service";
import { formatDate } from "../../../../shared/functions/formatDate";
import { User } from "../../../../shared/models/user.model";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["../../../../app.component.css"],
})
export class ListComponent implements OnInit {
  @ViewChild('topScrollAnchor')topScroll:ElementRef
  users: User[] = [];
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 30;
  totalPages = 0;
  searchValue: string = "";
  queryParams = { queryParams: { page: 1, take: 30, search: null } };

  accordionHoving = null;
  onModalClose = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private rootService: RootService,
    private router: Router,
  ) {}




  takeOptions: number[] =[5,10,15,30,50,100]

  ngOnInit() {
    
    this.activatedRoute.data.subscribe((data) => {
      this.users = data.users.data as User[];
      if (data.users.pagination) {
        this.totalPages = data.users.pagination.totalPages;
        this.currentPage = data.users.pagination.actualPage;
        this.totalItems = data.users.pagination.totalResults;
        this.itemsPerPage = data.users.pagination.resultPerPage;
        this.queryParams.queryParams.page =
          data.users.pagination.actualPage;
        this.queryParams.queryParams.take =
          data.users.pagination.resultPerPage;
      }
    });
    this.activatedRoute.queryParams.subscribe((query) => {
      this.rootService
        .index('users',query.page, query.take, query.search)
        .subscribe((res: any) => {
          this.users = res.data as User[];
          this.itemsPerPage =res.pagination.resultPerPage;
          this.totalItems = res.pagination.totalResults;
           this.totalPages = res.pagination.totalPages;
        });
        });
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
    this.topScroll.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.itemsPerPage = total;
    this.queryParams.queryParams.take = total;
    this.router.navigate([`/users/listar`], this.queryParams);
  }

  pageChange(pageChange: PageChangedEvent) {
    this.topScroll.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.queryParams.queryParams.page = pageChange.page;
    this.router.navigate([`/users/listar`], this.queryParams);
  }

  search(busqueda: string) {
    this.searchValue = busqueda;
    this.queryParams.queryParams.search = busqueda;
    this.queryParams.queryParams.page = 1;
    return this.router.navigate([`/users/listar`], this.queryParams);
  }

  searchByEvent(event: any, busqueda: string) {
    if (event.key === "Enter") {
      this.searchValue = busqueda;
      this.queryParams.queryParams.search = busqueda;
      this.queryParams.queryParams.page = 1;
      return this.router.navigate([`/users/listar`], this.queryParams);
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
    this.rootService.delete('users',id).subscribe((res) => {
      console.log(res);
      this.rootService
        .index('users',
          this.queryParams.queryParams.page,
          this.queryParams.queryParams.take,
          this.queryParams.queryParams.search
        )
        .subscribe((res: any) => {
          this.users = res.data as User[];
          if (this.queryParams.queryParams.search)
            this.totalItems = res.pagination.totalResults;
        });
    });
  }
  
  formatDate = formatDate
}
