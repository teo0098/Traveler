import styled, { StyledComponent } from "styled-components";

interface StyledReactionProps {
  travelLiked: boolean;
}

export const StyledReaction: StyledComponent<
  "div",
  any,
  StyledReactionProps
> = styled.div<StyledReactionProps>`
  display: grid;
  grid-template-columns: repeat(2, min-content);
  column-gap: 5px;
  align-items: center;
  justify-items: flex-start;

  & > *:nth-child(1) {
    width: 30px;
    height: 30px;
    cursor: pointer;
    color: ${({ theme, travelLiked }) =>
      travelLiked ? theme.colors.success : theme.colors.error};
  }
`;

export const StyledLikes: StyledComponent<"span", any> = styled.span`
  font-weight: bold;
  font-size: 20px;
`;
