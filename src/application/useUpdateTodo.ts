import {useMutation} from "@apollo/client";
import {UPDATE_TODO} from "./queries";

export function useUpdateTodo() {
  const [updateTodo, {loading, error}] = useMutation(UPDATE_TODO);

  return { updateTodo, updateLoading: loading, updateError: error};
}
