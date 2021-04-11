import styled, { StyledComponent } from 'styled-components'

export const StyledInputWrapper : StyledComponent<"div", any> = styled.div`
    display: grid;
    row-gap: 5px;
`

export const StyledLabel : StyledComponent<"label", any> = styled.label`
    font-size: 18px;
`

export const StyledInput : StyledComponent<"input", any> = styled.input`
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.dark};
`