import ApolloClient from "apollo-boost";

const USER_GRAPHQL_API = "https://graphqlzero.almansi.me/api";

export const client = new ApolloClient({ uri: USER_GRAPHQL_API });
