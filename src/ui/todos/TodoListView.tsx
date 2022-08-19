import {AddTodo} from "./add-todo/AddTodo";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {TodosContext} from "../context/TodosContext";
import "./TodoListView.css";
import {Search} from "./search/Search";

export function TodoListView() {
  return (
    <section>
      <h1>List of Todos</h1>
      <Search />
      <TodoListContainer />
      <AddTodo/>
    </section>
  );
}

function TodoListContainer() {
  const {todos, loadingTodos, errorLoadingTodos} = useContext(TodosContext);

  if (loadingTodos) {
    return <p>Loading...</p>;
  }

  if (errorLoadingTodos) {
    return <p>Error loading todos: {errorLoadingTodos.message}</p>
  }

  return (
      <section id={'scrolling-container'}>
        <section id={'todo-list'}>
          {todos.map(
            todo => <TodoPanel
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              key={`${todo.id}-${todo.title}`}/>
          )}
        </section>
      </section>
  );
}

function TodoPanel({id, title, completed}: { id: string, title: string, completed: boolean }) {
  const navigate = useNavigate();
  return (
    <article
      onClick={() => navigate(`/${id}`)}
      className={'todo-panel'}
      style={{textDecoration: completed ? 'line-through' : 'none'}}>
      <p>{title}</p>
    </article>
  );
}
