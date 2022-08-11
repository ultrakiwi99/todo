import {Link, useNavigate, useParams} from "react-router-dom";
import {ID, Todo} from "../../../domain/todo";

type TodoCardProps = {
  loadTodo: (todoId: ID) => Todo;
  toggleDone: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
}

export function TodoCard({loadTodo, toggleDone, removeTodo}: TodoCardProps) {
  const {todoID} = useParams();
  const todo = loadTodo(todoID as ID);
  const navigate = useNavigate();

  const handleRemoveTodo = (todo: Todo): void => {
    removeTodo(todo);
    navigate('/');
  }

  return (
    <section>
      To do id : {todoID}
      Title is: {todo.title}
      Completed id: {todo.completed ? 'YES' : 'NO'}
      <button onClick={() => toggleDone(todo)}>Mark Done</button>
      <button onClick={() => handleRemoveTodo(todo)}>Remove</button>
      <Link to={"/"}>Back</Link>
    </section>
  )
}
