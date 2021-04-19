import { ButtonProps } from './buttonProps'
import * as SC from './styledButton'

const Button : React.FC<ButtonProps> = ({ children, color, handleOnClick, type }) => (
    <SC.StyledButton type={type} onClick={handleOnClick} color={color}>
        {children}
    </SC.StyledButton>
)

export default Button