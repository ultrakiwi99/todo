import {useTodoCases} from "../../application/useTodoCases";
import {MemoryTodoRepository} from "../../application/todoRepository";

export function TodoList() {
  const {todos} = useTodoCases(new MemoryTodoRepository());

  return (
    <section>
      <h1>List of Todos</h1>
      <ul>
        {todos.map(todo => <li>{todo.title}: {todo.completed}</li>)}
      </ul>
      <button>Add todo</button>
    </section>
  )
}
