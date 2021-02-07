import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo, TodoResource } from './../models/todo.model';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}
  private readonly ENDPOINT = `${environment.apiURL}/todo`;

  postEntity(todo: TodoResource): Observable<Todo> {
    return this.http.post<Todo>(this.ENDPOINT, todo);
  }

  putEntity(todoID: number, todo: TodoResource): Observable<Todo> {
    return this.http.put<Todo>(`${this.ENDPOINT}/${todoID}`, todo);
  }

  getEntity(todoID: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.ENDPOINT}/${todoID}`);
  }

  getFilteredEntities(isDone: string, name: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(
      `${this.ENDPOINT}/?q=${name}${!!isDone ? '&isDone=' : ''}${
        !!isDone ? isDone : ''
      }`
    );
  }

  getAllEntities(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.ENDPOINT);
  }

  deleteEntity(todoID: number): Observable<Todo> {
    return this.http.delete<Todo>(`${this.ENDPOINT}/${todoID}`);
  }
}
