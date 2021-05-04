import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { GET_TRAVELS } from "../../lib/graphql/client/queries";
import { TravelsType } from "../../types/TravelsType";

const useTravels = () => {
  const [offset, setOffset] = useState<number>(0);
  const [adventures, setAdventures] = useState<TravelsType[]>([]);
  const [getTravels, travels] = useLazyQuery(GET_TRAVELS);

  useEffect(() => {
    getTravels({
      variables: {
        offset,
      },
    });
  }, [offset]);

  useEffect(() => {
    if (travels.data) {
      setAdventures((prevState) => [...prevState, ...travels.data.travels]);
      const io = new IntersectionObserver(
        (
          entries: IntersectionObserverEntry[],
          observer: IntersectionObserver
        ) => {
          if (entries[0].isIntersecting) {
            setOffset((prevState) => (prevState + 1) * 1);
            observer.disconnect();
          }
        }
      );
      io.observe(document.getElementById("footer")!);
    }
  }, [travels.data]);

  return { travels, adventures };
};

export default useTravels;
