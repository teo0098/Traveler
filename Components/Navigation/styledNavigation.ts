import styled, { StyledComponent } from 'styled-components'

export const StyledNavigation : StyledComponent<"header", any> = styled.header`
    height: 70px;
    background-color: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.light};
`