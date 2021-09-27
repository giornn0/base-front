import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['../../../app.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }
  fecha:string;
  version:string;

  ngOnInit(): void {
    this.fecha = localStorage.getItem('fecha')
    this.version  = localStorage.getItem('version')
  }

}
