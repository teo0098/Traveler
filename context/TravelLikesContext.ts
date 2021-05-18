import { createContext, Dispatch, SetStateAction } from "react";

interface TravelLikesContextProps {
  travelLiked: boolean;
  setTravelLiked: Dispatch<SetStateAction<boolean>>;
}

const TravelLikesContext = createContext<TravelLikesContextProps>({
  travelLiked: false,
  setTravelLiked: () => {},
});

export default TravelLikesContext;
