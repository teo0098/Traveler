import { FieldError, UseFormRegister } from "react-hook-form";

import { FormValues } from "../Signin/formValues";

export interface InputsProps {
    register: UseFormRegister<FormValues>;
    error: FieldError | undefined;
}