import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
}
type AuthPayload {
  token: String!
  error: String!
}
  type Query {
    user: String
  }
  type Mutation{
  registerUser(username: String!, password: String!, email: String!): AuthPayload
  }
`



export default typeDefs