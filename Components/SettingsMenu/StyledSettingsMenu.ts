import styled, {StyledComponent} from "styled-components";
import theme from "../../styles/theme";
import {SettingsMenuType} from "./SettingsMenuType";

export const OptionsContainer : StyledComponent<"div", any> = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${theme.colors.lightDark};
`

export const SettingsOption : StyledComponent<"div", any> = styled.div<SettingsMenuType>`
  display: flex;
  background-color: ${theme.colors.darkerLight};
  padding: 10px;
  width: 250px;
  border-left: ${props => props.active ? '4px solid #212121' : '4px solid '+theme.colors.darkerLight};
  &:hover{
    background: ${theme.colors.gray};
    cursor: pointer;
  }
  &:not(.active):hover {
    border-left: 4px solid #969696;
  }
`