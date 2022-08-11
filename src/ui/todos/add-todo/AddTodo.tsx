import {FormEvent, useState} from "react";

export function AddTodo({addTodoHandler}: {addTodoHandler: (title: string) => void}) {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string>('');

  function handleInput(event:FormEvent<HTMLInputElement>) {
    const title = (event.target as HTMLInputElement).value;
    setTitle(title);
    if (!title || title.length < 5 || title.length > 25) {
      setError('Min 5 letters or max 25 letters length.');
    } else {
      setError('');
    }
  }

  function keyDownHandler(key: string) {
    if (key === 'Enter') {
      addHandler();
    }
  }

  function addHandler() {
    if (title && !error) {
      addTodoHandler(title);
      setTitle('');
    }
  }

  return (
    <section>
      <input
        value={title}
        type={"text"}
        name={"title"}
        placeholder={'Enter task title...'}
        onKeyDown={(event) => keyDownHandler(event.key)}
        required={true}
        onInput={handleInput}/>
      {!!error && <p>{error}</p>}
      <button onClick={addHandler} disabled={!!error}>Add</button>
    </section>
  );
}
