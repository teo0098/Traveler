import styled, { StyledComponent } from 'styled-components'

export const StyledFooter : StyledComponent<"footer", any> = styled.footer`
    background-color: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.light};
    height: 60px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
`