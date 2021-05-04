import styled, { StyledComponent } from "styled-components";

export const StyledReaction: StyledComponent<"div", any> = styled.div`
  & > * {
    width: 30px;
    height: 30px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.error};
  }
`;
