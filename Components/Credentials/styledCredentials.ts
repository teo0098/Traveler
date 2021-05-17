import styled, { StyledComponent } from 'styled-components'
import { CredentialsProps } from './credentialsProps'

export const StyledCredentials : StyledComponent<"div", any> = styled.div`
    background-image: url('/background.webp');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center top;
    height: 100px;

    ${({ theme }) => theme.media.largePhone} {
        height: 150px;
    }

    ${({ theme }) => theme.media.tablet} {
        height: 200px;
    }

    ${({ theme }) => theme.media.desktop} {
        height: 250px;
    }

    ${({ theme }) => theme.media.laptop} {
        height: 300px;
    }
`

export const StyledFormWrapper : StyledComponent<"div", any, CredentialsProps> = styled.div<CredentialsProps>`
    background-color: ${({ theme }) => theme.colors.darkerLight};
  padding: ${props => props.padding ? props.padding+"px" : '10px'};
    width: 90%;
    display: grid;
    row-gap: 30px;
    margin: 0 auto;
    transform: translateY(-40px);

    ${({ theme }) => theme.media.largePhone} {
        width: 400px;
        transform: translateY(-60px);
        padding: ${props => props.padding ? props.padding+"px" : '20px'};
    }

    ${({ theme }) => theme.media.tablet} {
        transform: translateY(-110px);
        grid-template-columns: ${({ single }) => single ? '100%' : '45% 45%'};
        justify-content: space-between;
        width: 90%;
      padding: ${props => props.padding ? props.padding+"px" : '30px'};
    }

    ${({ theme }) => theme.media.desktop} {
        transform: translateY(-140px);
        width: 900px;
      padding: ${props => props.padding ? props.padding+"px" : '40px'};
    }

    ${({ theme }) => theme.media.laptop} {
        transform: translateY(-180px);
        width: 900px;
      padding: ${props => props.padding ? props.padding+"px" : '50px'};
    }
`

export const StyledForm : StyledComponent<"form", any> = styled.form`
    display: grid;
    row-gap: 20px;
`

export const StyledP : StyledComponent<"p", any> = styled.p`
    font-size: 22px;
`

export const StyledSection : StyledComponent<"section", any> = styled.section`
    display: grid;
    row-gap: 10px;
    align-items: flex-start;
    align-content: center;
`

export const StyledInputsWrapper : StyledComponent<"div", any> = styled.div`
    display: grid;
    row-gap: 10px;
`