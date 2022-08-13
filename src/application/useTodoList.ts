import {useEffect, useState} from "react";
import {addToList, ID, removeFromList, setCompletedStatus, Todo, TodoList} from "../domain/todo";
import {useQuery} from "@apollo/client";
import {GET_TODOS} from "./queries";
import {useAddTodo} from "./useAddTodo";
import {CreateTodoResponse, DeleteTodoResponse, MutateTodoData, TodosManagementHandlers} from "./types";
import {useUpdateTodo} from "./useUpdateTodo";
import {useDeleteTodo} from "./useDeleteTodo";

export function useTodoList(): TodosManagementHandlers {
  const {loading, error, data} = useQuery(GET_TODOS);
  const {addTodo, addTodoLoading, addTodoError} = useAddTodo();
  const {updateTodo, updateLoading, updateError} = useUpdateTodo();
  const {deleteTodo, deleteTodoLoading, deleteTodoError} = useDeleteTodo();

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

  function deleteTodoAction(toID: ID): void {
    deleteTodo({variables: { id: toID }})
      .then((result: DeleteTodoResponse) => {
        if (result.data?.deleteTodo) {
          setTodos(todos => removeFromList(todos, toID));
        }
      });
  }

  function toggleDoneAction(todo: Todo): void {
    const updateData: MutateTodoData = {title: todo.title, completed: !todo.completed};
    updateTodo({variables: {id: todo.id, input: updateData}})
      .then(() => {
          setTodos(todos => setCompletedStatus(todos, todo.id, updateData.completed));
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
    toggleDoneAction,
    updateLoading,
    updateError,
    deleteTodoAction,
    deleteTodoError,
    deleteTodoLoading,
  }
}
