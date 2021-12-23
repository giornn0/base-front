import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  @Output()clickedOutside : EventEmitter<any> =  new EventEmitter()

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click',['$event.target'])onClick(target:any){
    const inside = this.elementRef.nativeElement.contains(target)
    if(!inside) this.clickedOutside.emit()
  }

}
