import { Component, Inject, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { delay } from 'rxjs/operators';
import { Todo } from 'src/app/models/todo.model';
import { UpdateEvent } from 'src/app/models/update-event';
import { ITodoService, SERVICE_TOKEN } from 'src/app/service-token';
import { TodoResource } from './../../models/todo.model';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[];

  constructor(
    @Inject(SERVICE_TOKEN)
    private todoService: ITodoService,
    private toastService: HotToastService
  ) {}

  ngOnInit(): void {
    this.todoService
      .getAllEntities()
      .pipe(
        delay(1300),
        this.toastService.observe({
          loading: 'carregando',
          success: 'carregado com sucesso',
          error: 'algo deu errado',
        })
      )
      .subscribe((todos: Todo[]) => (this.todos = todos));
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
