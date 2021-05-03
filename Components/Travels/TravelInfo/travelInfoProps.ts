import { Dispatch } from "react";

import { TravelsType } from "../../../types/TravelsType";

export interface TravelInfoProps {
  travel: TravelsType;
  visible: boolean;
  setVisible: Dispatch<boolean>;
}
