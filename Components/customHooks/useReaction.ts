import { useSubscription, useMutation } from "@apollo/client";
import { useEffect, useState, useContext } from "react";

import { TRAVEL_LIKED } from "../../lib/graphql/client/subscriptions";
import { LIKE_TRAVEL } from "../../lib/graphql/client/mutations";
import TravelInfoContext from "../../context/TravelInfoContext";

const useReaction = (travelID: number) => {
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
  const { travelLikes, userLikes } = useContext(TravelInfoContext);
  const [travelLiked, setTravelLiked] = useState<boolean>(
    userLikes > 0 ? true : false
  );

  const handleLikeTravel = () => {
    setTravelLiked((prevState) => !prevState);
    likeTravel();
  };

  useEffect(() => {
    if (likeTravelError || error) setTravelLiked((prevState) => prevState);
  }, [likeTravelError, error]);

  return { data, travelLiked, handleLikeTravel, travelLikes };
};

export default useReaction;
