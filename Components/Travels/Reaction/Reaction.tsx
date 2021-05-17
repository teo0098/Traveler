import { Heart } from "react-feather";
import { useSubscription, useMutation } from "@apollo/client";

import * as SC from "./styledReaction";
import { TRAVEL_LIKED } from "../../../lib/graphql/client/subscriptions";
import { LIKE_TRAVEL } from "../../../lib/graphql/client/mutations";
import ReactionProps from "./reactionProps";

const Reaction: React.FC<ReactionProps> = ({ travelID }) => {
  const data = useSubscription(TRAVEL_LIKED, {
    variables: {
      travelID,
    },
  });
  const [likeTravel] = useMutation(LIKE_TRAVEL, {
    variables: {
      travelID,
      refreshToken: localStorage.getItem("refreshToken"),
    },
  });

  return (
    <SC.StyledReaction>
      <Heart onClick={() => likeTravel()} />
      {console.log(data)}
      {data.data ? data.data.travelLiked : null}
    </SC.StyledReaction>
  );
};

export default Reaction;
