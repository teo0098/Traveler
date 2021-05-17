import { FieldError, UseFormRegister } from "react-hook-form";

export interface InputsProps<Type> {
    register: UseFormRegister<Type>;
    ref?: React.RefObject<any>;
    error?: FieldError | undefined;
}

