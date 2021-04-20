import { gql } from 'apollo-server-micro'

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

  type LoginAuth {
    refreshToken: String!
    accessToken: String!
  }

  input Files {
    desc: String,
    base64: String!
  }

  input Travel {
    name: String
    description: String
    private: Boolean!
  }

  type Mutation {
    registerUser(username: String!, password: String!, email: String!): AuthPayload
    loginUser(email: String!, password: String!): LoginAuth!
    addTravel(files: [Files!]!, refreshToken: String, travel: Travel!): String!
  }
`



export default typeDefs