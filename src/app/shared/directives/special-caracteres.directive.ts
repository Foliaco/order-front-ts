import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[specialCaracteres]'
})
export class SpecialCaracteres {

  constructor(private readonly elRef:ElementRef) { }

  @HostListener('input',['$event'])
  onInput(event:Event):void{
    let a:string=this.elRef.nativeElement.value;
    let exp=/\W+/i;
    this.elRef.nativeElement.value=a.replace(exp,'');
    console.log(exp.test(a));
    if(exp.test(a)===false) event.stopPropagation();
  }
}
