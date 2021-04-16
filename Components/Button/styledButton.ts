import styled, { StyledComponent } from 'styled-components'

interface StyledButtonProps {
    color : string;
    fontSize ?: string;
    textColor ?: string;
}

export const StyledButton : StyledComponent<"button", any, StyledButtonProps> = styled.button<StyledButtonProps>`
    background-color: ${({ color }) => color};
    padding: 10px;
    border-radius: 5px;
    outline: none;
    border: none;
    font-size: ${({ fontSize }) => fontSize ? fontSize : '20px'};
    color: ${({ theme, textColor }) => textColor ? textColor : theme.colors.light};
    cursor: pointer;
`