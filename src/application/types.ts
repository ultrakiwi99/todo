import {Todo} from "../domain/todo";
import {ApolloError} from "@apollo/client";

export type MutateTodoData = {
  title: string;
  completed: boolean;
}

export type CreateTodoResponse = {
  data?: {
    createTodo: Todo
  }
}

export type UpdateTodoResponse = {
  data?: {
    updateTodo: Todo
  }
}

export type TodosManagementHandlers = {
  todos: Todo[];
  loadingTodos: boolean,
  errorLoadingTodos: ApolloError | undefined;
  addTodoAction: (title: string) => void,
  addTodoLoading: boolean,
  addTodoError: ApolloError | undefined,
  removeTodoCase: (todo: Todo) => void,
  toggleDoneAction: (todo: Todo) => void,
  updateLoading: boolean,
  updateError: ApolloError | undefined,
}
