import {createContext, ReactNode} from "react";
import {useTodoList} from "../../application/useTodoList";
import {TodosManagementHandlers} from "../../application/types";
import {Todo} from "../../domain/todo";

export const TodosContext = createContext<TodosManagementHandlers>({
  todos: [],
  loadingTodos: false,
  errorLoadingTodos: undefined,
  addTodoAction: () => {},
  addTodoLoading: false,
  addTodoError: undefined,
  toggleDoneAction: () => {},
  updateLoading: false,
  updateError: undefined,
  deleteTodoAction: () => {},
  deleteTodoLoading: false,
  deleteTodoError: undefined,
  setSearchConditions: () => {},
  getTodo: () => {return {} as Todo},
  todoError: undefined
});

export function TodosContextProvider({children}: {children: ReactNode}) {
  const todoListActions = useTodoList();
  return (
    <TodosContext.Provider value={todoListActions}>
      {children}
    </TodosContext.Provider>
  )
}
