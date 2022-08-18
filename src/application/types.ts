import {ID, Todo} from "../domain/todo";
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

export type DeleteTodoResponse = {
  data?: {
    deleteTodo: boolean
  }
}

export type TodosManagementHandlers = {
  todos: Todo[];
  loadingTodos: boolean,
  errorLoadingTodos: ApolloError | undefined;
  addTodoAction: (title: string) => void;
  addTodoLoading: boolean;
  addTodoError: ApolloError | undefined;
  toggleDoneAction: (todo: Todo) => void;
  updateLoading: boolean;
  updateError: ApolloError | undefined;
  deleteTodoAction: (todoID: ID) => void;
  deleteTodoLoading: boolean;
  deleteTodoError: ApolloError | undefined;
  setSearchConditions: (conditions:SearchOperator[]) => void;
}

export enum CompletedState {
  Undefined,
  Completed ,
  NotCompleted
}

export type SearchOperator = {
  kind: 'LIKE';
  field: string;
  value: string | boolean;
}
