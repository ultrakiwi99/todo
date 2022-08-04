import {FormEvent, useState} from "react";

export function AddTodo({addTodoHandler}: {addTodoHandler: (title: string) => void}) {
  const [title, setTitle] = useState<string>('');

  function handleInput(event:FormEvent<HTMLInputElement>) {
    setTitle((event.target as HTMLInputElement).value);
  }

  function keyDownHandler(key: string) {
    if (key === 'Enter') {
      addHandler();
    }
  }

  function addHandler() {
    if (title) {
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
        onKeyDown={(event) => keyDownHandler(event.key)}
        onInput={handleInput}/>
      <button onClick={addHandler}>Add</button>
    </section>
  );
}
