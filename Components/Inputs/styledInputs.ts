import styled, { StyledComponent, css } from 'styled-components'

const sharedStyled = css`
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.dark};
`

export const StyledInputWrapper : StyledComponent<"div", any> = styled.div`
    display: grid;
    row-gap: 5px;
    width: 100%;
`

interface StyledLabelProps {
    error ?: {} | undefined;
}

export const StyledLabel : StyledComponent<"label", any, StyledLabelProps> = styled.label<StyledLabelProps>`
    font-size: 18px;
    color: ${({ theme, error }) => error ? theme.colors.error : theme.colors.dark};
`

export const StyledInput : StyledComponent<"input", any> = styled.input`
    ${sharedStyled};
`

interface StyledTextareaProps {
    border ?: boolean;
}

export const StyledTextarea : StyledComponent<"textarea", any, StyledTextareaProps> = styled.textarea<StyledTextareaProps>`
    ${sharedStyled};
    height: 100px;
    resize: none;
    border: ${({ theme, border }) => border ? `1px solid ${theme.colors.dark}` : 'none'};
`