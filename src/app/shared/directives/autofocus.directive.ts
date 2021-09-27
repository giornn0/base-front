import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective {

  @Output()cleanInput: EventEmitter<unknown> = new EventEmitter()

  constructor(private elementRef: ElementRef) { }

  @HostListener('blur',['target'])centerFocus(target){
    this.cleanInput.emit()
  }

}
