import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { KeyBoardDictionary, KeyBoardKey } from '../enums/keyboard';

@Directive({
  selector: '[KeyPressListener]',
})
export class KeyPressListenerDirective implements OnInit, OnDestroy {
  @Output('EscKeyPress') escEvent = new EventEmitter<KeyBoardKey>();
  @Output('EnterKeyPress') enterEvent = new EventEmitter<KeyBoardKey>();

  subscription = new Subscription();

  constructor(element: ElementRef<HTMLInputElement>) {
    const keys: KeyBoardDictionary = {
      Enter: () => this.enterEvent.emit(),
      Escape: () => this.escEvent.emit(),
    };

    this.subscription.add(
      fromEvent<KeyboardEvent>(element.nativeElement, 'keyup')
        .pipe(
          map(({ key }) => keys[key as KeyBoardKey]),
          filter((action) => !!action)
        )
        .subscribe((action) => action!())
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
