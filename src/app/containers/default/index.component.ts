import {  Component, OnInit,  } from '@angular/core';
import { Alert, AlertsService } from "../../services/alerts/alerts.service";
import { LoaderService } from "../../services/loader/loader.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./index.component.html",
  styleUrls: ["../../app.component.css"],
})
export class IndexComponent implements OnInit{
  alert: Alert ={exists:false,type:'',message:'',title:''};
  loading:boolean=false ;

  version:string =''
  fecha:string =''

  constructor(
    private alertService: AlertsService,
    private loadService: LoaderService,
  ) {
  } 
  
  removeAlert(){
    this.alertService.removeAlert()
  }
  
  ngOnInit() {
    this.alertService.Alert.subscribe(res=>{
      setTimeout(() => {
        this.alert = res
      });
    })
    this.loadService.isLoading.subscribe(res=>{
       setTimeout(() => {
         this.loading = res
       });
   })
    this.version = localStorage.getItem('version')
    this.fecha = localStorage.getItem('fecha')
    
  }

}
