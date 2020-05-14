import { request } from "graphql-request";
import axios from "axios";

const USER_GRAPHQL_API = "https://graphqlzero.almansi.me/api";

export const getUsers = async () => {
  console.log("apollo::getUsers::");
  const query = `
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

  const response = await request(USER_GRAPHQL_API, query);
  
  console.log("apollo::getUsers:: response:", response);
  return response.users;
};

export const createUser = async user => {
  console.log("apollo::createUser:: user:", user);
  const query = `
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
  const response = await request(USER_GRAPHQL_API, query, variables);

  console.log("apollo::createUser:: response:", response);
  return response.createUser;
};

export const updateUser = async user => {
  console.log("apollo::updateUser:: user:", user);
  const query = `
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
  const response = await request(USER_GRAPHQL_API, query, variables);

  console.log("apollo::updateUser:: response:", response);
  return response.updateUser;
};

export const deleteUser = async user => {
  console.log("apollo::deleteUser:: user:", user);
  const query = `
    mutation($id: ID!) {
      deleteUser(id: $id)
    }
`;
  const variables = { id: user.id };
  const response = await request(USER_GRAPHQL_API, query, variables);

  console.log("apollo::deleteUser:: response:", response);
  return response.deleteUser;
};
