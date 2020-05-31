


import gql from "graphql-tag";

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      username
      email
      phone
      website
    }
  }
`;

export const CREATE_USER = gql`
   mutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`;