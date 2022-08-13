import React from 'react';
import './App.css';
import {TodoListView} from "./todos/TodoListView";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TodoCard} from "./todos/todo/TodoCard";
import {useTodoList} from "../application/useTodoList";

function App() {
  const {
    todos,
    addTodoAction,
    addTodoError,
    addTodoLoading,
    toggleDoneCase,
    removeTodoCase,
    error,
    loading
  } = useTodoList();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <TodoListView
            addTodo={addTodoAction}
            addTodoError={addTodoError}
            addTodoLoading={addTodoLoading}
            todos={todos}
            error={error}
            loading={loading}/>
        }/>
        <Route path=":todoID" element={
          <TodoCard toggleDone={toggleDoneCase} removeTodo={removeTodoCase}/>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
