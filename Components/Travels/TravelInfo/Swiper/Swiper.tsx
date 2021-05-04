import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import * as SC from "../styledTravelInfo";
import { SwiperProps } from "./swiperProps";
import * as SwiperSC from "./styledSwiper";

SwiperCore.use([Pagination, Navigation]);

const SwiperComponent: React.FC<SwiperProps> = ({ images }) => {
  return (
    <Swiper
      pagination={{
        type: "progressbar",
      }}
      navigation={true}
      className="mySwiper"
    >
      {images.map((img) => (
        <SwiperSlide key={img.image_url}>
          <section>
            <SwiperSC.StyledImage>
              <Image
                layout="fill"
                src={img.image_url}
                alt="travel"
                objectFit="cover"
              />
            </SwiperSC.StyledImage>
            <SwiperSC.StyledImageDesc>
              <SC.StyledDesc>{img.image_desc}</SC.StyledDesc>
            </SwiperSC.StyledImageDesc>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
