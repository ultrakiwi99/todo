import {useEffect, useState} from "react";
import {getFromList, ID, Todo, TodoList} from "../domain/todo";

export function useTodo(todos: TodoList, todoID: ID | undefined) {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (todoID) {
      try {
        setError(undefined);
        setLoading(true);
        setTodo(getFromList(todos, todoID));
        setLoading(false);
      } catch (err) {
        const loadError = err as Error;
        setError(loadError);
        setLoading(false)
        setTodo(null);
      }
    }
  }, [todoID, todos])

  return {
    todo,
    todoError: error,
    todoLoading: loading
  }
}
