import {Todo} from "../../../domain/todo";

type TodoViewProps = {
  todo: Todo;
  loading: boolean;
  error: Error | undefined;
}

export function TodoView({todo, loading, error}: TodoViewProps) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading TODO: {error.message}</p>
  }
  return (
    <section>
      To do id : {todo.id}
      Title is: {todo.title}
      Completed id: {todo.completed ? 'YES' : 'NO'}
    </section>
  );
}
