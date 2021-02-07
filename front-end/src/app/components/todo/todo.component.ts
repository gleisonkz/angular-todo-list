import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { TruncateTextDirective } from 'src/app/directives/truncate-text.directive';
import { Mode } from 'src/app/models/mode.model';
import { UpdateEvent } from 'src/app/models/update-event';
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
  input: ElementRef<HTMLInputElement>;
  @ViewChild('$todo', { static: true })
  $todo: ElementRef<HTMLDivElement>;
  @ViewChild(TruncateTextDirective)
  truncateText: TruncateTextDirective;
  width$ = new Subject<number>();

  currentMode: Mode = Mode.Show;
  todoControl: FormControl;
  formGroup: FormGroup;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  ngOnInit(): void {
    this.todoControl = new FormControl(this.todo.title, [Validators.required]);
    this.formGroup = new FormGroup({
      title: this.todoControl,
      isDone: new FormControl(this.todo.isDone),
    });

    const observer = new ResizeObserver((entries) => {
      this.zone.run(() => {
        this.width$.next(entries[0].contentRect.width);
      });
    });

    observer.observe(this.$todo.nativeElement);
  }

  changeMode(): void {
    this.currentMode = this.currentMode === Mode.Edit ? Mode.Show : Mode.Edit;
    this.changeDetectorRef.detectChanges();
  }

  edit(): void {
    this.currentMode = Mode.Edit;
    this.changeDetectorRef.detectChanges();
    this.input.nativeElement.focus();
    this.input.nativeElement.select();
  }

  save(changeMode = true): void {
    if (this.formGroup.invalid) return;
    this.update.emit({ itemID: this.todo.id, item: this.formGroup.value });
    this.width$.next(this.$todo.nativeElement.getBoundingClientRect().width);
    changeMode && this.changeMode();
  }
}
