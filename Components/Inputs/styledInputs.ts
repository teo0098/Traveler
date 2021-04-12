import styled, { StyledComponent } from 'styled-components'

export const StyledInputWrapper : StyledComponent<"div", any> = styled.div`
    display: grid;
    row-gap: 5px;
`

interface StyledLabelProps {
    error : {} | undefined;
}

export const StyledLabel : StyledComponent<"label", any, StyledLabelProps> = styled.label<StyledLabelProps>`
    font-size: 18px;
    color: ${({ theme, error }) => error ? theme.colors.error : theme.colors.dark};
`

export const StyledInput : StyledComponent<"input", any> = styled.input`
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.dark};
`