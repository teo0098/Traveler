import { PubSub } from "apollo-server";

export interface Context {
  req: Request;
  res: Response;
  pubsub: PubSub;
}
