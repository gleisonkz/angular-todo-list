import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { UpdateEvent } from 'src/app/models/update-event';
import { TodoResource } from './../../models/todo.model';
import { TodoService } from './../../services/todo.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService
      .getAllEntities()
      .subscribe((todos: Todo[]) => (this.todos = todos));
  }

  updateTodo(event: UpdateEvent<TodoResource>): void {
    console.log(event);

    this.todoService.putEntity(event.itemID, event.item).subscribe();
  }
}
