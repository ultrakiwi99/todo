import {useMutation} from "@apollo/client";
import {ADD_TODO} from "./queries";

export function useAddTodo() {
  const [addTodo, {loading, error, data}] = useMutation(ADD_TODO);
  return { addTodo, addTodoLoading: loading, addTodoError: error, result: data?.createTodo }
}
