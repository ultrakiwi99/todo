import {TodoList} from "../domain/todo";

export interface TodoRepository {
  getTodos(): TodoList;

  saveTodos(todos: TodoList): void;
}

export class MemoryTodoRepository implements TodoRepository{
  private todoList: TodoList = [];

  getTodos(): TodoList {
    return this.todoList;
  }

  saveTodos(todos: TodoList) {
    this.todoList = [...todos]
  }
}
