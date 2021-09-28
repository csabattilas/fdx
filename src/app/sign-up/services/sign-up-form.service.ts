import {FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {SignUp, SignUpFormControls, SignUpFormGroup, SignUpFormValidatorFn} from '../sign-up.model';
import {Injectable} from '@angular/core';

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

  public resetForm() {
    this._form.reset();
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
      this.passwordContainsFirstName,
      this.passwordContainsLastName,
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

  private passwordContainsFirstName: SignUpFormValidatorFn = (group: SignUpFormGroup): ValidationErrors | null => {
    const passwordControl = (group.controls as SignUpFormControls).password;
    const firstNameControl = (group.controls as SignUpFormControls).firstName;

    if (
      firstNameControl.value &&
      passwordControl.value?.toLowerCase().indexOf(firstNameControl.value.toLowerCase()) >= 0
    ) {
      passwordControl.setErrors({'passwordContainsFirstName': true})
    } else if (
      passwordControl.errors &&
      passwordControl.errors['passwordContainsFirstName']
    ) {
      passwordControl.updateValueAndValidity();
    }

    return null;
  }

  private passwordContainsLastName: SignUpFormValidatorFn = (group: SignUpFormGroup): ValidationErrors | null => {
    const passwordControl = (group.controls as SignUpFormControls).password;
    const lastNameControl = (group.controls as SignUpFormControls).lastName;

    if (
      lastNameControl.value &&
      passwordControl.value?.toLowerCase().indexOf(lastNameControl.value.toLowerCase()) >= 0
    ) {
      passwordControl.setErrors({'passwordContainsLastName': true})
    } else if (
      passwordControl.errors &&
      passwordControl.errors['passwordContainsLastName']
    ) {
      passwordControl.updateValueAndValidity()
    }

    return null;
  }
}
