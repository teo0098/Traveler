import Skeleton from "react-loading-skeleton";

import { TravelsType } from "../../types/TravelsType";
import useTravels from "../customHooks/useTravels";
import Travel from "./Travel/Travel";
import * as SC from "./styledTravels";

const Travels: React.FC = () => {
  const {
    travels: { loading, error, data },
  } = useTravels();

  return (
    <SC.StyledTravels>
      {loading
        ? [...Array(3)].map((_, index: number) => (
            <div key={index}>
              <Skeleton />
              <Skeleton height={300} />
              <Skeleton count={2} />
            </div>
          ))
        : null}
      {!loading && !error
        ? (data.travels as TravelsType[]).map((travel) => (
            <Travel key={travel.id} travel={travel} />
          ))
        : null}
    </SC.StyledTravels>
  );
};

export default Travels;
