import { gql } from "@apollo/client";

export const TRAVEL_LIKED = gql`
  subscription TravelLiked($travelID: Int!) {
    travelLiked(travelID: $travelID)
  }
`;
