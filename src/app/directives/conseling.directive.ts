import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appConseling]'
})
export class ConselingDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
