import * as CredentialsSC from "../Credentials/styledCredentials";

import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import Button from "../Button/Button";
import theme from "../../styles/theme";
import {useForm} from "react-hook-form";
import {FormValues} from "./formValues";
import {ChangeUsernameEmail, ChangeUsernameInput} from "../Inputs/Inputs";
import useChangeUsername from "../customHooks/useChangeUsername";

const ChangeUsername = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormValues>();
    const {
        handleOnSubmit,
        changeStatus: { loading, error },
    } = useChangeUsername();
    return (
        <>

            <CredentialsSC.StyledForm onSubmit={handleSubmit(handleOnSubmit)}>
                <CredentialsSC.StyledInputsWrapper>
                    <ChangeUsernameInput register={register} error={errors.username}/>
                    <ChangeUsernameEmail register={register} error={errors.email}/>
                </CredentialsSC.StyledInputsWrapper>
                {loading ? <Loader/> : null}
                {error ? <Error> {error.message} </Error> : null}
                <Button color={theme.colors.success}>Zmień nazwę</Button>
            </CredentialsSC.StyledForm>

        </>
    );
};

export default ChangeUsername;