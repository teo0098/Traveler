import validator from "validator";
import React, { memo } from "react";
import * as SC from './styledInputs'
import { InputsProps } from './inputsProps'
import { FormValues as SigninFormValues } from "../Signin/formValues"
import { FormValues as AddTravelFormValues } from '../AddTravel/formValues'
import {FormValues as SignupFormValues} from "../Signup/formValues"

export const LoginEmail : React.FC<InputsProps<SigninFormValues>> = ({ register, error }) => (
    <SC.StyledInputWrapper>
      <SC.StyledLabel error={error} htmlFor="email">
        {error ? error.message : "Adres e-mail"}
      </SC.StyledLabel>
      <SC.StyledInput
        {...register("email", {
          required: "Pole jest wymagane",
          validate: (value: string) => {
            if (!validator.isEmail(value)) return "Niepoprawny adres e-mail";
            return undefined;
          },
        })}
        id="email"
        type="text"
      />
    </SC.StyledInputWrapper>
)


export const LoginPassword: React.FC<InputsProps<SigninFormValues>> = memo(
  ({ register, error }) => (
    <SC.StyledInputWrapper>
      <SC.StyledLabel error={error} htmlFor="password">
        {error ? error.message : "Hasło"}
      </SC.StyledLabel>
      <SC.StyledInput
        {...register("password", { required: "Pole jest wymagane" })}
        id="password"
        type="password"
      />
    </SC.StyledInputWrapper>
))

export const TravelName : React.FC<InputsProps<AddTravelFormValues>> = ({ register, error }) => (
    <SC.StyledInputWrapper>
        <SC.StyledLabel error={error} htmlFor='travelName'>{error ? error.message : 'Nazwa'}</SC.StyledLabel>
        <SC.StyledInput placeholder='W nieznane...' {...register('travelName')} id='travelName' type='text' />
    </SC.StyledInputWrapper>
)

export const TravelDesc : React.FC<InputsProps<AddTravelFormValues>> = ({ register, error }) => (
    <SC.StyledInputWrapper>
        <SC.StyledLabel error={error} htmlFor='travelDesc'>{error ? error.message : 'Opis'}</SC.StyledLabel>
        <SC.StyledTextarea placeholder='Najlepsza podróż!!! #góry #wyprawa_zycia' {...register('travelDesc')} id='travelDesc'/>
    </SC.StyledInputWrapper>
)

interface ImageDescProps {
    name: string;
    dispatchDescChange : (desc : string | undefined | null) => void;
    value : string | undefined | null;
}

export const ImageDesc : React.FC<ImageDescProps> = ({ name, dispatchDescChange, value }) => (
    <SC.StyledInputWrapper>
        <SC.StyledLabel htmlFor={name}>Opis zdjęcia</SC.StyledLabel>
        <SC.StyledTextarea defaultValue={value ? value : ''} onBlur={e => dispatchDescChange(e.target.value)} border id={name}/>
    </SC.StyledInputWrapper>
);

export const RegisterPassword: React.FC<InputsProps<SignupFormValues>> = memo(
  ({ register, error }) => (
    <SC.StyledInputWrapper>
      <SC.StyledLabel error={error} htmlFor="password">
        {error ? error.message : "Hasło"}
      </SC.StyledLabel>
      <SC.StyledInput
        {...register("password", {
          required: "Pole jest wymagane",
          validate: (value: string) => {
            if (!validator.isStrongPassword(value))
              return "Hasło nie jest bezpieczne";
            return undefined;
          },
        })}
        id="password"
        type="password"
      />
    </SC.StyledInputWrapper>
  )
);

export const RegisterEmail: React.FC<InputsProps<SignupFormValues>> = memo(
  ({ register, error }) => (
    <SC.StyledInputWrapper>
      <SC.StyledLabel error={error} htmlFor="email">
        {error ? error.message : "Adres e-mail"}
      </SC.StyledLabel>
      <SC.StyledInput
        {...register("email", {
          required: "Pole jest wymagane",
          validate: (value: string) => {
            if (!validator.isEmail(value)) return "Niepoprawny adres e-mail";
            return undefined;
          },
        })}
        id="email"
        type="text"
      />
    </SC.StyledInputWrapper>
  )
);

export const RegisterUsername: React.FC<InputsProps<SignupFormValues>> = memo(
  ({ register, error }) => (
    <SC.StyledInputWrapper>
      <SC.StyledLabel error={error} htmlFor="username">
        {error ? error.message : "Nazwa użytkownika"}
      </SC.StyledLabel>
      <SC.StyledInput
        {...register("username", { required: "Pole jest wymagane" })}
        id="username"
        type="username"
      />
    </SC.StyledInputWrapper>
  )
);
