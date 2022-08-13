import {gql} from "@apollo/client";

export const GET_TODOS = gql`
query GetAllTodos {
  todos {
    data {
      id,
      title,
      completed
    }
  }
}
`;

export const GET_TODO = gql`
query GetTodo($id: ID!) {
  todo(id: $id) {
    id,
    title,
    completed
  }
}
`;

export const ADD_TODO = gql`
mutation($input:CreateTodoInput!) {
  createTodo(input:$input) {
    id,
    title,
    completed
  }
}
`;
