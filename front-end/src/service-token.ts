import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo, TodoResource } from './app/models/todo.model';
import { TodoStorageService } from './app/services/todo-storage.service';
import { TodoService } from './app/services/todo.service';

export interface ITodoService {
  postEntity(todo: TodoResource): Observable<Todo>;
  putEntity(todoID: number, todo: TodoResource): Observable<Todo>;
  getEntity(todoID: number): Observable<Todo>;
  getFilteredEntities(isDone: string, name: string): Observable<Todo[]>;
  getAllEntities(): Observable<Todo[]>;
  deleteEntity(todoID: number): Observable<Todo>;
}

export function tokenServiceFactory(
  storage: TodoStorageService,
  service: TodoService
) {
  if (environment.production) {
    return storage;
  }
  return service;
}

export const SERVICE_TOKEN = new InjectionToken<ITodoService>('ITodoService');
