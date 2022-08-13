export type ID = string;

export interface Todo {
  id: ID
  title: string;
  completed: boolean;
}

export type TodoList = Todo[];

export function addToList(todoList: TodoList, newTodo: Todo): TodoList {
  return [...todoList, newTodo];
}

export function removeFromList(todoList: TodoList, id: ID): TodoList {
  return [...todoList.filter(todo => todo.id !== id)];
}

export function setCompletedStatus(todoList: TodoList, id: ID, completed: boolean): TodoList {
  return [...todoList.map(todo => todo.id === id ? {...todo, completed} : todo)];
}

export function getFromList(todoList: TodoList, id: ID): Todo {
  const todo = todoList.find(todo => todo.id === id);
  if (!todo) {
    throw new Error(`Todo #${id} is not found`);
  }
  return todo;
}

