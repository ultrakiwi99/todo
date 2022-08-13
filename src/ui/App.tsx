import React from 'react';
import './App.css';
import {TodoListView} from "./todos/TodoListView";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TodoCard} from "./todos/todo/TodoCard";
import {TodosContextProvider} from "./context/TodosContext";

function App() {
  return (
    <TodosContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <TodoListView />
          }/>
          <Route path=":todoID" element={
            <TodoCard />
          }/>
        </Routes>
      </BrowserRouter>
    </TodosContextProvider>
  );
}

export default App;
