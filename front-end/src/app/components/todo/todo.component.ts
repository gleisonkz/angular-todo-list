import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Mode } from 'src/app/enums/mode.enum';
import { UpdateEvent } from 'src/app/models/update-event';
import { KeyBoardKey } from '../../enums/keyboard';
import { Action } from './../../models/action.model';
import { Todo, TodoResource } from './../../models/todo.model';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Output()
  delete: EventEmitter<number> = new EventEmitter();
  @Output()
  update: EventEmitter<UpdateEvent<TodoResource>> = new EventEmitter();
  @Input() todo: Todo;
  @ViewChild('myInput')
  $input: ElementRef<HTMLInputElement>;

  currentMode: Mode = Mode.Show;
  todoControl: FormControl;
  formGroup: FormGroup;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  ngOnInit(): void {
    this.todoControl = new FormControl(this.todo.title, [Validators.required]);
    this.formGroup = new FormGroup({
      title: this.todoControl,
      isDone: new FormControl(this.todo.isDone),
    });
  }

  changeMode(): void {
    this.currentMode = this.currentMode === Mode.Edit ? Mode.Show : Mode.Edit;
    this.changeDetectorRef.detectChanges();
  }

  edit(): void {
    this.changeMode();
    this.$input.nativeElement.focus();
    this.$input.nativeElement.select();
  }

  handleKeyPress(event: KeyboardEvent) {
    const actions: Action<void>[] = [
      { match: event.key === KeyBoardKey.Enter, execute: this.save.bind(this) },
      {
        match: event.key === KeyBoardKey.Esc,
        execute: this.changeMode.bind(this),
      },
    ];

    const action = actions.find((action) => action.match);
    action?.execute();
  }

  save(changeMode = true): void {
    if (this.formGroup.invalid) return;
    this.update.emit({ itemID: this.todo.id, item: this.formGroup.value });
    changeMode && this.changeMode();
  }
}
