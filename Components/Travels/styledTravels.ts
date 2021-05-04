import styled, { StyledComponent } from "styled-components";

export const StyledTravels: StyledComponent<"div", any> = styled.div`
  padding: 20px 10px;
  display: grid;
  row-gap: 30px;
  color: ${({ theme }) => theme.colors.dark};
  grid-template-columns: 100%;
  justify-content: center;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 80%;
  }

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: 1000px;
  }
`;
