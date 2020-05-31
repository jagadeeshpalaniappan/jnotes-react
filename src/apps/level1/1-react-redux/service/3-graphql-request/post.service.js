import { request } from "graphql-request";

const POST_GRAPHQL_API = "https://graphqlzero.almansi.me/api";

export const getPosts = async () => {
  console.log("graphqlReq::getPosts::");
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

  const response = await request(POST_GRAPHQL_API, query);

  console.log("graphqlReq::getPosts:: response:", response);
  return response.posts;
};

// use: variables // RECOMMENDED
export const createPost = async post => {
  console.log("graphqlReq::createPost:: post:", post);

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
  const response = await request(POST_GRAPHQL_API, query, variables);

  console.log("graphqlReq::createPost:: response:", response);
  return response.createPost;
};

export const updatePost = async post => {
  console.log("graphqlReq::updatePost:: post:", post);

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
  const response = await request(POST_GRAPHQL_API, query, variables);

  console.log("graphqlReq::updatePost:: response:", response);
  return response.updatePost;
};

export const deletePost = async post => {
  console.log("graphqlReq::deletePost:: post:", post);
  
  const query = `
    mutation($id: ID!) {
      deletePost(id: $id)
    }
`;
  const variables = { id: post.id };
  const response = await request(POST_GRAPHQL_API, query, variables);

  console.log("graphqlReq::deletePost:: response:", response);
  return response.deletePost;
};