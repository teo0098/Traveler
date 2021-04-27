import styled, { StyledComponent, css } from "styled-components";

const sharedStyles = css`
  display: grid;
  row-gap: 10px;
`;

export const StyledAddImage: StyledComponent<"div", any> = styled.div`
  display: flex;
  justify-content: center;

  & > * {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
`;

export const StyledDateUsers: StyledComponent<"div", any> = styled.div`
  ${sharedStyles};

  ${({ theme }) => theme.media.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: flex-start;
    column-gap: 10px;
  }
`;

export const StyledDate: StyledComponent<"div", any> = styled.div`
  ${sharedStyles};
`;

export const StyledStatus: StyledComponent<"div", any> = styled.div`
  display: grid;
  row-gap: 20px;

  ${({ theme }) => theme.media.tablet} {
    justify-items: center;
  }
`;
