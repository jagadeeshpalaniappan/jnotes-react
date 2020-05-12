import { request } from "graphql-request";

const POST_API_ENDPOINT_GRAPHQL = "https://graphqlzero.almansi.me/api";

export const getPosts = async () => {
  const query = `
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

  const response = await request(POST_API_ENDPOINT_GRAPHQL, query);
  return response.posts;
};

// use: variables // RECOMMENDED
export const createPost = async post => {
  const query = `
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
  const response = await request(POST_API_ENDPOINT_GRAPHQL, query, variables);
  return response.createPost;
};

export const updatePost = async post => {
  const query = `
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
  const response = await request(POST_API_ENDPOINT_GRAPHQL, query, variables);
  return response.updatePost;
};

export const deletePost = async post => {
  const query = `
    mutation($id: ID!) {
      deletePost(id: $id)
    }
`;
  const variables = { id: post.id };
  const response = await request(POST_API_ENDPOINT_GRAPHQL, query, variables);
  return response.deletePost;
};