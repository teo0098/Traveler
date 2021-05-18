import Image from "next/image";
import moment from "moment";
import { withTheme } from "styled-components";
import { useContext, useState } from "react";

import * as SC from "./styledTravel";
import Button from "../../Button/Button";
import TravelInfo from "../TravelInfo/TravelInfo";
import { ThemeInterface } from "../../../interfaces/themeInterface";
import TravelInfoContext from "../../../context/TravelInfoContext";
import Reaction from "../Reaction/Reaction";
import TravelLikesContext from "../../../context/TravelLikesContext";

moment.locale("pl");

const Travel: React.FC<ThemeInterface> = ({ theme }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { username, name, image_url, created_at, id, userLikes } = useContext(
    TravelInfoContext
  );
  const [travelLiked, setTravelLiked] = useState<boolean>(
    userLikes > 0 ? true : false
  );

  return (
    <SC.StyledTravel>
      <SC.StyledUserName> {username} </SC.StyledUserName>
      <SC.StyledImage>
        <Image layout="fill" src={image_url} alt="travel" objectFit="cover" />
      </SC.StyledImage>
      <TravelLikesContext.Provider
        value={{ travelLiked, setTravelLiked: setTravelLiked }}
      >
        <Reaction travelID={id} />
        <div>
          {name ? <h2> {name} </h2> : null}
          <SC.StyledDate> {moment(+created_at).fromNow()} </SC.StyledDate>
        </div>
        <SC.StyledButton>
          <Button
            handleOnClick={() => setVisible(true)}
            color={theme.colors.primary}
          >
            Szczegóły
          </Button>
        </SC.StyledButton>
        <TravelInfo setVisible={setVisible} visible={visible} />
      </TravelLikesContext.Provider>
    </SC.StyledTravel>
  );
};

export default withTheme(Travel);
