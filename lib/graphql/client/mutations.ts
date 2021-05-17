import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      refreshToken
      accessToken
    }
  }
`;
export const ADD_TRAVEL = gql`
  mutation AddTravel(
    $files: [Files!]!
    $refreshToken: String
    $travel: Travel!
  ) {
    addTravel(files: $files, refreshToken: $refreshToken, travel: $travel)
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $email: String!
    $password: String!
    $username: String!
  ) {
    registerUser(email: $email, password: $password, username: $username) {
      token
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($verifyHash: String!) {
    verifyUser(verifyHash: $verifyHash) {
      verifyHash
    }
  }
`;

export const LIKE_TRAVEL = gql`
  mutation LikeTravel($travelID: Int!) {
    likeTravel(travelID: $travelID)
  }
`;
