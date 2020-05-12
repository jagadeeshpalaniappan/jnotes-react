import { request } from "graphql-request";

const USER_API_ENDPOINT_GRAPHQL = "https://graphqlzero.almansi.me/api";

export const getUsers = async () => {
//   const query = `
// {
//   users {
//     data {
//       id
//       name
//       username
//       email
//       phone
//       website
//     }
//   }
// }
// `;

//   const response = await request(USER_API_ENDPOINT_GRAPHQL, query);
//   return response.users;
};

export const createUser = user => {
  // const query = `
  //   mutation {
  //     createUser(
  //       input: { name: "Jag1", username: "jag1", email: "jag1@test.com" }
  //     ) {
  //       id
  //       name
  //       email
  //     }
  //   }
  // `;
  // const response = await request(USER_API_ENDPOINT_GRAPHQL, query);
  // return response.users;
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
