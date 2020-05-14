import axios from "axios";

const POST_REST_API = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = async () => {
  console.log("fetch::getPosts::");

  const response = await axios.get(POST_REST_API);
  console.log("fetch::getPosts:: response:", response);

  return response;
};

export const createPost = async post => {
  console.log("fetch::createPost:: post:", post);

  const body = {
    title: post.title,
    body: post.body
  };
  const response = await axios.post(POST_REST_API, body);

  console.log("fetch::createPost:: response:", response);
  return response.data;
};

export const updatePost = async post => {
  console.log("fetch::updatePost:: post:", post);

  const body = {
    id: post.id,
    title: post.title,
    body: post.body
  };
  const response = await axios.put(`${POST_REST_API}/${post.id}`, body);

  console.log("fetch::updatePost:: response:", response);
  return response.data;
};

export const deletePost = async post => {
  console.log("fetch::deletePost:: post:", post);

  const response = await axios.delete(`${POST_REST_API}/${post.id}`);

  console.log("fetch::deletePost:: response:", response);
  return response.data;
};
