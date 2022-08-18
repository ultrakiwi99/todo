import {gql} from "@apollo/client";

export const GET_TODOS = gql`
query($options:PageQueryOptions) {
  todos(options: $options){
    data{
      id,
      title,
      completed
    },
    meta{
      totalCount
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

export const UPDATE_TODO = gql`
mutation($id:ID!,$input:UpdateTodoInput!) {
  updateTodo(id:$id, input:$input) {
    id,
    title,
    completed
  }
}
`;

export const DELETE_TODO = gql`
mutation($id:ID!) {
  deleteTodo(id:$id)
}
`;
