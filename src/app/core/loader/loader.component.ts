import { Component, OnInit } from "@angular/core";
import { LoaderService } from "../../services/loader/loader.service";

  @Component({
    selector:'loader-spinner',
    templateUrl:'./loader.component.html',
  })
  export class LoaderComponent implements OnInit{
    constructor(private loaderService: LoaderService){}

    spinner =false

    version:string = '1.2.3.4'
    fecha:string = '15/08/98'

    ngOnInit(){
      this.loaderService.getLoad.subscribe(loading=>this.spinner=loading)
    }
  }