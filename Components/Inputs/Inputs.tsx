import validator from "validator";
import { memo } from "react";

import * as SC from "./styledInputs";
import { InputsProps } from "./inputsProps";
import { FormValues as SigninFormValues } from "../Signin/formValues";
import { FormValues as SignupFormValues } from "../Signup/formValues";

export const LoginEmail: React.FC<InputsProps<SigninFormValues>> = memo(
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
  )
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
