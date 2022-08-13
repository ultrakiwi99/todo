import {FormEvent, useContext, useState} from "react";
import {TodosContext} from "../../context/TodosContext";

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
    <section>
      <input
        disabled={addTodoLoading}
        value={title}
        type={"text"}
        name={"title"}
        placeholder={'Enter task title...'}
        onKeyDown={(event) => keyDownHandler(event.key)}
        required={true}
        onInput={handleInput}/>
      {!!validationError && <p>{validationError}</p>}
      <button onClick={addHandler} disabled={!!validationError || addTodoLoading}>Add</button>
      {addTodoError && <p>Error adding todo: {addTodoError.message}!</p>}
    </section>
  );
}
