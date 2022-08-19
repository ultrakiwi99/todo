import React, {ReactNode} from "react";
import {render} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {TodosContext} from "../../ui/context/TodosContext";
import {TodoCard} from "../../ui/todos/todo/TodoCard";

export type CustomRenderProps = {
  providerProps: any;
}

export function customRender(ui: ReactNode, {providerProps}: CustomRenderProps) {
  return render(
      <TodosContext.Provider value={providerProps}>
        {ui}
      </TodosContext.Provider>
  );
}

export function customTodoRender({providerProps}: CustomRenderProps) {
  return render(
      <TodosContext.Provider value={providerProps}>
        <MemoryRouter initialEntries={['/1']}>
          <Routes>
            <Route path=":todoID" element={<TodoCard />}/>
          </Routes>
        </MemoryRouter>
      </TodosContext.Provider>
  );
}
