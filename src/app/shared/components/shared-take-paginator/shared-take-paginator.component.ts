import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shared-take-paginator',
  templateUrl: './shared-take-paginator.component.html',
  styleUrls: ['./shared-take-paginator.component.scss']
})
export class SharedTakePaginatorComponent implements OnInit {
  @Input()i_perPage =''
  @Output()c_TotalItems: EventEmitter<number> = new EventEmitter()

  constructor() { }


  takeOptions: number[] =[5,10,15,30,50,100]

  ngOnInit(): void {
    this.i_perPage = this.i_perPage
  }

}
