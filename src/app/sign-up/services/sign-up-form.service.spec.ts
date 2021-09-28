import {TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {SignUpFormGroup} from '../sign-up.model';
import {SignUpFormService} from './sign-up-form.service';

describe('SignUpFormService', () => {
  let service: SignUpFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule]
    });
    service = TestBed.inject(SignUpFormService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should return form value and should check for validity', () => {
    service['create']()
    const form: SignUpFormGroup = service['_form'];

    form.controls.firstName.setValue('hello');
    form.controls.lastName.setValue('there');
    form.controls.email.setValue('e@mail');
    form.controls.password.setValue('testTest');
    form.controls.confirmPassword.setValue('testTest');

    form.markAllAsTouched();

    expect(service.isFormValid).toBe(true);
    expect(service.formData).toEqual({
      firstName: 'hello',
      lastName: 'there',
      email: 'e@mail',
      password: 'testTest',
      confirmPassword: 'testTest',
    });
  })

  test('should be invalid when password are not matching', () => {
    service['create']()
    const form: SignUpFormGroup = service['_form'];

    form.markAllAsTouched();

    jest.spyOn(form.controls.password, 'setErrors');
    jest.spyOn(form.controls.confirmPassword, 'setErrors');

    form.controls.firstName.setValue('hello');
    form.controls.lastName.setValue('there');
    form.controls.email.setValue('e@mail');
    form.controls.password.setValue('testTEst');
    form.controls.confirmPassword.setValue('testTest');

    expect(service.isFormValid).toBe(false);
    expect(form.controls.password.setErrors).toHaveBeenCalledWith({passwordsDoNotMatch: true});
    expect(form.controls.confirmPassword.setErrors).toHaveBeenCalledWith({passwordsDoNotMatch: true});

    expect(form.controls.confirmPassword.errors).toEqual({passwordsDoNotMatch: true});
    expect(form.controls.password.errors).toEqual({passwordsDoNotMatch: true});

    jest.spyOn(form.controls.password, 'updateValueAndValidity');
    jest.spyOn(form.controls.confirmPassword, 'updateValueAndValidity');

    form.controls.password.setValue('testTest');
    form.controls.password.setValue('testTEst');
    form.controls.confirmPassword.setValue('testTEst');

    expect(form.controls.password.updateValueAndValidity).toHaveBeenCalledTimes(3); // there also system updates, not only my direct calls.
    expect(form.controls.confirmPassword.updateValueAndValidity).toHaveBeenCalledTimes(2);
  })

  test('should be invalid when password contains firstname', () => {
    service['create']()
    const form: SignUpFormGroup = service['_form'];

    form.markAllAsTouched();

    jest.spyOn(form.controls.password, 'setErrors');

    form.controls.firstName.setValue('hello');
    form.controls.password.setValue('testTestHello');

    expect(service.isFormValid).toBe(false);

    expect(form.controls.password.setErrors).toHaveBeenCalledWith({passwordContainsFirstName: true});

    form.controls.firstName.setValue('ola');

    expect(form.controls.password.errors).toEqual({passwordsDoNotMatch: true});
  });

  test('should be invalid when password contains last name', () => {
    service['create']();

    const form: SignUpFormGroup = service['_form'];

    form.markAllAsTouched();

    jest.spyOn(form.controls.password, 'setErrors');

    form.controls.lastName.setValue('there');
    form.controls.password.setValue('testTestThere');

    expect(service.isFormValid).toBe(false);

    expect(form.controls.password.setErrors).toHaveBeenCalledWith({passwordContainsLastName: true});

    form.controls.lastName.setValue('nowhere');

    expect(form.controls.password.errors).toEqual({passwordsDoNotMatch: true});
  })
});
