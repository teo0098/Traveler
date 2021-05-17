import * as CredentialsSC from "../Credentials/styledCredentials";

import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import Button from "../Button/Button";
import theme from "../../styles/theme";
import {useForm} from "react-hook-form";
import {FormValues} from "./formValues";
import useChangePassword from "../customHooks/useChangePassword";
import {ChangePasswordCurrent, ChangePasswordEmail, ChangePasswordNew} from "../Inputs/Inputs";

const ChangePassword = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormValues>();
    const {
        handleOnSubmit,
        changeStatus: { loading, error },
    } = useChangePassword();
    return (
        <>

                <CredentialsSC.StyledForm onSubmit={handleSubmit(handleOnSubmit)}>
                    <CredentialsSC.StyledInputsWrapper>
                     <ChangePasswordEmail register={register} error={errors.email}/>
                        <ChangePasswordCurrent register={register} error={errors.currentPassword}/>
                        <ChangePasswordNew register={register} error={errors.newPassword}/>
                    </CredentialsSC.StyledInputsWrapper>
                    {loading ? <Loader/> : null}
                    {error ? <Error> {error.message} </Error> : null}
                    <Button color={theme.colors.success}>Zmień hasło</Button>
                </CredentialsSC.StyledForm>

        </>
    );
};

export default ChangePassword;