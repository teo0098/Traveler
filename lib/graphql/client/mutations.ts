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
  mutation LikeTravel($travelID: Int!, $refreshToken: String!) {
    likeTravel(travelID: $travelID, refreshToken: $refreshToken)
  }
`;

export const GET_DATA_USER = gql`
  mutation GetUserData($refreshToken: String!) {
    getUserData(refreshToken: $refreshToken) {
      username
      email
      avatar
      travels
    }
  }
`;

export const CHANGE_USER_PHOTO = gql`
  mutation ChangeUserPhoto($refreshToken: String!, $file: String!) {
    changeUserPhoto(refreshToken: $refreshToken, file: $file) {
      photo
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $email: String!
    $currentPassword: String!
    $newPassword: String!
  ) {
    editPassword(
      email: $email
      currentPassword: $currentPassword
      newPassword: $newPassword
    )
  }
`;

export const CHANGE_USERNAME = gql`
  mutation editUsername($email: String!, $username: String!) {
    editUsername(email: $email, username: $username)
  }
`;
