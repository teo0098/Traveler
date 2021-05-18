import { useSubscription, useMutation } from "@apollo/client";
import { useEffect, useContext } from "react";

import { TRAVEL_LIKED } from "../../lib/graphql/client/subscriptions";
import { LIKE_TRAVEL } from "../../lib/graphql/client/mutations";
import TravelInfoContext from "../../context/TravelInfoContext";
import TravelLikesContext from "../../context/TravelLikesContext";

const useReaction = (travelID: number, detailsTravelLikes?: number) => {
  const { data, error } = useSubscription(TRAVEL_LIKED, {
    variables: {
      travelID,
    },
  });
  const [likeTravel, { error: likeTravelError }] = useMutation(LIKE_TRAVEL, {
    variables: {
      travelID,
      refreshToken: localStorage.getItem("refreshToken"),
    },
    onError: () => {},
  });
  const { travelLikes } = useContext(TravelInfoContext);
  const { travelLiked, setTravelLiked } = useContext(TravelLikesContext);

  const handleLikeTravel = () => {
    if (localStorage.getItem("refreshToken")) {
      setTravelLiked((prevState) => !prevState);
      likeTravel();
    }
  };

  const handleShowLikes = () => {
    if (data) return data.travelLiked;
    if (detailsTravelLikes || detailsTravelLikes === 0)
      return detailsTravelLikes;
    return travelLikes;
  };

  useEffect(() => {
    if (likeTravelError || error) setTravelLiked((prevState) => !prevState);
  }, [likeTravelError, error]);

  return { travelLiked, handleLikeTravel, handleShowLikes };
};

export default useReaction;
