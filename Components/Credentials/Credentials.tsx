import * as SC from './styledCredentials'

const Credentials : React.FC = ({ children }) => (
    <>
        <SC.StyledCredentials></SC.StyledCredentials>
        <SC.StyledFormWrapper>
            {children}
        </SC.StyledFormWrapper>
    </>
)

export default Credentials