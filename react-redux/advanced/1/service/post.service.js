import axios from "axios";
export const getPosts = () => {
  return axios.get("https://jsonplaceholder.typicode.com/posts");
};

export const createPost = post => {
  const reqBody = {
    name: post.name,
    email: post.email,
    age: post.age
  };
  return axios.post("https://jsonplaceholder.typicode.com/posts", reqBody);
};

export const updatePost = post => {
  const reqBody = {
    id: post.id,
    name: post.name,
    email: post.email,
    age: post.age
  };

  return axios.put(
    `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    reqBody
  );
};

export const deletePost = post => {
  return axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`);
};
