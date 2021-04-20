import styled, { StyledComponent } from 'styled-components'

export const StyledSuccess : StyledComponent<"div", any> = styled.div`
    border: ${({ theme }) => `2px solid ${theme.colors.success}`};
    color: ${({ theme }) => theme.colors.success};
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    font-size: 18px;
`