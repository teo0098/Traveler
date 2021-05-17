import styled, { StyledComponent } from 'styled-components'
import theme from '../../../styles/theme'

export const SettingsBox : StyledComponent<"div", any> = styled.div`
    display: flex;
    background-color: ${theme.colors.darkerLight};
    height: 500px;
   width: 100%;
  position: absolute;
`

export const ContentBox : StyledComponent<"div", any> = styled.div`
    width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
    `