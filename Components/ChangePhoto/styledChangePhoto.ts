import styled, { StyledComponent } from 'styled-components'

export const UserImage : StyledComponent<"img", any> = styled.img`
    height: 120px;
  width: 120px;
  border-radius: 100px;
`

export const Box : StyledComponent<"div", any> = styled.div`
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`