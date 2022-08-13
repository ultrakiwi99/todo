import {useEffect, useState} from "react";
import {addToList, removeFromList, setCompletedStatus, Todo, TodoList} from "../domain/todo";
import {useQuery} from "@apollo/client";
import {GET_TODOS} from "./queries";
import {useAddTodo} from "./useAddTodo";
import {CreateTodoData, CreateTodoResponse} from "./types";

export function useTodoList() {
  const {loading, error, data} = useQuery(GET_TODOS);
  const {addTodo, addTodoLoading, addTodoError} = useAddTodo();

  const [todos, setTodos] = useState<TodoList>([]);

  function addTodoAction(title: string): void {
    const createData: CreateTodoData = {title, completed: false};
    addTodo({
      variables: {
        input: createData
      }
    }).then((result: CreateTodoResponse) => {
      const newTodo = result.data?.createTodo;
      if (newTodo) {
        setTodos(todos => addToList(todos, newTodo))
      }
    });
  }

  function removeTodoCase(todo: Todo): void {
    setTodos(todos => {
      try {
        return removeFromList(todos, todo.id);
      } catch (error) {
        return todos;
      }
    })
  }

  function toggleDoneCase(todo: Todo): void {
    setTodos(todos => {
      try {
        return setCompletedStatus(todos, todo.id, !todo.completed);
      } catch (error) {
        return todos;
      }
    });
  }

  useEffect(() => setTodos(data?.todos?.data || []), [data]);

  return {
    // todos: data?.todos?.data || [],
    todos,
    addTodoAction,
    addTodoLoading,
    addTodoError,
    removeTodoCase,
    toggleDoneCase,
    loading,
    error
  }
}
