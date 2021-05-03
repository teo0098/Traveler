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

export const StyledHeart: StyledComponent<"div", any> = styled.div`
  & > * {
    width: 30px;
    height: 30px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const StyledButton: StyledComponent<"div", any> = styled.div`
  margin-top: 10px;
`;
