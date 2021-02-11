import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITodoService } from 'src/app/service-token';
import { Todo, TodoResource } from '../models/todo.model';
import { TODOS_MOCK } from './../mock/todos.mock';

@Injectable({
  providedIn: 'root',
})
export class TodoStorageService implements ITodoService {
  private readonly STORAGE_KEY = 'TODOS';

  constructor() {
    this.todos = localStorage.getItem(this.STORAGE_KEY)
      ? this.todos
      : TODOS_MOCK;
  }

  get todos(): Todo[] {
    const data = localStorage.getItem(this.STORAGE_KEY) || '[]';
    return JSON.parse(data);
  }

  set todos(todos: Todo[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
  }

  postEntity(todo: TodoResource): Observable<Todo> {
    const todos = this.todos;
    const nextID = todos.sort((a, b) => b.id - a.id)[0].id + 1;
    const newTodo = { ...todo, id: nextID };
    this.todos = [...todos, newTodo];
    return of(newTodo);
  }

  putEntity(todoID: number, todo: TodoResource): Observable<Todo> {
    const todos = this.todos;
    const indexOfUpdated = todos.findIndex((todo) => todo.id === todoID);
    const newTodo: Todo = { ...todo, id: todoID };
    todos[indexOfUpdated] = newTodo;
    this.todos = [...todos];
    return of(newTodo);
  }

  getEntity(todoID: number): Observable<Todo> {
    const foundTodo = this.todos.find((c) => c.id === todoID);
    if (foundTodo == undefined) throw new Error('todo not founded');
    return of(foundTodo);
  }

  getFilteredEntities(isDone: string, name: string): Observable<Todo[]> {
    let todos = this.todos;

    todos = !!isDone
      ? todos
          .map((todo) => ({ ...todo, isDone: todo.isDone.toString() }))
          .filter((c) => c.isDone === isDone)
          .map((todo) => ({ ...todo, isDone: todo.isDone == 'true' }))
      : todos;

    todos = !!name
      ? todos.filter((c) => c.title.toLowerCase().includes(name.toLowerCase()))
      : todos;

    return of(todos);
  }

  getAllEntities(): Observable<Todo[]> {
    return of(this.todos);
  }

  deleteEntity(todoID: number): Observable<Todo> {
    const todos = this.todos;
    const foundTodo = todos.find((todo) => todo.id === todoID);
    if (foundTodo == undefined)
      throw new Error(`Não existe uma tarefa com o ID: ${todoID} `);

    this.todos = todos.filter((todo) => todo !== foundTodo);
    return of(foundTodo);
  }
}
