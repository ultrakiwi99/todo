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
