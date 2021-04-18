import { CredentialsProps } from './credentialsProps'
import * as SC from './styledCredentials'

const Credentials : React.FC<CredentialsProps> = ({ children, single }) => (
    <>
        <SC.StyledCredentials></SC.StyledCredentials>
        <SC.StyledFormWrapper single={single}>
            {children}
        </SC.StyledFormWrapper>
    </>
)

export default Credentials