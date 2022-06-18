import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  constructor(private readonly elRef:ElementRef) { }
  @HostListener('input',['$event'])
  onChangeInput(event:Event):void{
    //console.log(this.elRef.nativeElement.value)
    const numbers=/[^0-9]*/g;

    const init:string=this.elRef.nativeElement.value;

    this.elRef.nativeElement.value=init.replace(numbers,'');

    if(init!==this.elRef.nativeElement.value) event.stopPropagation();

  }
}
