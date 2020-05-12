import { request } from "graphql-request";

const USER_API_ENDPOINT_GRAPHQL = "https://graphqlzero.almansi.me/api";

export const getUsers = async () => {
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

  const response = await request(USER_API_ENDPOINT_GRAPHQL, query);
  return response.users;
};

/*
export const createUser = async user => {
  const query = `
    mutation {
      createUser(
        input: {
          name: "${user.name}",
          email: "${user.email}",
          username: "${user.email}"
        }
      ) {
        id
        name
        email
      }
    }
`;

  const response = await request(USER_API_ENDPOINT_GRAPHQL, query);
  return response.createUser;
};
*/

// use: variables // RECOMMENDED
export const createUser = async user => {
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
  const response = await request(USER_API_ENDPOINT_GRAPHQL, query, variables);
  return response.createUser;
};

export const updateUser = async user => {
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
  const response = await request(USER_API_ENDPOINT_GRAPHQL, query, variables);
  return response.updateUser;
};

export const deleteUser = async user => {
  const query = `
    mutation($id: ID!) {
      deleteUser(id: $id)
    }
`;
  const variables = { id: user.id };
  const response = await request(USER_API_ENDPOINT_GRAPHQL, query, variables);
  return response.deleteUser;
};

