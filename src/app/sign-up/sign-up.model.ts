import {FormGroup, ValidationErrors} from '@angular/forms';

export interface SignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type SignUpRequest = Omit<SignUp, 'password' | 'confirmPassword'>

export interface SignUpResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

type SignUpFormControl = FormControl & {
  value: string;
}

type SignUpPasswordFormControl = FormControl & {
  value: string;
  shown: boolean;
}

export interface SignUpFormControls {
  firstName: SignUpFormControl;
  lastName: SignUpFormControl;
  email: SignUpFormControl;
  password: SignUpPasswordFormControl;
  confirmPassword: SignUpPasswordFormControl
}

export type SignUpFormGroup = FormGroup & {
  value: SignUp,
  controls: SignUpFormControls,
  setValidators(validators: SignUpFormValidatorFn | SignUpFormValidatorFn[] | null): void;
}

export interface SignUpFormValidatorFn {
  (group: SignUpFormGroup): ValidationErrors | null
}
