import { Heart } from "react-feather";

import * as SC from "./styledReaction";
import ReactionProps from "./reactionProps";
import useReaction from "../../customHooks/useReaction";

const Reaction: React.FC<ReactionProps> = ({ travelID }) => {
  const { data, travelLiked, handleLikeTravel, travelLikes } = useReaction(
    travelID
  );

  return (
    <SC.StyledReaction travelLiked={travelLiked}>
      <Heart onClick={handleLikeTravel} />
      <SC.StyledLikes>
        {data ? data.travelLiked.likes : travelLikes}
      </SC.StyledLikes>
    </SC.StyledReaction>
  );
};

export default Reaction;
