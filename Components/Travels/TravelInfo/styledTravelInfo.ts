import styled, { StyledComponent } from "styled-components";
import { motion } from "framer-motion";

export const StyledShadow = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.transparentDark};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledTravelInfo = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.light};
  overflow-y: auto;
  width: 100%;
  height: 100vh;

  ${({ theme }) => theme.media.tablet} {
    width: 90%;
    height: 90vh;
  }

  ${({ theme }) => theme.media.desktop} {
    width: 1000px;
    height: 95%;
  }
`;

export const StyledClose: StyledComponent<"div", any> = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  z-index: 1001;
  background-color: ${({ theme }) => theme.colors.light};

  & > * {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
`;

export const StyledDesc: StyledComponent<"pre", any> = styled.pre`
  padding: 0 10px;
  font-size: 18px;
`;

export const StyledText: StyledComponent<"span", any> = styled.span`
  font-size: 22px;
  font-weight: bold;
  padding: 0 10px;
`;

export const StyledPost: StyledComponent<"section", any> = styled.section`
  display: grid;
  padding: 5px 10px;
`;

export const StyledDate: StyledComponent<"span", any> = styled.span`
  font-size: 13px;
`;

export const StyledReaction: StyledComponent<"div", any> = styled.div`
  padding: 0 10px;

  ${({ theme }) => theme.media.tablet} {
    padding: 0 30px;
  }
`;
