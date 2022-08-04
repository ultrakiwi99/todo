import {useState} from "react";
import {addToList, removeFromList, Todo, TodoList} from "../domain/todo";
import {TodoRepository} from "./todoRepository";

export function useTodoCases(todoRepository: TodoRepository) {
  const [todos, setTodos] = useState<TodoList>(todoRepository.getTodos());
  const [error, setError] = useState<Error | null>(null);

  function addTodoCase(todo: Todo): void {
    setTodos(todos => {
      try {
        const updated = addToList(todos, todo);
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

  return {
    todos,
    addTodoCase,
    removeTodoCase,
    error
  }
}
