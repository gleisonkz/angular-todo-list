import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { delay } from 'rxjs/operators';
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

  constructor(
    private todoService: TodoService,
    private toastService: HotToastService
  ) {}

  ngOnInit(): void {
    this.getAllTodos();
  }

  getFilteredTodos(isDone: string, name: string): void {
    this.todoService
      .getFilteredEntities(isDone, name)
      .subscribe((todos: Todo[]) => {
        this.todos = todos;
      });
  }

  getAllTodos() {
    this.todoService
      .getAllEntities()
      .subscribe((todos: Todo[]) => (this.todos = todos));
  }

  updateTodo(event: UpdateEvent<TodoResource>): void {
    this.todoService.putEntity(event.itemID, event.item).subscribe();
  }

  deleteTodo(todoID: number) {
    this.todoService
      .deleteEntity(todoID)
      .pipe(
        delay(1500),
        this.toastService.observe({
          loading: 'Deletando',
          success: 'Tarefa deletada com sucesso',
          error: 'Algo deu errado',
        })
      )
      .subscribe(() => {
        this.getAllTodos();
      });
  }
}
