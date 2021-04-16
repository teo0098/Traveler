import * as SC from './styledButton'

const Button : React.FC<{ color: string, handleOnClick ?: any }> = ({ children, color, handleOnClick }) => (
    <SC.StyledButton onClick={handleOnClick} color={color}>
        {children}
    </SC.StyledButton>
)

export default Button