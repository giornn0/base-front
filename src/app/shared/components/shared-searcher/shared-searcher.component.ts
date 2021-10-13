import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shared-searcher',
  templateUrl: './shared-searcher.component.html',
  styleUrls: ['./shared-searcher.component.scss']
})
export class SharedSearcherComponent implements OnInit {

  @Output()valueSearch : EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  searchByEvent(event: any, busqueda: string) {
    if (event.key === "Enter") {
      this.valueSearch.emit(busqueda)
    }
    if (event.key === "Escape") {
      this.cleanSearch();
    }
  }
  cleanSearch() {
    (<HTMLInputElement>document.getElementById("busqueda")).value = "";
    document.getElementById("busqueda").focus();
  }

}
