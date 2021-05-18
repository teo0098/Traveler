import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

import { GET_TRAVEL } from "../../lib/graphql/client/queries";

const useTravelInfo = (visible: boolean, travelID: number) => {
  const [getTravel, travel] = useLazyQuery(GET_TRAVEL, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (visible)
      getTravel({
        variables: {
          id: travelID,
          refreshToken: localStorage.getItem("refreshToken"),
        },
      });
  }, [visible]);

  return { travel };
};

export default useTravelInfo;
