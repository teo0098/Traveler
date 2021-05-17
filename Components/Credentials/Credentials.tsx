import { CredentialsProps } from './credentialsProps'
import * as SC from './styledCredentials'

const Credentials : React.FC<CredentialsProps> = ({ children, single, padding}) => (
    <>
        <SC.StyledCredentials></SC.StyledCredentials>
        <SC.StyledFormWrapper single={single} padding={padding}>
            {children}
        </SC.StyledFormWrapper>
    </>
)

export default Credentials