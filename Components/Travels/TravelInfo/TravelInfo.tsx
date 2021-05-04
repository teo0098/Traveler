import { AnimatePresence } from "framer-motion";
import { XCircle } from "react-feather";
import Skeleton from "react-loading-skeleton";
import moment from "moment";

import { parentVariants, childVariants } from "./animationVariants";
import * as SC from "./styledTravelInfo";
import * as TravelSC from "../Travel/styledTravel";
import useTravelInfo from "../../customHooks/useTravelInfo";
import { TravelInfoProps } from "./travelInfoProps";
import SwiperComponent from "./Swiper/Swiper";
import Information from "./Information/Information";
import { useContext } from "react";
import TravelInfoContext from "../../../context/TravelInfoContext";
import { TravelType } from "../../../types/TravelType";
import Reaction from "../Reaction/Reaction";
import Error from "../../Error/Error";

moment.locale("pl");

const TravelInfo: React.FC<TravelInfoProps> = ({ visible, setVisible }) => {
  const { id, created_at, username } = useContext(TravelInfoContext);
  const { travel: travelInfo } = useTravelInfo(visible, id);

  return (
    <AnimatePresence>
      {visible && (
        <SC.StyledShadow
          variants={parentVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <SC.StyledTravelInfo
            variants={childVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <SC.StyledClose>
              <XCircle onClick={() => setVisible(false)} />
            </SC.StyledClose>
            {travelInfo.loading ? (
              <div>
                <Skeleton height={300} />
                <Skeleton />
                <Skeleton />
              </div>
            ) : null}
            {!travelInfo.loading && travelInfo.error ? (
              <SC.StyledError>
                <Error> {travelInfo.error.message} </Error>
              </SC.StyledError>
            ) : null}
            {!travelInfo.loading && !travelInfo.error && travelInfo.called ? (
              <div>
                <SC.StyledPost>
                  <TravelSC.StyledUserName>{username}</TravelSC.StyledUserName>
                  <SC.StyledDate>{moment(+created_at).fromNow()}</SC.StyledDate>
                </SC.StyledPost>
                <SwiperComponent
                  images={(travelInfo.data.travel as TravelType).images}
                />
                <SC.StyledReaction>
                  <Reaction />
                </SC.StyledReaction>
                <Information
                  users={(travelInfo.data.travel as TravelType).users}
                  payAttention={
                    (travelInfo.data.travel as TravelType).payAttention
                  }
                  description={
                    (travelInfo.data.travel as TravelType).description
                  }
                  startTime={(travelInfo.data.travel as TravelType).startTime}
                  endTime={(travelInfo.data.travel as TravelType).endTime}
                />
              </div>
            ) : null}
          </SC.StyledTravelInfo>
        </SC.StyledShadow>
      )}
    </AnimatePresence>
  );
};

export default TravelInfo;
