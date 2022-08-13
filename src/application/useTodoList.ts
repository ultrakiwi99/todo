import {useEffect, useState} from "react";
import {addToList, removeFromList, setCompletedStatus, Todo, TodoList} from "../domain/todo";
import {useQuery} from "@apollo/client";
import {GET_TODOS} from "./queries";
import {useAddTodo} from "./useAddTodo";
import {MutateTodoData, CreateTodoResponse, UpdateTodoResponse, TodosManagementHandlers} from "./types";
import {useUpdateTodo} from "./useUpdateTodo";

export function useTodoList(): TodosManagementHandlers {
  const {loading, error, data} = useQuery(GET_TODOS);
  const {addTodo, addTodoLoading, addTodoError} = useAddTodo();
  const {updateTodo, updateLoading, updateError} = useUpdateTodo();

  const [todos, setTodos] = useState<TodoList>([]);

  function addTodoAction(title: string): void {
    const createData: MutateTodoData = {title, completed: false};
    addTodo({variables: {input: createData}})
      .then((result: CreateTodoResponse) => {
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

  function toggleDoneAction(todo: Todo): void {
    const updateData: MutateTodoData = {title: todo.title, completed: !todo.completed};
    updateTodo({variables: {id: todo.id, input: updateData}})
      .then((result: UpdateTodoResponse) => {
        const updatedTodo = result.data?.updateTodo;
        if (updatedTodo) {
          setTodos(todos => setCompletedStatus(todos, updatedTodo.id, updatedTodo.completed));
        }
      });
  }

  useEffect(() => setTodos(data?.todos?.data || []), [data]);

  return {
    todos,
    loadingTodos: loading,
    errorLoadingTodos: error,
    addTodoAction,
    addTodoLoading,
    addTodoError,
    removeTodoCase,
    toggleDoneAction,
    updateLoading,
    updateError
  }
}
