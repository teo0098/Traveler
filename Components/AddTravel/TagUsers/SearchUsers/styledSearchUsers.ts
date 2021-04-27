import styled, { StyledComponent } from "styled-components";

export const StyledSearchUsers: StyledComponent<"div", any> = styled.div`
  background-color: ${({ theme }) => theme.colors.light};
  height: 200px;
  border-radius: 5px;
  padding: 10px;
`;

export const StyledResults: StyledComponent<"div", any> = styled.div`
  position: relative;
`;

export const StyledSection: StyledComponent<"section", any> = styled.section`
  padding: 10px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.dark}`};
  width: 100%;
`;

export const StyledUsers: StyledComponent<"div", any> = styled.div`
  background-color: ${({ theme }) => theme.colors.darkerLight};
  max-height: 140px;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledPickedUsers: StyledComponent<"div", any> = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  overflow-y: auto;
  height: 140px;
  padding: 5px 0;
`;

export const StyledUser: StyledComponent<"section", any> = styled.section`
  display: flex;
  background-color: ${({ theme }) => theme.colors.darkerLight};
  padding: 5px 10px;
  border-radius: 20px;
  margin: 5px 2px;
`;

export const StyledUserName: StyledComponent<"span", any> = styled.span`
  font-weight: bold;
  margin-right: 3px;
`;
