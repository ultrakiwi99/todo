import {render, screen} from "@testing-library/react";
import {TodoListView} from "../ui/todos/TodoListView";
import {ApolloError} from "@apollo/client";
import {customRender} from "./helpers/customRender";

describe('TodoListView', () => {
  it('renders with title', () => {
    render(<TodoListView />);
    expect(screen.getByText('List of Todos')).not.toBeNull();
  });

  it('renders list of todos', () => {
    const providerProps = {
      todos: [
        {id: 1, title: 'One', completed: false},
        {id: 2, title: 'Two', completed: false}
      ],
      loadingTodos: false,
      errorLoadingTodos: null
    };
    customRender(<TodoListView />, {providerProps});

    expect(screen.getByText('One')).not.toBeNull();
    expect(screen.getByText('Two')).not.toBeNull();
  });

  it('render loading text while loading todos', () => {
    const providerProps = {
      todos: [],
      loadingTodos: true,
      errorLoadingTodos: null
    };
    customRender(<TodoListView />, {providerProps});

    expect(screen.queryByText('One')).toBeNull();
    expect(screen.queryByText('Two')).toBeNull();
    expect(screen.getByText('Loading...')).not.toBeNull();
  });

  it('render error text while loading todos', () => {
    const providerProps = {
      todos: [],
      loadingTodos: false,
      errorLoadingTodos: new ApolloError({})
    };
    customRender(<TodoListView />, {providerProps});

    expect(screen.queryByText('One')).toBeNull();
    expect(screen.queryByText('Two')).toBeNull();
    expect(screen.getByText('Error loading todos:')).not.toBeNull();
  });
});
