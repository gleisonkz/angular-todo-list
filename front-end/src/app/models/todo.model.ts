export interface Todo extends TodoResource {
  id: number;
}
export interface TodoResource {
  title: string;
  isDone: boolean;
}
