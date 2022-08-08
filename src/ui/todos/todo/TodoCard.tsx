import {Link, useParams} from "react-router-dom";
import {ID, Todo} from "../../../domain/todo";

export function TodoCard({loadTodo}: {loadTodo: (todoId: ID) => Todo}) {
  const {todoID} = useParams();
  const todo = loadTodo(todoID as ID);

  return (
    <section>
      To do id : {todoID}
      Title is: {todo.title}
      Completed id: {todo.completed ? 'YES' : 'NO'}
      <Link to={"/"}>Back</Link>
    </section>
  )
}
