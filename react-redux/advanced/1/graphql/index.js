

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      username
      email
      phone
      website
    }
  }
`;

export const UPDATE_USER = gql`
  mutation($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`;