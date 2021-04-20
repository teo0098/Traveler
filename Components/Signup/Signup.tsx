import { useForm } from "react-hook-form";

import Button from "../Button/Button";
import Credentials from "../Credentials/Credentials";
import * as CredentialsSC from "../Credentials/styledCredentials";
import {
  RegisterEmail,
  RegisterPassword,
  RegisterUsername,
} from "../Inputs/Inputs";

import useSignin from "../customHooks/useSignup";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { FormValues } from "./formValues";
import { useRouter } from "next/router";
import { withTheme } from "styled-components";

const Signup: React.FC<{ theme: { [key: string]: any } }> = ({ theme }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const {
    handleOnSubmit,
    signupStatus: { loading, error },
  } = useSignin();
  const router = useRouter();
  return (
    <Credentials>
      <CredentialsSC.StyledForm onSubmit={handleSubmit(handleOnSubmit)}>
        <CredentialsSC.StyledInputsWrapper>
          <RegisterUsername register={register} error={errors.username} />
          <RegisterEmail register={register} error={errors.email} />
          <RegisterPassword register={register} error={errors.password} />
        </CredentialsSC.StyledInputsWrapper>
        {loading ? <Loader /> : null}
        {error ? <Error> {error.message} </Error> : null}
        <Button color={theme.colors.success}>Zarejestruj się</Button>
      </CredentialsSC.StyledForm>
      <CredentialsSC.StyledSection>
        <CredentialsSC.StyledP>
          Masz już konto? Przejdź do logowania!
        </CredentialsSC.StyledP>
        <Button
          handleOnClick={() => router.push("/signin")}
          color={theme.colors.primary}
        >
          Zaloguj się
        </Button>
      </CredentialsSC.StyledSection>{" "}
    </Credentials>
  );
};
export default withTheme(Signup);
