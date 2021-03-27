import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book],
    book(item: Int): Book
  }
`

export default typeDefs