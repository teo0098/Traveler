import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_TRAVELS } from "../../lib/graphql/client/queries";

const useTravels = () => {
  const travels = useQuery(GET_TRAVELS, {
    variables: {
      offset: 0,
    },
  });

  useEffect(() => {
    console.log(travels);
  }, [travels]);

  return { travels };
};

export default useTravels;
