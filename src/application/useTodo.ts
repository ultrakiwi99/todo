import {useQuery} from "@apollo/client";
import {GET_TODO} from "./queries";
import {ID} from "../domain/todo";

export function useTodo(id?: ID) {
  const { loading, error, data } = useQuery(GET_TODO, { variables: { id }});

  return {
    loading,
    error,
    todo: data?.todo
  }
}
