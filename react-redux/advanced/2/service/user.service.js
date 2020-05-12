import { request } from "graphql-request";

export const getUsers = async () => {
  const query = `
{
  users {
    data {
      id
      name

    }
  }
}
`;
  
  const response = await request("https://graphqlzero.almansi.me/api", query);
  return response.users;
};

export const createUser = user => {
  const reqBody = {
    name: user.name,
    email: user.email,
    age: user.age
  };
  return axios.post("https://jsonplaceholder.typicode.com/users", reqBody);
};

export const updateUser = user => {
  const reqBody = {
    id: user.id,
    name: user.name,
    email: user.email,
    age: user.age
  };

  return axios.put(
    `https://jsonplaceholder.typicode.com/users/${user.id}`,
    reqBody
  );
};

export const deleteUser = user => {
  return axios.delete(`https://jsonplaceholder.typicode.com/users/${user.id}`);
};
