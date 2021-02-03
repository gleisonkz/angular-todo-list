export interface Todo extends TodoResource {
  todoID: number;
}

export interface TodoResource {
  title: string;
  isDone: boolean;
}
