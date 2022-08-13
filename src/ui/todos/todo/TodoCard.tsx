import {Link, useNavigate, useParams} from "react-router-dom";
import {Todo} from "../../../domain/todo";
import {useTodo} from "../../../application/useTodo";

type TodoCardProps = {
  toggleDone: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
}

export function TodoCard({toggleDone, removeTodo}: TodoCardProps) {
  const {todoID} = useParams();

  const {todo, loading, error} = useTodo(todoID);
  const navigate = useNavigate();

  const handleRemoveTodo = (todo: Todo): void => {
    removeTodo(todo);
    navigate('/');
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <section>
      To do id : {todo.id}
      Title is: {todo.title}
      Completed id: {todo.completed ? 'YES' : 'NO'}
      <button onClick={() => toggleDone(todo)}>Mark Done</button>
      <button onClick={() => handleRemoveTodo(todo)}>Remove</button>
      <Link to={"/"}>Back</Link>
    </section>
  )
}
