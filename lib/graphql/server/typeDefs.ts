import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type SearchUser {
    id: Int!
    username: String!
  }

  type Travels {
    id: Int!
    name: String
    created_at: String!
    image_url: String!
    username: String!
  }

  type Images {
    image_url: String!
    image_desc: String
  }

  type TravelType {
    description: String
    payAttention: String
    startTime: String
    endTime: String
    images: [Images!]!
    users: [SearchUser]
  }

  type Query {
    users(userName: String!): [SearchUser!]!
    travels(offset: Int!): [Travels!]
    travel(id: Int!): TravelType!
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
    likeTravel(travelID: Int): String!
  }

  type Subscription {
    travelLiked: String!
  }
`;

export default typeDefs;
