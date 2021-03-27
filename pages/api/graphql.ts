import { ApolloServer } from 'apollo-server-micro'

import typeDefs from '../../lib/graphql/server/typeDefs'
import resolvers from '../../lib/graphql/server/resolvers'

const server = new ApolloServer({ typeDefs, resolvers });

export default server.createHandler({
  path: '/api/graphql'
})

export const config = {
  api: {
    bodyParser: false
  }
}