import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoFilterEvent } from './../../models/todo-filter-event';
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
  @Output() filterEvent = new EventEmitter<TodoFilterEvent>();
  formGroup: FormGroup;
  todoStatusFilter = new FormControl('');
  todoNameFilter = new FormControl('');

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      todoName: new FormControl('', [Validators.required]),
    });
  }

  filter(selectedValue: string) {
    this.filterEvent.emit({
      todoName: this.todoNameFilter.value,
      todoStatus: selectedValue,
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
