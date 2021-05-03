import styled, { StyledComponent } from "styled-components";
import { motion } from "framer-motion";

export const StyledTravelInfo = styled(motion.div)`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.light};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
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

export const StyledDesc: StyledComponent<"p", any> = styled.p`
  padding: 10px;
  font-size: 18px;
`;

export const StyledText: StyledComponent<"span", any> = styled.span`
  font-size: 22px;
  font-weight: bold;
  padding: 10px;
`;
