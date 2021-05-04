import styled, { StyledComponent } from "styled-components";

export const StyledTravel: StyledComponent<"section", any> = styled.section`
  display: grid;
  row-gap: 5px;
  justify-items: flex-start;
`;

export const StyledUserName: StyledComponent<"span", any> = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

export const StyledButton: StyledComponent<"div", any> = styled.div`
  margin-top: 10px;
`;

export const StyledDate: StyledComponent<"span", any> = styled.span`
  font-size: 16px;
`;

export const StyledImage: StyledComponent<"div", any> = styled.div`
  position: relative;
  width: 100%;
  height: 300px;

  ${({ theme }) => theme.media.desktop} {
    height: 400px;
  }
`;
