import {AddTodo} from "./add-todo/AddTodo";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {TodosContext} from "../context/TodosContext";
export function TodoListView() {
  const {todos, loadingTodos, errorLoadingTodos} = useContext(TodosContext);

  if (loadingTodos) {
    return <p>Loading...</p>;
  }

  if (errorLoadingTodos) {
    return <p>{errorLoadingTodos.message}</p>
  }

  return (
    <section>
      <h1>List of Todos</h1>
      <ul>
        {todos.map(todo => <li key={`${todo.id}-${todo.title}`}>
          <span style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
          <Link to={todo.id}>
            {todo.title}
          </Link>
          </span>
        </li>)}
      </ul>
      <AddTodo />
    </section>
  )
}
