import { gql } from "apollo-boost";
import { client } from "./apollo";

export const getPosts = async () => {
  console.log("apollo::getPosts::");
  const query = gql`
{
  posts {
    data {
      id,
      title,
      body
    }
  }
}
`;

  const response = await client.query({ query });

  console.log("apollo::getPosts:: response:", response);
  return response.data.posts;
};

// use: variables // RECOMMENDED
export const createPost = async post => {
  console.log("apollo::createPost:: post:", post);

  const mutation = gql`
    mutation($input: CreatePostInput!) {
      createPost(input: $input) {
        id,
        title,
        body
      }
    }
`;
  const variables = {
    input: {
      title: post.title,
      body: post.body
    }
  };
  const response = await client.mutate({ mutation, variables });

  console.log("apollo::createPost:: response:", response);
  return response.data.createPost;
};

export const updatePost = async post => {
  console.log("apollo::updatePost:: post:", post);

  const mutation = gql`
    mutation($id: ID!, $input: UpdatePostInput!) {
      updatePost(id: $id, input: $input) {
        id,
        title,
        body
      }
    }
`;
  const variables = {
    id: post.id,
    input: {
      title: post.title,
      body: post.body
    }
  };
  const response = await client.mutate({ mutation, variables });

  console.log("apollo::updatePost:: response:", response);
  return response.data.updatePost;
};

export const deletePost = async post => {
  console.log("apollo::deletePost:: post:", post);

  const mutation = gql`
    mutation($id: ID!) {
      deletePost(id: $id)
    }
`;
  const variables = { id: post.id };
  const response = await client.mutate({ mutation, variables });

  console.log("apollo::deletePost:: response:", response);
  return response.data.deletePost;
};
