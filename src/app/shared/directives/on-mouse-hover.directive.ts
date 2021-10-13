import { Directive, ElementRef, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appOnMouseHover]'
})
export class OnMouseHoverDirective {

  // @Output()

  constructor(private elementRef: ElementRef) { }

  @HostListener('mouseover',['$event'])mouseHover(event:any){
    console.log(event,'1qawdwadw')
  }

}
