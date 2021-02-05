import { Component, ViewChild } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFilterEvent } from './models/todo-filter-event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(TodoListComponent)
  todoListComponent: TodoListComponent;

  reloadTodos(): void {
    this.todoListComponent.getAllTodos();
  }

  getFilteredTodos(filterEvent: TodoFilterEvent): void {
    this.todoListComponent.getFilteredTodos(
      filterEvent.todoStatus,
      filterEvent.todoName
    );
  }
}
