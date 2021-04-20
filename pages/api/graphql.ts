import { ApolloServer } from 'apollo-server-micro'
import { json } from 'micro'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import typeDefs from '../../lib/graphql/server/typeDefs'
import resolvers from '../../lib/graphql/server/resolvers'

const server = new ApolloServer({ typeDefs, resolvers });

const raiseBodyLimit = (handler : NextApiHandler) => async (req : NextApiRequest, res : NextApiResponse) => {
  await json(req, { limit: '1gb' })
  return handler(req, res)
}

export default raiseBodyLimit(server.createHandler({
  path: '/api/graphql'
}))

export const config = {
  api: {
    bodyParser: false
  }
}