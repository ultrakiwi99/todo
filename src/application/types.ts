import {Todo} from "../domain/todo";

export type CreateTodoData = {
  title: string;
  completed: boolean;
}

export type CreateTodoResponse = {
  data?: {
    createTodo: Todo
  }
}
