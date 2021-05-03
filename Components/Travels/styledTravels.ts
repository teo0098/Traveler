import styled, { StyledComponent } from "styled-components";

export const StyledTravels: StyledComponent<"div", any> = styled.div`
  padding: 20px 10px;
  display: grid;
  row-gap: 30px;
  color: ${({ theme }) => theme.colors.dark};
`;
