import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appOnClick]'
})
export class OnClickDirective {

  @Output()mouseOver: EventEmitter<any>=  new EventEmitter()
  @Output()mouseOff: EventEmitter<any>=  new EventEmitter()

  @Output()clickInside:EventEmitter<any>=  new EventEmitter()

  constructor(private elementRef: ElementRef) { }

  @HostListener('click',['event'])clicking(target:any){
    this.clickInside.emit()
  }
  @HostListener('mouseleave')leaving(){
    this.mouseOff.emit()
  }

}
