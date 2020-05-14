import axios from "axios";

const POST_GRAPHQL_API = "https://graphqlzero.almansi.me/api";

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

  const body = { query };
  const response = await axios.post(POST_GRAPHQL_API, body);
  return response.data.data.posts;
};

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
  const body = { query, variables };
  const response = await axios.post(POST_GRAPHQL_API, body);
  return response.data.data.createPost;
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
  const body = { query, variables };
  const response = await axios.post(POST_GRAPHQL_API, body);
  return response.data.data.updatePost;
};

export const deletePost = async post => {
  const query = `
    mutation($id: ID!) {
      deletePost(id: $id)
    }
`;
  const variables = { id: post.id };
  const body = { query, variables };
  const response = await axios.post(POST_GRAPHQL_API, body);
  return response.data.data.deletePost;
};
