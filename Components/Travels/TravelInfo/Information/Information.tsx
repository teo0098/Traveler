import React, { useContext } from "react";
import TravelInfoContext from "../../../../context/TravelInfoContext";
import moment from "moment";

import * as SC from "../styledTravelInfo";
import * as InformationSC from "./styledInformation";
import { InformationProps } from "./informationProps";

moment.locale("pl");

const Information: React.FC<InformationProps> = ({
  users,
  description,
  payAttention,
  startTime,
  endTime,
}) => {
  const { name } = useContext(TravelInfoContext);

  return (
    <InformationSC.StyledInformation>
      {name ? (
        <InformationSC.StyledName> {name} </InformationSC.StyledName>
      ) : null}
      {users.length > 0 ? (
        <section>
          <SC.StyledText>Użytkownicy oznaczeni</SC.StyledText>
          <InformationSC.StyledTaggedUsers>
            {users.map((user) => (
              <InformationSC.StyledTaggedUser key={user.id}>
                {user.username}
              </InformationSC.StyledTaggedUser>
            ))}
          </InformationSC.StyledTaggedUsers>
        </section>
      ) : null}
      {description ? (
        <section>
          <SC.StyledText>Opis wyprawy</SC.StyledText>
          <SC.StyledDesc>{description}</SC.StyledDesc>
        </section>
      ) : null}
      {payAttention ? (
        <section>
          <SC.StyledText>Zwróć uwagę !!!</SC.StyledText>
          <SC.StyledDesc>{payAttention}</SC.StyledDesc>
        </section>
      ) : null}
      {startTime !== "0000-00-00" ? (
        <section>
          <SC.StyledText>Data rozpoczęcia podróży</SC.StyledText>
          <SC.StyledDesc>
            {" "}
            {moment(+startTime).format("DD MMMM, YYYY")}{" "}
          </SC.StyledDesc>
        </section>
      ) : null}
      {endTime !== "0000-00-00" ? (
        <section>
          <SC.StyledText>Data zakończenia podróży</SC.StyledText>
          <SC.StyledDesc>
            {" "}
            {moment(+endTime).format("DD MMMM, YYYY")}{" "}
          </SC.StyledDesc>
        </section>
      ) : null}
    </InformationSC.StyledInformation>
  );
};

export default Information;
