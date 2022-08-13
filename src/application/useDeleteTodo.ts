import {useMutation} from "@apollo/client";
import {DELETE_TODO} from "./queries";

export function useDeleteTodo() {
  const [deleteTodo, {loading, error}] = useMutation(DELETE_TODO);

  return {deleteTodo, deleteTodoError: error, deleteTodoLoading: loading};
}
