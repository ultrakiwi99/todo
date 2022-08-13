import {Link, useNavigate, useParams} from "react-router-dom";
import {Todo} from "../../../domain/todo";
import {useTodo} from "../../../application/useTodo";
import {useContext} from "react";
import {TodosContext} from "../../context/TodosContext";

export function TodoCard() {
  const {todoID} = useParams();
  const {updateLoading, toggleDoneAction, deleteTodoLoading, deleteTodoAction, todos} = useContext(TodosContext);
  const {todo, todoError, todoLoading} = useTodo(todos, todoID);
  const navigate = useNavigate();

  const handleRemoveTodo = (todo: Todo): void => {
    deleteTodoAction(todo.id);
    navigate('/');
  }

  if (updateLoading) {
    return <p>Updating...</p>
  }

  if (deleteTodoLoading) {
    return <p>Deleting...</p>
  }

  if (todoLoading || !todo) {
    return <p>Waiting for todo...</p>
  }

  if (todoError) {
    return <p>Error loading todo: {todoError.message}</p>
  }

  return (
    <section>
      {todo
        ? (
          <section>
            To do id : {todo.id}
            Title is: {todo.title}
            Completed id: {todo.completed ? 'YES' : 'NO'}
          </section>
        )
        : <p>Waiting for todo id...</p>}
      <button onClick={() => toggleDoneAction(todo)}>Mark Done</button>
      <button onClick={() => handleRemoveTodo(todo)}>Remove</button>
      <Link to={"/"}>Back</Link>
    </section>
  )
}
