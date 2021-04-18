import { FieldError, UseFormRegister } from "react-hook-form";

export interface InputsProps<Type> {
  register: UseFormRegister<Type>;
  error: FieldError | undefined;
}
