import {useNavigate, useParams} from "react-router-dom";
import {Todo} from "../../../domain/todo";
import React, {useContext} from "react";
import {TodosContext} from "../../context/TodosContext";
import './TodoCard.css';

export function TodoCard() {
  const navigate = useNavigate();
  const {todoID} = useParams();
  const {
    updateLoading,
    toggleDoneAction,
    deleteTodoLoading,
    deleteTodoAction,
    getTodo,
    todoError
  } = useContext(TodosContext);

  const todo = getTodo(todoID);

  const handleRemoveTodo = (todo: Todo): void => {
    deleteTodoAction(todo.id);
    navigate('/');
  }

  if (updateLoading) {
    return <TodoStub text={'Updating...'} />;
  }

  if (deleteTodoLoading) {
    return <TodoStub text={'Loading todo...'} />;
  }

  if (!todo) {
    return <TodoStub text={'Waiting for todo...'} />;
  }

  if (todoError) {
    return <TodoStub text={`Error loading todo: ${todoError.message}`} />;
  }

  return (
    <section id={'todo-card'} data-testid={'todo'}>
      {todo
        ? (
          <section id={'todo-content'}>
            <p id={'todo-id'}>#{todo.id}</p>
            <h2>{todo.title}</h2>
            <section id={'completed-status'}>
              Completed: {todo.completed ? 'YES' : 'NO'}
            </section>
          </section>
        )
        : <section id={'todo-waiting'}>Waiting for todo id...</section>}
      <section id={'todo-controls'}>
        <button onClick={() => toggleDoneAction(todo)}>Mark Done</button>
        <button onClick={() => handleRemoveTodo(todo)}>Remove</button>
        <button onClick={() => navigate('/')}>Go back</button>
      </section>
    </section>
  );
}

function TodoStub({text}: {text: string}) {
  return <section id={'todo-stub'}>{text}</section>
}
