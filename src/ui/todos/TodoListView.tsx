import {AddTodo} from "./add-todo/AddTodo";
import {Link} from "react-router-dom";
import {TodoList} from "../../domain/todo";
import {ApolloError} from "@apollo/client";

type TodoListViewProps = {
  todos: TodoList;
  addTodo: (title:string) => void;
  error: ApolloError | undefined;
  loading: boolean;
}

export function TodoListView({todos, addTodo, loading, error}: TodoListViewProps) {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <section>
      <h1>List of Todos</h1>
      <ul>
        {todos.map(todo => <li key={todo.id}>
          <span style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
          <Link to={todo.id}>
            {todo.title}
          </Link>
          </span>
        </li>)}
      </ul>
      <AddTodo addTodoHandler={addTodo}/>
    </section>
  )
}
