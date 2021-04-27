import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers($userName: String!) {
    users(userName: $userName) {
      id
      username
    }
  }
`;
