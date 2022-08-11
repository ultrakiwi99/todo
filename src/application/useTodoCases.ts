import {useEffect, useState} from "react";
import {addToList, ID, removeFromList, setCompletedStatus, Todo, TodoList} from "../domain/todo";
import {useQuery} from "@apollo/client";
import {GET_TODOS} from "./queries";

export function useTodoCases() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [todos, setTodos] = useState<TodoList>([]);

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

  function loadTodo(todoID: ID): Todo {
    const todo = todos.find(todo => todo.id === todoID);
    if (!todo) {
      throw Error(`Todo id: ${todoID} not found!`);
    }

    return todo;
  }

  useEffect(() => {
    if (data && data.todos && data.todos.data && Array.isArray(data.todos.data)) {
      setTodos(data.todos.data);
    }
  }, [data]);

  return {
    todos,
    addTodoCase,
    removeTodoCase,
    toggleDoneCase,
    loadTodo,
    loading,
    error
  }
}
