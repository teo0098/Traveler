import { withTheme } from 'styled-components'
import { useRouter } from 'next/router'

import Button from '../Button/Button'
import Credentials from '../Credentials/Credentials'
import * as CredentialsSC from '../Credentials/styledCredentials'
import { Email, Password } from '../Inputs/Inputs'

const Signin : React.FC<{theme : {[key : string] : any}}> = ({ theme }) => {

    const { push } = useRouter()

    return (
        <Credentials>
            <CredentialsSC.StyledForm>
                <CredentialsSC.StyledInputsWrapper>
                    <Email />
                    <Password />
                </CredentialsSC.StyledInputsWrapper>
                <Button color={theme.colors.success}>Zaloguj się</Button>
            </CredentialsSC.StyledForm>
            <CredentialsSC.StyledSection>
                <CredentialsSC.StyledP>Nie masz jeszcze konta? Nie zwlekaj, przejdź do strony rejestracji!</CredentialsSC.StyledP>
                <Button handleOnClick={() => push('/signup')} color={theme.colors.primary}>Zarejestruj się</Button>
            </CredentialsSC.StyledSection>
        </Credentials>
    )
} 

export default withTheme(Signin)