import styled, { StyledComponent, css } from "styled-components";

const sharedStyled = css`
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.dark};
`;

export const StyledInputWrapper: StyledComponent<"div", any> = styled.div`
  display: grid;
  row-gap: 5px;
  width: 100%;
`;

export const StyledInputWrapperPhoto : StyledComponent<div, any> = styled.div`
  display: inline-block;
  position: relative;  
  cursor:pointer;
  color: ${theme.colors.primary};
  font-weight: 600;
  input[type="file"] {
    position: absolute;
    left: 0;
    opacity: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    cursor:pointer;
  }
`


interface StyledLabelProps {
  error?: {} | undefined;
}

export const StyledLabel: StyledComponent<
  "label",
  any,
  StyledLabelProps
> = styled.label<StyledLabelProps>`
  font-size: 18px;
  color: ${({ theme, error }) =>
    error ? theme.colors.error : theme.colors.dark};
`;

export const StyledInput: StyledComponent<"input", any> = styled.input`
  ${sharedStyled};
`;

interface StyledTextareaProps {
  border?: boolean;
}

export const StyledTextarea: StyledComponent<
  "textarea",
  any,
  StyledTextareaProps
> = styled.textarea<StyledTextareaProps>`
  ${sharedStyled};
  height: 100px;
  resize: none;
  border: ${({ theme, border }) =>
    border ? `1px solid ${theme.colors.dark}` : "none"};
`;

export const StyledVisibility: StyledComponent<"div", any> = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
`;

export const StyledCheckboxLabel: StyledComponent<"label", any> = styled(
  StyledLabel
)`
  cursor: pointer;
  user-select: none;
`;

export const StyledCheckbox: StyledComponent<"input", any> = styled.input`
  height: 30px;
  width: 30px;
  margin: 0 10px;

  ${({ theme }) => theme.media.largePhone} {
    height: 25px;
    width: 25px;
  }
`;

export const StyledSearchUsers: StyledComponent<"input", any> = styled(
  StyledInput
)`
  border: ${({ theme }) => `1px solid ${theme.colors.dark}`};
  width: 100%;
  padding: 5px;
`;
