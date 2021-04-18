import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    user: String
  }

  type AuthPayload {
    token: String!
    error: String!
  }

  type VerifyPayload {
    verifyHash: String!
  }

  type LoginAuth {
    refreshToken: String!
    accessToken: String!
  }

  type Mutation {
    registerUser(
      username: String!
      password: String!
      email: String!
    ): AuthPayload
    verifyUser(verifyHash: String!): VerifyPayload
    loginUser(email: String!, password: String!): LoginAuth
  }
`;

export default typeDefs;
