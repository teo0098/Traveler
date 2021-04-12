import styled, { StyledComponent } from 'styled-components'

export const StyledError : StyledComponent<"div", any> = styled.div`
    border: ${({ theme }) => `2px solid ${theme.colors.error}`};
    color: ${({ theme }) => theme.colors.error};
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    font-size: 18px;
`