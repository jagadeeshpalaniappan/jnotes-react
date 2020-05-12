import { request } from "graphql-request";

const POST_API_ENDPOINT_GRAPHQL = "https://graphqlzero.almansi.me/api";

export const getPosts = async () => {
  const query = `
{
  posts {
    data {
      id
      name
      postname
      email
      phone
      website
    }
  }
}
`;

  const response = await request(POST_API_ENDPOINT_GRAPHQL, query);
  return response.posts;
};

/*
export const createPost = async post => {
  const query = `
    mutation {
      createPost(
        input: {
          name: "${post.name}",
          email: "${post.email}",
          postname: "${post.email}"
        }
      ) {
        id
        name
        email
      }
    }
`;

  const response = await request(POST_API_ENDPOINT_GRAPHQL, query);
  return response.createPost;
};
*/

// use: variables // RECOMMENDED
export const createPost = async post => {
  const query = `
   mutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      name
      email
    }
  }
`;
  const variables = {
    input: {
      name: post.name,
      postname: post.email,
      email: post.email
    }
  };
  const response = await request(POST_API_ENDPOINT_GRAPHQL, query, variables);
  return response.createPost;
};

export const updatePost = async post => {
  const query = `
    mutation($id: ID!, $input: UpdatePostInput!) {
      updatePost(id: $id, input: $input) {
        id
        name
        email
      }
    }
`;
  const variables = {
    id: post.id,
    input: {
      name: post.name,
      postname: post.email,
      email: post.email
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