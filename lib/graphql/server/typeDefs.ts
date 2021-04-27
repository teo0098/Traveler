import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type SearchUser {
    id: Int!
    username: String!
  }

  type Query {
    user: String
    users(userName: String!): [SearchUser!]!
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

  input Files {
    desc: String
    base64: String!
  }

  input TagUsers {
    id: Int!
    username: String!
  }

  input Travel {
    name: String
    description: String
    private: Boolean!
    payAtention: String
    startTime: String
    endTime: String
    users: [TagUsers]
  }

  type Mutation {
    loginUser(email: String!, password: String!): LoginAuth!
    addTravel(files: [Files!]!, refreshToken: String, travel: Travel!): String!
    registerUser(
      username: String!
      password: String!
      email: String!
    ): AuthPayload
    verifyUser(verifyHash: String!): VerifyPayload

    editPassword(
      email: String!
      currentPassword: String!
      newPassword: String!
    ): LoginAuth

    editUsername(email: String!, newUsername: String!): LoginAuth
  }
`;

export default typeDefs;
