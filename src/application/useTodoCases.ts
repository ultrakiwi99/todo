import {useState} from "react";
import {addToList, removeFromList, setCompletedStatus, Todo, TodoList} from "../domain/todo";
import {TodoRepository} from "./todoRepository";

export function useTodoCases(todoRepository: TodoRepository) {
  const [todos, setTodos] = useState<TodoList>(todoRepository.getTodos());
  const [error, setError] = useState<Error | null>(null);

  function addTodoCase(title: string): void {
    setTodos(todos => {
      try {
        const updated = addToList(todos, {
          id: Math.floor(Math.random() * 10000).toString(),
          title,
          completed: false
        });
        todoRepository.saveTodos(updated);
        return updated;
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
        const updated = removeFromList(todos, todo.id);
        todoRepository.saveTodos(updated);
        return updated;
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
        const updated = setCompletedStatus(todos, todo.id, !todo.completed);
        todoRepository.saveTodos(updated);
        return updated;
      } catch (error) {
        const completedError  = error as Error;
        setError(completedError);
        return todos;
      }
    });
  }

  return {
    todos,
    addTodoCase,
    removeTodoCase,
    toggleDoneCase,
    error
  }
}
