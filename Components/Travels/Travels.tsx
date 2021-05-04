import Skeleton from "react-loading-skeleton";

import useTravels from "../customHooks/useTravels";
import Travel from "./Travel/Travel";
import * as SC from "./styledTravels";
import TravelInfoContext from "../../context/TravelInfoContext";
import Error from "../Error/Error";

const Travels: React.FC = () => {
  const {
    travels: { loading, error },
    adventures,
  } = useTravels();

  return (
    <SC.StyledTravels>
      {adventures.map((travel) => (
        <TravelInfoContext.Provider key={travel.id} value={travel}>
          <Travel />
        </TravelInfoContext.Provider>
      ))}
      {!loading && error ? <Error> {error.message} </Error> : null}
      {loading
        ? [...Array(1)].map((_, index: number) => (
            <div key={index}>
              <Skeleton />
              <Skeleton height={300} />
              <Skeleton count={2} />
            </div>
          ))
        : null}
    </SC.StyledTravels>
  );
};

export default Travels;
