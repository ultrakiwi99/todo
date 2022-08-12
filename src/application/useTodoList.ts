import {useState} from "react";
import {addToList, removeFromList, setCompletedStatus, Todo, TodoList} from "../domain/todo";
import {useQuery} from "@apollo/client";
import {GET_TODOS} from "./queries";

export function useTodoList() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [, setTodos] = useState<TodoList>([]);



  function addTodoCase(title: string): void {
    setTodos(todos => {
      try {
        return addToList(todos, {
          id: Math.floor(Math.random() * 10000).toString(),
          title,
          completed: false
        });
      } catch (error) {
        return todos;
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

  return {
    todos: data?.todos?.data || [],
    addTodoCase,
    removeTodoCase,
    toggleDoneCase,
    loading,
    error
  }
}
