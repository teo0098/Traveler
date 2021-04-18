import styled, { StyledComponent } from 'styled-components'

export const StyledAddImage : StyledComponent<"div", any> = styled.div`
    display: flex;
    justify-content: center;

    & > * {
        width: 50px;
        height: 50px;
        cursor: pointer;
    }
`