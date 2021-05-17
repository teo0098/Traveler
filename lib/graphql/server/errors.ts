export enum LoginErrors {
  WRONG_CREDENTIALS = "Złe dane logowania",
  NOT_LOGGED_IN = "Prosimy najpierw zalogować się na swoje konto",
}

export enum GlobalErrors {
  STH_WENT_WRONG = "Coś poszło nie tak... Spróbuj ponownie za jakiś czas",
}

export enum VerifyErrors {
  INVALID_HASH = "Błędny link aktywacyjny",
}

export enum ChangePasswordErrors {
  INVALID_PASSWORD = "Podane hasło jest nieprawidłowe!",
  INVALID_NEW_PASSWORD = "Password must contains at least: 8 characters, 1 uppercase & lowercase & number and special character",
}
