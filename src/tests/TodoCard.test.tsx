import {fireEvent, screen} from "@testing-library/react";
import {customTodoRender} from "./helpers/customRender";
import {Todo} from "../domain/todo";

beforeEach(() => {
  jest.mock('react-router-dom', () => ({
    useParams: () => ({
      todoID: '1',
    }),
  }));
});

describe('TodoCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with todo information', () =>{
    const providerProps = {
      todos: [{ id: 1, title: 'One', completed: false}],
      getTodo: () => ({ id: 1, title: 'One', completed: false}),
      todoError: undefined,
      todoLoading: false
    }

    customTodoRender({providerProps});

    expect(screen.getByText('#1')).not.toBeNull();
    expect(screen.getByText('Completed: NO')).not.toBeNull();
    expect(screen.getByText('One')).not.toBeNull();
  });

  it('calls toggleDoneAction on button click with current todo', () =>{
    expect.hasAssertions();
    const providerProps = {
      todos: [{ id: 1, title: 'One', completed: false}],
      getTodo: () => ({ id: 1, title: 'One', completed: false}),
      todoError: undefined,
      todoLoading: false,
      toggleDoneAction: (todo: Todo) => {
        expect(todo).toStrictEqual({ id: 1, title: 'One', completed: false})
      }
    }

    customTodoRender({providerProps});

    const updateButton = screen.getByText('Mark Done');

    fireEvent.click(updateButton);
  });
});
