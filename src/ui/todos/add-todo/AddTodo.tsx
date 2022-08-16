import {FormEvent, useContext, useState} from "react";
import {TodosContext} from "../../context/TodosContext";
import './AddTodo.css';

export function AddTodo() {
  const {addTodoAction, addTodoError, addTodoLoading} = useContext(TodosContext);
  const [title, setTitle] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  function handleInput(event:FormEvent<HTMLInputElement>) {
    const title = (event.target as HTMLInputElement).value;
    setTitle(title);
    if (!title || title.length < 5 || title.length > 25) {
      setValidationError('Min 5 letters or max 25 letters length.');
    } else {
      setValidationError('');
    }
  }

  function keyDownHandler(key: string) {
    if (key === 'Enter') {
      addHandler();
    }
  }

  function addHandler() {
    if (title && !validationError) {
      addTodoAction(title);
      setTitle('');
    }
  }

  return (
    <section id={'add-todo-container'}>
      <section id={'add-todo'}>
        <input
          disabled={addTodoLoading}
          value={title}
          type={"text"}
          name={"title"}
          placeholder={'Enter task title...'}
          onKeyDown={(event) => keyDownHandler(event.key)}
          required={true}
          onInput={handleInput}/>
        <button onClick={addHandler} disabled={!!validationError || addTodoLoading}>Add</button>
      </section>
      {!!validationError && <p className={'alert'}>{validationError}</p>}
      {addTodoError && <p className={'alert'}>Error adding todo: {addTodoError.message}!</p>}
    </section>
  );
}
