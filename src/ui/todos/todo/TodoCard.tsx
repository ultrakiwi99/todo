import {Link, useNavigate, useParams} from "react-router-dom";
import {Todo} from "../../../domain/todo";
import {useTodo} from "../../../application/useTodo";
import {TodoView} from "./TodoView";
import {useContext} from "react";
import {TodosContext} from "../../context/TodosContext";

export function TodoCard() {
  const {removeTodoCase, updateLoading, toggleDoneAction} = useContext(TodosContext);
  const {todoID} = useParams();
  const {todo, loading, error} = useTodo(todoID);
  const navigate = useNavigate();

  const handleRemoveTodo = (todo: Todo): void => {
    removeTodoCase(todo);
    navigate('/');
  }

  if (updateLoading) {
    return <p>Updating...</p>
  }

  return (
    <section>
      {todo
        ? <TodoView todo={todo} loading={loading} error={error} />
        : <p>Waiting for todo id...</p>}
      <button onClick={() => toggleDoneAction(todo)}>Mark Done</button>
      <button onClick={() => handleRemoveTodo(todo)}>Remove</button>
      <Link to={"/"}>Back</Link>
    </section>
  )
}
