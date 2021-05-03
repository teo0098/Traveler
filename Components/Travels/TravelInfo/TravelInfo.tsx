import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { XCircle } from "react-feather";
import Skeleton from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import { variants } from "./animationVariants";
import * as SC from "./styledTravelInfo";
import useTravelInfo from "../../customHooks/useTravelInfo";
import { TravelInfoProps } from "./travelInfoProps";
import { TravelType } from "../../../types/TravelType";

SwiperCore.use([Pagination, Navigation]);

const TravelInfo: React.FC<TravelInfoProps> = ({
  visible,
  travel,
  setVisible,
}) => {
  const { travel: travelInfo } = useTravelInfo(visible, travel.id);

  return (
    <AnimatePresence>
      {visible && (
        <SC.StyledTravelInfo
          variants={variants}
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
          {!travelInfo.loading && !travelInfo.error && travelInfo.called ? (
            <div>
              <Swiper
                pagination={{
                  type: "progressbar",
                }}
                navigation={true}
                className="mySwiper"
              >
                {(travelInfo.data.travel as TravelType).images.map((img) => (
                  <SwiperSlide key={img.image_url}>
                    <section>
                      <Image
                        layout="intrinsic"
                        src={img.image_url}
                        alt="travel"
                        width={500}
                        height={300}
                      />
                      <SC.StyledDesc>
                        <pre>{img.image_desc}</pre>
                      </SC.StyledDesc>
                    </section>
                  </SwiperSlide>
                ))}
              </Swiper>
              {(travelInfo.data.travel as TravelType).users.length > 0 ? (
                <>
                  <SC.StyledText>Użytkownicy oznaczeni</SC.StyledText>
                  {(travelInfo.data.travel as TravelType).users?.map((user) => (
                    <p> {user.username} </p>
                  ))}
                </>
              ) : null}
              {travelInfo.data.travel.description ? (
                <>
                  <SC.StyledText>Opis wyprawy</SC.StyledText>
                  <SC.StyledDesc>
                    <pre>{travelInfo.data.travel.description}</pre>
                  </SC.StyledDesc>
                </>
              ) : null}
              {travelInfo.data.travel.payAttention ? (
                <>
                  <SC.StyledText>Zwróć uwagę...</SC.StyledText>
                  <SC.StyledDesc>
                    <pre>{travelInfo.data.travel.payAttention}</pre>
                  </SC.StyledDesc>
                </>
              ) : null}
              {travelInfo.data.travel.startTime !== "0000-00-00" ? (
                <>
                  <SC.StyledText>Data rozpoczęcia podróży</SC.StyledText>
                  <SC.StyledDesc>
                    {" "}
                    {travelInfo.data.travel.startTime}{" "}
                  </SC.StyledDesc>
                </>
              ) : null}
              {travelInfo.data.travel.endTime !== "0000-00-00" ? (
                <>
                  <SC.StyledText>Data zakończenia podróży</SC.StyledText>
                  <SC.StyledDesc>
                    {" "}
                    {travelInfo.data.travel.endTime}{" "}
                  </SC.StyledDesc>
                </>
              ) : null}
            </div>
          ) : null}
        </SC.StyledTravelInfo>
      )}
    </AnimatePresence>
  );
};

export default TravelInfo;
