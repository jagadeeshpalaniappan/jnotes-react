import axios from "axios";
export const getPosts = () => {
  return axios.get("https://jsonplaceholder.typicode.com/posts");
};

export const createPost = post => {
  const reqBody = {
    title: post.title,
    body: post.body
  };
  return axios.post("https://jsonplaceholder.typicode.com/posts", reqBody);
};

export const updatePost = post => {
  const reqBody = {
    id: post.id,
    title: post.title,
    body: post.body
  };

  return axios.put(
    `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    reqBody
  );
};

export const deletePost = post => {
  return axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`);
};
