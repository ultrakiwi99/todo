import {useState} from "react";
import {addToList, ID, removeFromList, setCompletedStatus, Todo, TodoList} from "../domain/todo";

export function useTodoCases() {
  const [todos, setTodos] = useState<TodoList>([]);
  const [error, setError] = useState<Error | null>(null);

  function addTodoCase(title: string): void {
    setTodos(todos => {
      try {
        return addToList(todos, {
          id: Math.floor(Math.random() * 10000).toString(),
          title,
          completed: false
        });
      } catch (error) {
        const addError = error as Error;
        setError(addError);
        return todos;
      }
    });
  }

  function removeTodoCase(todo: Todo): void {
    setTodos(todos => {
      try {
        return removeFromList(todos, todo.id);
      } catch (error) {
        const removeError = error as Error;
        setError(removeError);
        return todos;
      }
    })
  }

  function toggleDoneCase(todo: Todo): void {
    setTodos(todos => {
      try {
        return setCompletedStatus(todos, todo.id, !todo.completed);
      } catch (error) {
        const completedError  = error as Error;
        setError(completedError);
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

  return {
    todos,
    addTodoCase,
    removeTodoCase,
    toggleDoneCase,
    loadTodo,
    error
  }
}
