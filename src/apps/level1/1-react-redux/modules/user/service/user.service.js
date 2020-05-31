import axios from "axios";

const USER_REST_API = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async () => {
  console.log("fetch::getUsers::");

  const response = await axios.get(USER_REST_API);
  console.log("fetch::getUsers:: response:", response);

  return response;
};

export const getUser = async (user) => {
  console.log("fetch::getUser::");

  const response = await axios.get(`${USER_REST_API}/${user.id}`);
  console.log("fetch::getUsers:: response:", response);

  return response.data;
};

export const createUser = async (user) => {
  console.log("fetch::createUser:: user:", user);

  const body = {
    name: user.name,
    email: user.email,
    age: user.age,
  };
  const response = await axios.post(USER_REST_API, body);

  console.log("fetch::createUser:: response:", response);
  return response.data;
};

export const updateUser = async (user) => {
  console.log("fetch::updateUser:: user:", user);

  // const body = {
  //   id: user.id,
  //   name: user.name,
  //   email: user.email,
  //   age: user.age,
  // };

  const body = user;
  const response = await axios.put(`${USER_REST_API}/${user.id}`, body);

  console.log("fetch::updateUser:: response:", response);
  return response.data;
};

export const deleteUser = async (user) => {
  console.log("fetch::deleteUser:: user:", user);

  const response = await axios.delete(`${USER_REST_API}/${user.id}`);

  console.log("fetch::deleteUser:: response:", response);
  return response.data;
};
