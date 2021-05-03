import Image from "next/image";
import moment from "moment";
import { withTheme } from "styled-components";
import { Heart } from "react-feather";

import { TravelProps } from "./travelProps";
import * as SC from "./styledTravel";
import Button from "../../Button/Button";
import { useState } from "react";
import TravelInfo from "../TravelInfo/TravelInfo";

moment.locale("pl");

const Travel: React.FC<TravelProps> = ({ travel, theme }) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <SC.StyledTravel>
      <SC.StyledUserName> {travel.username} </SC.StyledUserName>
      <Image
        layout="intrinsic"
        src={travel.image_url}
        alt="travel"
        width={500}
        height={300}
      />
      <SC.StyledHeart>
        <Heart />
      </SC.StyledHeart>
      {travel.name ? <h2> {travel.name} </h2> : null}
      <span> {moment(+travel.created_at).fromNow()} </span>
      <SC.StyledButton>
        <Button
          handleOnClick={() => setVisible(true)}
          color={theme.colors.primary}
        >
          Szczegóły
        </Button>
      </SC.StyledButton>
      <TravelInfo setVisible={setVisible} travel={travel} visible={visible} />
    </SC.StyledTravel>
  );
};

export default withTheme(Travel);
