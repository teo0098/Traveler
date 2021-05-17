import { Heart } from "react-feather";
import { useSubscription, useMutation } from "@apollo/client";

import * as SC from "./styledReaction";
import { TRAVEL_LIKED } from "../../../lib/graphql/client/subscriptions";
import { LIKE_TRAVEL } from "../../../lib/graphql/client/mutations";

const Reaction: React.FC = () => {
  const { data } = useSubscription(TRAVEL_LIKED);
  const [likeTravel, mData] = useMutation(LIKE_TRAVEL);

  return (
    <SC.StyledReaction>
      <Heart onClick={() => likeTravel()} />
      {data ? data.travelLiked : null}
    </SC.StyledReaction>
  );
};

export default Reaction;
