import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoResource } from './../../models/todo.model';
import { TodoService } from './../../services/todo.service';

@Component({
  selector: 'custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
})
export class CustomHeaderComponent implements OnInit {
  constructor(private todoService: TodoService) {}
  @Output() newEvent = new EventEmitter<void>();
  formGroup: FormGroup;

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      todoName: new FormControl('', [Validators.required]),
    });
  }

  newTodo() {
    if (this.formGroup.invalid) return;
    const { todoName } = this.formGroup.controls;
    const todo: TodoResource = {
      title: todoName.value,
      isDone: false,
    };

    this.todoService.postEntity(todo).subscribe((todo) => {
      this.newEvent.emit();
      this.formGroup.reset();
    });
  }
}
