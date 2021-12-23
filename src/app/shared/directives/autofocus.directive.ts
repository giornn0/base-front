import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective  implements AfterViewInit{

  constructor(private renderer2:Renderer2, private elmentRef: ElementRef) { }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if(this.elmentRef.nativeElement)this.renderer2.selectRootElement(this.elmentRef.nativeElement.focus())
    
  }

}
