import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appOnClick]'
})
export class onClickDirective {

  // @Output()

  @Output()clicked: EventEmitter<boolean> = new EventEmitter()

  waiting ;
  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click',['$event.target'])mouseHover(event:any){
    const clickIn = this. elementRef.nativeElement.contains(event)
    this.clicked.emit(clickIn)
  }

  // @HostListener('mouseleave')mouseLeave(){
  //   this.waiting  = setTimeout(()=>{
  //     this.clicked.emit(false)
  //   },2000)
  // }
  // @HostListener('mouseenter')mouseEnter(){
  //   clearTimeout(this.waiting)
  // }

}
