import styled, { StyledComponent } from 'styled-components'

export const StyledWrapper : StyledComponent<"section", any> = styled.section`
    display: grid;
    row-gap: 5px;
`

export const StyledImageWrapper : StyledComponent<"div", any> = styled.div`
    padding: 10px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.light};
    color: ${({ theme }) => theme.colors.dark};
    display: grid;
    justify-items: center;
    row-gap: 20px;
    position: relative;
`

interface StyledTextProps {
    error ?: string;
}

export const StyledText : StyledComponent<"span", any, StyledTextProps> = styled.span<StyledTextProps>`
    font-size: 18px;
    color: ${({ theme, error }) => error ? theme.colors.error : theme.colors.dark};
`

export const StyledImageUpload : StyledComponent<"div", any> = styled.div`
    text-align: center;
    display: grid;
    row-gap: 5px;
`

export const StyledImage : StyledComponent<"img", any> = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 5px;
`

export const StyledUploadIcon : StyledComponent<"div", any> = styled.div`
    & > * {
        width: 50px;
        height: 50px;
    }
`

export const StyledBox : StyledComponent<"div", any> = styled.div`
    position: relative;
`

export const StyledClose : StyledComponent<"div", any> = styled.div`
    position: absolute;
    z-index: 999;
    right: -10px;
    top: -10px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.dark};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    & > * {
        color: ${({ theme }) => theme.colors.light};
        width: 30px;
        height: 30px;
    }
`