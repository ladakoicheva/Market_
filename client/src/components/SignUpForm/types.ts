import type { SignInValues } from "../SignInForm/types";

export interface SignUpValuesI extends SignInValues {
  confirmPassword: string;
};