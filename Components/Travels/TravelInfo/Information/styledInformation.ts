import styled, { StyledComponent } from "styled-components";

export const StyledInformation: StyledComponent<
  "section",
  any
> = styled.section`
  display: grid;
  row-gap: 20px;
  padding: 10px 0 30px 0;

  ${({ theme }) => theme.media.tablet} {
    padding: 10px 20px 30px 20px;
  }
`;

export const StyledName: StyledComponent<"h2", any> = styled.h2`
  padding: 0 10px;
`;

export const StyledTaggedUsers: StyledComponent<"div", any> = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
`;

export const StyledTaggedUser: StyledComponent<"span", any> = styled.span`
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.darkerLight};
  padding: 5px 10px;
  border-radius: 20px;
  margin: 5px;
`;
