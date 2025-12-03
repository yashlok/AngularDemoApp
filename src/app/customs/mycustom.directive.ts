import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMycustom]'
})
export class MycustomDirective {

  @Input('color')
  color: string | undefined;

  @Input('name')
  nm: string | undefined;

  constructor(private ele: ElementRef) {
    console.log(this.ele.nativeElement);
    this.ele.nativeElement.style.color = "red";
  }

  @HostListener('mouseover')
  onMouseOver() {
    this.ele.nativeElement.style.color = this.color;
  }

  @HostListener('mouseout')
  onMyMouseOut() {
    this.ele.nativeElement.style.color = 'black';
  }

  @HostListener('click')
  OnClick() {
    alert('clicked' + this.nm);
  }

}
