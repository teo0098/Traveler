import styled, { StyledComponent } from 'styled-components'

export const Loader : StyledComponent<"div", any> = styled.div`
    display: inline-block;
    width: 80px;
    height: 80px;
    margin: 0 auto;

    ::after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        border: 6px solid #fff;
        border-color: ${({ theme }) => `${theme.colors.dark} transparent ${theme.colors.dark} transparent`};
        animation: lds-dual-ring 1.2s linear infinite;
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

`