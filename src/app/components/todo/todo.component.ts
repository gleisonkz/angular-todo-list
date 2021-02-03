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
import { Mode } from 'src/app/models/mode.model';
import { Todo } from './../../models/todo.model';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Output() delete = new EventEmitter<void>();
  @Output() update = new EventEmitter<string>();
  @Input() todo: Todo;
  @ViewChild('myInput') input: ElementRef<HTMLInputElement>;

  currentMode: Mode = Mode.Show;
  todoControl: FormControl;
  formGroup: FormGroup;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.todoControl = new FormControl(this.todo.title, [Validators.required]);
    this.formGroup = new FormGroup({
      title: this.todoControl,
      isDone: new FormControl(false),
    });
  }

  changeMode(): void {
    console.log('emit');
    this.currentMode = this.currentMode === Mode.Edit ? Mode.Show : Mode.Edit;
    this.changeDetectorRef.detectChanges();
  }

  edit(): void {
    console.log('emit');
    this.currentMode = Mode.Edit;
    this.changeDetectorRef.detectChanges();
    this.input.nativeElement.focus();
    this.input.nativeElement.select();
  }

  save(): void {
    if (this.formGroup.invalid) return;
    this.update.emit();
    this.changeMode();
  }
}
