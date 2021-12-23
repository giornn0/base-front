import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appOnMouseHover]'
})
export class OnMouseHoverDirective {

  @Output()mouseOver: EventEmitter<any>=  new EventEmitter()
  @Output()mouseOff: EventEmitter<any>=  new EventEmitter()

  constructor(private elementRef: ElementRef) { }

  @HostListener('mouseenter')hovering(){
    this.mouseOver.emit()
  }
  @HostListener('mouseleave')leaving(){
    this.mouseOff.emit()
  }

}
