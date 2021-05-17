import React from "react";

import { TravelsType } from "../types/TravelsType";

const TravelInfoContext = React.createContext<TravelsType>({
  created_at: "",
  id: 0,
  image_url: "",
  name: null,
  username: "",
  travelLikes: 0,
  userLikes: 0,
});

export default TravelInfoContext;
