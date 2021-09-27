import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {SignUp, SignUpFormControls, SignUpFormGroup, SignUpFormValidatorFn} from '../sign-up.model';

/**
 * As we needed some more complex validations for the passwords better we delegate the form creation / management to a service.
 * We could have used also maybe some form factory pattern but for this small example this level of abstraction will suffice.
 */

@Injectable({
  providedIn: 'root'
})
export class SignUpFormService {
  private _form!: SignUpFormGroup

  public get form(): SignUpFormGroup {
    return this._form;
  }

  public get formData(): SignUp {
    return this._form.value;
  }

  public get isFormValid(): boolean {
    return this._form.valid;
  }

  constructor(private formBuilder: FormBuilder) {
    this.create();
  }

  public markAllAsTouched(): void {
    this._form.markAllAsTouched();
  }

  private create(): void {
    this._form = this.formBuilder.group(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/[a-z][A-Z]/)]),
        confirmPassword: new FormControl('', Validators.required),
      } as SignUpFormControls
    ) as SignUpFormGroup;

    this._form.setValidators([
      this.passwordMatchingValidator,
      this.passwordCannotContainFirstName,
      this.passwordCannotContainLastName,
    ]);
  }

  private passwordMatchingValidator: SignUpFormValidatorFn = (group: SignUpFormGroup): ValidationErrors | null => {
    const passwordControl = (group.controls as SignUpFormControls).password;
    const confirmPasswordControl = (group.controls as SignUpFormControls).confirmPassword;

    if (
      passwordControl.touched &&
      confirmPasswordControl.touched &&
      passwordControl.value !== confirmPasswordControl.value
    ) {
      passwordControl.setErrors({passwordsDoNotMatch: true})
      confirmPasswordControl.setErrors({passwordsDoNotMatch: true})
    } else {
      if (passwordControl?.errors && passwordControl.errors['passwordsDoNotMatch']) {
        passwordControl.updateValueAndValidity();
      }

      if (confirmPasswordControl?.errors && confirmPasswordControl.errors['passwordsDoNotMatch']) {
        confirmPasswordControl.updateValueAndValidity();
      }
    }

    return null;
  }

  private passwordCannotContainFirstName: SignUpFormValidatorFn = (group: SignUpFormGroup): ValidationErrors | null => {
    const passwordControl = (group.controls as SignUpFormControls).password;
    const firstNameControl = (group.controls as SignUpFormControls).firstName;

    if (
      firstNameControl.value &&
      passwordControl.value?.toLowerCase().indexOf(firstNameControl.value.toLocaleLowerCase()) >= 0
    ) {
      passwordControl.setErrors({'passwordCannotContainFirstName': true})
    } else if (
      passwordControl.errors &&
      passwordControl.errors['passwordCannotContainFirstName']
    ) {
      passwordControl.updateValueAndValidity()
    }

    return null;
  }

  private passwordCannotContainLastName: SignUpFormValidatorFn = (group: SignUpFormGroup): ValidationErrors | null => {
    const passwordControl = (group.controls as SignUpFormControls).password;
    const lastNameControl = (group.controls as SignUpFormControls).lastName;

    if (
      lastNameControl.value &&
      passwordControl.value?.toLowerCase().indexOf(lastNameControl.value.toLocaleLowerCase()) >= 0
    ) {
      passwordControl.setErrors({'passwordCannotContainLastName': true})
    } else if (
      passwordControl.errors &&
      passwordControl.errors['passwordCannotContainLastName']
    ) {
      passwordControl.updateValueAndValidity()
    }

    return null;
  }
}
