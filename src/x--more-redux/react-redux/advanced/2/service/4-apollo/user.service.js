import { request } from "graphql-request";
import { gql } from "apollo-boost";

import { client } from "./apollo";


export const getUsers = async () => {
  console.log("apollo::getUsers::");

  const query = gql`
    {
      users {
        data {
          id
          name
          username
          email
          phone
          website
        }
      }
    }
  `;
  const response = await client.query({ query });

  console.log("apollo::getUsers:: response:", response);
  return response.data.users;
};

export const createUser = async user => {
  console.log("apollo::createUser:: user:", user);
  const mutation = gql`
   mutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;
  const variables = {
    input: {
      name: user.name,
      username: user.email,
      email: user.email
    }
  };

  const response = await client.mutate({ mutation, variables });

  console.log("apollo::createUser:: response:", response);
  return response.data.createUser;
};

export const updateUser = async user => {
  console.log("apollo::updateUser:: user:", user);
  const mutation = gql`
    mutation($id: ID!, $input: UpdateUserInput!) {
      updateUser(id: $id, input: $input) {
        id
        name
        email
      }
    }
`;
  const variables = {
    id: user.id,
    input: {
      name: user.name,
      username: user.email,
      email: user.email
    }
  };
  const response = await client.mutate({ mutation, variables });

  console.log("apollo::updateUser:: response:", response);
  return response.data.updateUser;
};

export const deleteUser = async user => {
  console.log("apollo::deleteUser:: user:", user);
  const mutation = gql`
    mutation($id: ID!) {
      deleteUser(id: $id)
    }
`;
  const variables = { id: user.id };
  const response = await client.mutate({ mutation, variables });

  console.log("apollo::deleteUser:: response:", response);
  return response.data.deleteUser;
};
