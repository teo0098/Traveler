import * as SC from './styledError'

const Error : React.FC = ({ children }) => (
    <SC.StyledError>
        {children}
    </SC.StyledError>
)

export default Error