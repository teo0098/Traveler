import { Heart } from "react-feather";

import * as SC from "./styledReaction";
import ReactionProps from "./reactionProps";
import useReaction from "../../customHooks/useReaction";

const Reaction: React.FC<ReactionProps> = ({
  travelID,
  travelLikes: detailsTravelLikes,
}) => {
  const { travelLiked, handleLikeTravel, handleShowLikes } = useReaction(
    travelID,
    detailsTravelLikes
  );

  return (
    <SC.StyledReaction travelLiked={travelLiked}>
      <Heart onClick={handleLikeTravel} />
      <SC.StyledLikes>{handleShowLikes()}</SC.StyledLikes>
    </SC.StyledReaction>
  );
};

export default Reaction;
