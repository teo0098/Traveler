import validator from 'validator'
import { memo } from 'react'

import * as SC from './styledInputs'
import { InputsProps } from './inputsProps'

export const LoginEmail : React.FC<InputsProps> = memo(({ register, error }) => (
    <SC.StyledInputWrapper>
        <SC.StyledLabel error={error} htmlFor='email'>{error ? error.message : 'Adres e-mail'}</SC.StyledLabel>
        <SC.StyledInput {...register('email', { required: 'Pole jest wymagane', validate: (value : string) => {
            if (!validator.isEmail(value)) return 'Niepoprawny adres e-mail'
            return undefined
        }})} 
        id='email' type='text' />
    </SC.StyledInputWrapper>
))

export const LoginPassword : React.FC<InputsProps> = memo(({ register, error }) => (
    <SC.StyledInputWrapper>
        <SC.StyledLabel error={error} htmlFor='password'>{error ? error.message : 'Hasło'}</SC.StyledLabel>
        <SC.StyledInput {...register('password', { required: 'Pole jest wymagane' })} id='password' type='password' />
    </SC.StyledInputWrapper>
))