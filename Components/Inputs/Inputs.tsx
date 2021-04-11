import * as SC from './styledInputs'

export const Email : React.FC = () => (
    <SC.StyledInputWrapper>
        <SC.StyledLabel htmlFor='email'>Adres e-mail</SC.StyledLabel>
        <SC.StyledInput name='email' id='email' type='text' />
    </SC.StyledInputWrapper>
)

export const Password : React.FC = () => (
    <SC.StyledInputWrapper>
        <SC.StyledLabel htmlFor='password'>Hasło</SC.StyledLabel>
        <SC.StyledInput name='password' id='password' type='password' />
    </SC.StyledInputWrapper>
)