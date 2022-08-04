import {useTodoCases} from "../../application/useTodoCases";
import {MemoryTodoRepository} from "../../application/todoRepository";

export function TodoList() {
  const {
    todos,
    addTodoCase,
    removeTodoCase,
    toggleDoneCase
  } = useTodoCases(new MemoryTodoRepository());

  return (
    <section>
      <h1>List of Todos</h1>
      <ul>
        {todos.map(todo => <li>
          <span style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
            {todo.title}
          </span>
          <button onClick={() => toggleDoneCase(todo)}>V</button>
          <button onClick={() => removeTodoCase(todo)}>X</button>
        </li>)}
      </ul>
      <button onClick={() => addTodoCase(MemoryTodoRepository.randomTodo())}>Add todo</button>
    </section>
  )
}
