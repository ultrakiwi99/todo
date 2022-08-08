import {AddTodo} from "./add-todo/AddTodo";
import {Link} from "react-router-dom";
import {TodoList} from "../../domain/todo";

export function TodoListView({todos, addTodo}: {todos: TodoList, addTodo: (title:string) => void}) {
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
