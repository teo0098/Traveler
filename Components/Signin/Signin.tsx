import { withTheme } from 'styled-components'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import Button from '../Button/Button'
import Credentials from '../Credentials/Credentials'
import * as CredentialsSC from '../Credentials/styledCredentials'
import { LoginEmail, LoginPassword } from '../Inputs/Inputs'
import { FormValues } from './formValues'
import useSignin from '../customHooks/useSignin'
import Loader from '../Loader/Loader'
import Error from '../Error/Error'
import { ThemeInterface } from '../../interfaces/themeInterface'

const Signin : React.FC<ThemeInterface> = ({ theme }) => {

    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
    const { handleOnSubmit, loginStatus: { loading, error } } = useSignin()

    return (
        <Credentials>
            <CredentialsSC.StyledForm onSubmit={handleSubmit(handleOnSubmit)}>
                <CredentialsSC.StyledInputsWrapper>
                    <LoginEmail register={register} error={errors.email} />
                    <LoginPassword register={register} error={errors.password} />
                </CredentialsSC.StyledInputsWrapper>
                {loading ? <Loader /> : null}
                {error ? <Error> {error.message} </Error> : null}
                <Button color={theme.colors.success}>Zaloguj się</Button>
            </CredentialsSC.StyledForm>
            <CredentialsSC.StyledSection>
                <CredentialsSC.StyledP>Nie masz jeszcze konta? Nie zwlekaj, przejdź do strony rejestracji!</CredentialsSC.StyledP>
                <Button handleOnClick={() => router.push('/signup')} color={theme.colors.primary}>Zarejestruj się</Button>
            </CredentialsSC.StyledSection>
        </Credentials>
    )
} 

export default withTheme(Signin)