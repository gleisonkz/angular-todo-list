export interface Action<T> {
  match: boolean;
  execute: () => T;
}
