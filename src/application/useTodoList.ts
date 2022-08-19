import {useEffect, useState} from "react";
import {addToList, ID, removeFromList, setCompletedStatus, Todo, TodoList} from "../domain/todo";
import {useQuery} from "@apollo/client";
import {GET_TODOS} from "./queries";
import {useAddTodo} from "./useAddTodo";
import {CreateTodoResponse, DeleteTodoResponse, MutateTodoData, SearchOperator, TodosManagementHandlers} from "./types";
import {useUpdateTodo} from "./useUpdateTodo";
import {useDeleteTodo} from "./useDeleteTodo";
import {useTodo} from "./useTodo";

export function useTodoList(): TodosManagementHandlers {
  const [slice] = useState({start: 0, end: 200});
  const [operators, setSearchOperators] = useState<SearchOperator[]>([]);

  const {loading, error, data} = useQuery(GET_TODOS, {variables: {options: { operators, slice }}});

  const [todos, setTodos] = useState<TodoList>([]);
  const {getTodo, todoError} = useTodo(todos);
  const {addTodo, addTodoLoading, addTodoError} = useAddTodo();
  const {updateTodo, updateLoading, updateError} = useUpdateTodo();
  const {deleteTodo, deleteTodoLoading, deleteTodoError} = useDeleteTodo();

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

  function setSearchConditions(data: SearchOperator[]): void {
    setSearchOperators(data);
  }

  useEffect(() => setTodos(data?.todos?.data || []), [data]);

  useEffect(() => {
    console.log(operators);
  }, [operators]);

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
    setSearchConditions,
    getTodo,
    todoError
  }
}
