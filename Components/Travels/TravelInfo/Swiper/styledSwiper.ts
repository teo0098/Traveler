import styled, { StyledComponent } from "styled-components";

export const StyledImage: StyledComponent<"div", any> = styled.div`
  position: relative;
  width: 100%;
  height: 400px;

  ${({ theme }) => theme.media.tablet} {
    height: 500px;
  }
`;

export const StyledImageDesc: StyledComponent<"div", any> = styled.div`
  padding: 5px 0;

  ${({ theme }) => theme.media.tablet} {
    padding: 5px 20px;
  }
`;
