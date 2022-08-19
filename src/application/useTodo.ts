import {useState} from "react";
import {getFromList, ID, Todo, TodoList} from "../domain/todo";
import {ApolloError} from "@apollo/client";

export function useTodo(todos: TodoList) {
  const [todoError, setTodoError] = useState<ApolloError | undefined>(undefined);

  function getTodo(id?: ID): Todo | undefined {
    setTodoError(undefined);
    if (!id) {
      setTodoError(new ApolloError({
        errorMessage: 'No todo to search'
      }))
      return;
    }
    const todo = getFromList(todos, id);
    if (!todo) {
      setTodoError(new ApolloError({
        errorMessage: 'Todo not found'
      }))
      return;
    }
    return todo;
  }

  return {todoError, getTodo};
}
