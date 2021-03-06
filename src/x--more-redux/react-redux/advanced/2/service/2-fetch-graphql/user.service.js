import { request } from "graphql-request";
import axios from "axios";

const USER_GRAPHQL_API = "https://graphqlzero.almansi.me/api";

export const getUsers = async () => {
  console.log("fetch::getUsers::");
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
  const body = { query };
  const response = await axios.post(USER_GRAPHQL_API, body);
  
  console.log("fetch::getUsers:: response:", response);
  return response.data.data.users;
};

export const createUser = async user => {
  console.log("fetch::createUser:: user:", user);
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
  const body = { query, variables };
  const response = await axios.post(USER_GRAPHQL_API, body);

  console.log("fetch::createUser:: response:", response);
  return response.data.data.createUser;
};

export const updateUser = async user => {
  console.log("fetch::updateUser:: user:", user);
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
  const body = { query, variables };
  const response = await axios.post(USER_GRAPHQL_API, body);

  console.log("fetch::updateUser:: response:", response);
  return response.data.data.updateUser;
};

export const deleteUser = async user => {
  console.log("fetch::deleteUser:: user:", user);
  const query = `
    mutation($id: ID!) {
      deleteUser(id: $id)
    }
`;

  const variables = { id: user.id };
  const body = { query, variables };
  const response = await axios.post(USER_GRAPHQL_API, body);

  console.log("fetch::deleteUser:: response:", response);
  return response.data.data.deleteUser;
};
