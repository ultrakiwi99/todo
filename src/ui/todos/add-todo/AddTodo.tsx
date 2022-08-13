import {FormEvent, useState} from "react";

type AddTodoProps = {
  addTodoHandler: (title: string) => void;
  error: Error | undefined;
  loading: boolean;
};

export function AddTodo({addTodoHandler, error, loading}: AddTodoProps) {
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
      addTodoHandler(title);
      setTitle('');
    }
  }

  return (
    <section>
      <input
        disabled={loading}
        value={title}
        type={"text"}
        name={"title"}
        placeholder={'Enter task title...'}
        onKeyDown={(event) => keyDownHandler(event.key)}
        required={true}
        onInput={handleInput}/>
      {!!validationError && <p>{validationError}</p>}
      <button onClick={addHandler} disabled={!!validationError || loading}>Add</button>
      {error && <p>Error adding todo: {error.message}!</p>}
    </section>
  );
}
