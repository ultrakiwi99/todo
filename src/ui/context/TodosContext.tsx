import {createContext, ReactNode} from "react";
import {useTodoList} from "../../application/useTodoList";
import {TodosManagementHandlers} from "../../application/types";

export const TodosContext = createContext<TodosManagementHandlers>({
  todos: [],
  loadingTodos: false,
  errorLoadingTodos: undefined,
  addTodoAction: () => {},
  addTodoLoading: false,
  addTodoError: undefined,
  removeTodoCase: () => {},
  toggleDoneAction: () => {},
  updateLoading: false,
  updateError: undefined,
});

export function TodosContextProvider({children}: {children: ReactNode}) {
  const todoListActions = useTodoList();
  return (
    <TodosContext.Provider value={todoListActions}>
      {children}
    </TodosContext.Provider>
  )
}
