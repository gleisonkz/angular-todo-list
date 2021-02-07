import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[truncateText]',
})
export class TruncateTextDirective implements OnInit {
  @Input() maxWidth$: Subject<number>;

  constructor(private elemRef: ElementRef) {}

  private get nativeElement(): HTMLSpanElement {
    return this.elemRef.nativeElement;
  }

  ngOnInit(): void {
    this.nativeElement.style.whiteSpace = 'nowrap';
    this.nativeElement.style.overflow = 'hidden';
    this.nativeElement.style.textOverflow = 'ellipsis';
    this.maxWidth$.subscribe((currentWidth) => {
      const newMaxWidth = currentWidth - 100;
      this.nativeElement.style.maxWidth = `${newMaxWidth}px`;
    });
  }
}
