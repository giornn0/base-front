import { Component, OnInit } from "@angular/core";

@Component({
  selector:"aplicaciones",
  templateUrl:"aplicaciones.component.html"
})
export class AplicacionesComponent implements OnInit{
  constructor(){}
  ngOnInit(){

  }
  show=false
  toggle(){
    this.show = !this.show
  }
}