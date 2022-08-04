import {Todo, TodoList} from "../domain/todo";

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

  static randomTodo(): Todo {
    const id = Math.floor(Math.random() * 20000).toString();
    return {
      id,
      completed: false,
      title: `Random uid - ${id}`
    };
  }
}
