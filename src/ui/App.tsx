import React from 'react';
import './App.css';
import {TodoListView} from "./todos/TodoListView";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TodoCard} from "./todos/todo/TodoCard";
import {useTodoCases} from "../application/useTodoCases";

function App() {
  const {
    todos,
    addTodoCase,
    loadTodo
  } = useTodoCases();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoListView todos={todos} addTodo={addTodoCase}/>} />
        <Route path=":todoID" element={<TodoCard loadTodo={loadTodo}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
