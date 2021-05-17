import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers($userName: String!) {
    users(userName: $userName) {
      id
      username
    }
  }
`;

export const GET_TRAVELS = gql`
  query GetTravels($offset: Int!, $refreshToken: String) {
    travels(offset: $offset, refreshToken: $refreshToken) {
      id
      name
      created_at
      image_url
      username
      travelLikes
      userLikes
    }
  }
`;

export const GET_TRAVEL = gql`
  query GetTravel($id: Int!) {
    travel(id: $id) {
      description
      payAttention
      startTime
      endTime
      images {
        image_url
        image_desc
      }
      users {
        id
        username
      }
    }
  }
`;
