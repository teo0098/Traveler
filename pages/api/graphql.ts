import { ApolloServer } from "apollo-server-micro";
import { json } from "micro";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { PubSub } from "apollo-server";

import typeDefs from "../../lib/graphql/server/typeDefs";
import resolvers from "../../lib/graphql/server/resolvers";

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: "/api/subscriptions",
    keepAlive: 9000,
    onConnect: () => console.log("Polaczono websocket"),
    onDisconnect: () => console.log("Rozlaczono websocket"),
  },
  context: ({ req, res }) => ({ req, res, pubsub }),
});

const raiseBodyLimit = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await json(req, { limit: "1gb" });
  return handler(req, res);
};

const graphqlWithSubscriptionHandler = (req: any, res: any, next: any) => {
  if (!res.socket.server.apolloServer) {
    server.installSubscriptionHandlers(res.socket.server);
    const handler = raiseBodyLimit(
      server.createHandler({ path: "/api/graphql" })
    );
    res.socket.server.apolloServer = handler;
  }

  return res.socket.server.apolloServer(req, res, next);
};

export default graphqlWithSubscriptionHandler;

export const config = {
  api: {
    bodyParser: false,
  },
};
