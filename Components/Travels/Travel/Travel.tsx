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

moment.locale("pl");

const Travel: React.FC<ThemeInterface> = ({ theme }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { username, name, image_url, created_at } = useContext(
    TravelInfoContext
  );

  return (
    <SC.StyledTravel>
      <SC.StyledUserName> {username} </SC.StyledUserName>
      <SC.StyledImage>
        <Image layout="fill" src={image_url} alt="travel" objectFit="cover" />
      </SC.StyledImage>
      <Reaction />
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
    </SC.StyledTravel>
  );
};

export default withTheme(Travel);
