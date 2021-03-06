import validator from "validator";
import React, { memo } from "react";
import * as SC from './styledInputs'
import { InputsProps } from './inputsProps'
import { FormValues as SigninFormValues } from "../Signin/formValues"
import { FormValues as AddTravelFormValues } from '../AddTravel/formValues'
import {FormValues as SignupFormValues} from "../Signup/formValues"
import {FormValues as ChangePhotoValues} from "../ChangePhoto/formValues"

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

export const LoginEmail: React.FC<InputsProps<SigninFormValues>> = ({
  register,
  error,
}) => (
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

export const TravelName: React.FC<InputsProps<AddTravelFormValues>> = ({
  register,
  error,
}) => (
  <SC.StyledInputWrapper>
    <SC.StyledLabel error={error} htmlFor="travelName">
      {error ? error.message : "Nazwa"}
    </SC.StyledLabel>
    <SC.StyledInput
      placeholder="W nieznane..."
      {...register("travelName", {
        validate: (value: string) => {
          if (value.trim().length > 50)
            return "Nazwa musi zawierać maksymalnie 50 znaków";
          return undefined;
        },
      })}
      id="travelName"
      type="text"
    />
  </SC.StyledInputWrapper>
);

export const TravelDesc: React.FC<InputsProps<AddTravelFormValues>> = ({
  register,
  error,
}) => (
  <SC.StyledInputWrapper>
    <SC.StyledLabel error={error} htmlFor="travelDesc">
      {error ? error.message : "Opis"}
    </SC.StyledLabel>
    <SC.StyledTextarea
      placeholder="Najlepsza podróż!!! #góry #wyprawa_zycia"
      {...register("travelDesc")}
      id="travelDesc"
    />
  </SC.StyledInputWrapper>
);

interface ImageDescProps {
  name: string;
  dispatchDescChange: (desc: string | undefined | null) => void;
  value: string | undefined | null;
}

export const ImageDesc: React.FC<ImageDescProps> = ({
  name,
  dispatchDescChange,
  value,
}) => (
  <SC.StyledInputWrapper>
    <SC.StyledLabel htmlFor={name}>Opis zdjęcia</SC.StyledLabel>
    <SC.StyledTextarea
      defaultValue={value ? value : ""}
      onBlur={(e) => dispatchDescChange(e.target.value)}
      border
      id={name}
    />
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

export const UploadAvatar : React.FC<InputsProps<ChangePhotoValues>> = ({ register, ref }) => (
    <SC.StyledInputWrapperPhoto>
        <SC.StyledInput
            {...register("file", { required: "Pole jest wymagane" })}
            id="file"
            type="file"
            ref={ref}
        />
        Dodaj zdjęcie profilowe
    </SC.StyledInputWrapperPhoto>
)

export const ChangePasswordEmail: React.FC<InputsProps<SignupFormValues>> = memo(
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

export const ChangePasswordCurrent: React.FC<InputsProps<SignupFormValues>> = memo(
    ({ register, error }) => (
        <SC.StyledInputWrapper>
            <SC.StyledLabel error={error} htmlFor="currentPassword">
                {error ? error.message : "Aktualne hasło"}
            </SC.StyledLabel>
            <SC.StyledInput
                {...register("currentPassword", {
                    required: "Pole jest wymagane",
                    validate: (value: string) => {
                        if (!validator.isStrongPassword(value))
                            return "Hasło nie jest bezpieczne";
                        return undefined;
                    },
                })}
                id="currentPassword"
                type="password"
            />
        </SC.StyledInputWrapper>
    )
);

export const ChangePasswordNew: React.FC<InputsProps<SignupFormValues>> = memo(
    ({ register, error }) => (
        <SC.StyledInputWrapper>
            <SC.StyledLabel error={error} htmlFor="newPassword">
                {error ? error.message : "Nowe hasło"}
            </SC.StyledLabel>
            <SC.StyledInput
                {...register("newPassword", {
                    required: "Pole jest wymagane",
                    validate: (value: string) => {
                        if (!validator.isStrongPassword(value))
                            return "Hasło nie jest bezpieczne";
                        return undefined;
                    },
                })}
                id="newPassword"
                type="password"
            />
        </SC.StyledInputWrapper>
    )
);

export const ChangeUsernameInput: React.FC<InputsProps<SignupFormValues>> = memo(
    ({ register, error }) => (
        <SC.StyledInputWrapper>
            <SC.StyledLabel error={error} htmlFor="username">
                {error ? error.message : "Nazwa użytkownika"}
            </SC.StyledLabel>
            <SC.StyledInput
                {...register("username", { required: "Pole jest wymagane" })}
                id="changeUsername"
                type="username"
            />
        </SC.StyledInputWrapper>
    )
);

export const ChangeUsernameEmail: React.FC<InputsProps<SignupFormValues>> = memo(
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

export const TravelVisibility: React.FC<InputsProps<AddTravelFormValues>> = ({
  register,
}) => (
  <SC.StyledVisibility>
    <SC.StyledCheckboxLabel htmlFor="travelPrivate">
      Ta podróż ma być widoczna tylko dla mnie
    </SC.StyledCheckboxLabel>
    <SC.StyledCheckbox
      type="checkbox"
      {...register("travelPrivate")}
      id="travelPrivate"
    />
  </SC.StyledVisibility>
);

export const TravelPayAttention: React.FC<InputsProps<AddTravelFormValues>> = ({
  register,
  error,
}) => (
  <SC.StyledInputWrapper>
    <SC.StyledLabel error={error} htmlFor="travelPayAttention">
      {error ? error.message : "Warto wiedzieć"}
    </SC.StyledLabel>
    <SC.StyledTextarea
      placeholder="Pamietaj aby się dobrze ubrać... i wziąć duuuuużo wody"
      {...register("travelPayAttention")}
      id="travelPayAttention"
    />
  </SC.StyledInputWrapper>
);

export const TravelStartTime: React.FC<InputsProps<AddTravelFormValues>> = ({
  register,
}) => (
  <SC.StyledInputWrapper>
    <SC.StyledLabel htmlFor="travelStartTime">Start wyprawy</SC.StyledLabel>
    <SC.StyledInput
      {...register("travelStartTime")}
      id="travelStartTime"
      type="date"
    />
  </SC.StyledInputWrapper>
);

export const TravelEndTime: React.FC<InputsProps<AddTravelFormValues>> = ({
  register,
}) => (
  <SC.StyledInputWrapper>
    <SC.StyledLabel htmlFor="travelEndTime">Koniec wyprawy</SC.StyledLabel>
    <SC.StyledInput
      {...register("travelEndTime")}
      id="travelEndTime"
      type="date"
    />
  </SC.StyledInputWrapper>
);

interface SearchUsersInputProps {
  search: (users: string) => void;
  handleOnBlur: () => void;
}

export const SearchUsersInput: React.FC<SearchUsersInputProps> = ({
  search,
  handleOnBlur,
}) => (
  <SC.StyledSearchUsers
    onChange={(e) => search(e.target.value)}
    onBlur={handleOnBlur}
    placeholder="User123"
  />
);
