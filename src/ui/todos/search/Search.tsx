import "./Search.css";
import {FormEvent, SyntheticEvent, useContext, useState} from "react";
import {CompletedState, SearchOperator} from "../../../application/types";
import {TodosContext} from "../../context/TodosContext";

export function Search() {
  const [title, setTitle] = useState('');
  const [completedState, setCompletedState] = useState<CompletedState>(CompletedState.Undefined);
  const {setSearchConditions} = useContext(TodosContext);

  const handleTitle = (event: FormEvent<HTMLInputElement>) => {
    setTitle((event.target as HTMLInputElement).value);
  }

  const handleCompleted = (event: FormEvent<HTMLSelectElement>) => {
    setCompletedState(Number((event.target as HTMLSelectElement).value));
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const conditions = [];
    if (title) {
      conditions.push({
        kind: 'LIKE',
        field: 'title',
        value: title
      } as SearchOperator);
    }
    if (completedState !== CompletedState.Undefined) {
      conditions.push({
        kind: 'LIKE',
        field: 'completed',
        value: completedState === CompletedState.Completed ? "true" : "false"
      } as SearchOperator);
    }
    setSearchConditions(conditions);
  }

  const resetHandler = () => {
    setTitle('');
    setCompletedState(CompletedState.Undefined);
    setSearchConditions([]);
  }

  return (
    <form id={'search-todos'} onSubmit={handleSubmit}>
      <input type={'search'} placeholder={'Search by title'} onInput={handleTitle} value={title}/>
      <select onChange={handleCompleted} defaultValue={CompletedState.Undefined}>
        <option value={CompletedState.Undefined}>--</option>
        <option value={CompletedState.Completed}>Completed</option>
        <option value={CompletedState.NotCompleted}>Not completed</option>
      </select>
      <button type={'submit'} dangerouslySetInnerHTML={ {__html: '&#128270;'} } />
      <button type={'reset'} onClick={() => resetHandler()}>X</button>
    </form>
  );
}
