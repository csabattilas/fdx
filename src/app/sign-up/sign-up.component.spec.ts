import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatButtonModule} from '@angular/material/button';
import {MATERIAL_SANITY_CHECKS} from '@angular/material/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of, Subject} from 'rxjs';
import {SharedModule} from '../shared/shared.module';
import {SignUpResultComponent} from './components/sign-up-result/sign-up-result.component';
import {SignUpFormService} from './services/sign-up-form.service';
import {SignUpService} from './services/sign-up.service';

import {SignUpComponent} from './sign-up.component';
import {SignUpResponse} from './sign-up.model';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
      ],
      declarations: [SignUpComponent, SignUpResultComponent],
      providers: [
        SignUpService,
        SignUpFormService,
        {
          provide: MATERIAL_SANITY_CHECKS, // to remove the annoying not theme warning.
          useValue: false
        }
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {set: {entryComponents: [SignUpResultComponent]}})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signup and open the dialog', () => {
    const signUpFormService: SignUpFormService = TestBed.inject(SignUpFormService);
    const signUpService: SignUpService = TestBed.inject(SignUpService);
    const matDialog: MatDialog = TestBed.inject(MatDialog);
    const matDialogCloseSubject: Subject<void> = new Subject();
    const mockSignUpResponse: SignUpResponse = {
      lastName: 'there',
      firstName: 'hello',
      email: 'e@mail',
      id: '1'
    };

    const matDialogRefMock = {
      afterClosed: () => matDialogCloseSubject,
      close: () => {
        matDialogCloseSubject.complete();
      }
    }

    jest.spyOn(matDialog, 'open').mockReturnValue(matDialogRefMock as unknown as MatDialogRef<SignUpResultComponent>); // forcing my stub

    jest.spyOn(signUpService, 'signUp').mockReturnValue(of(mockSignUpResponse));
    jest.spyOn(signUpFormService, 'isFormValid', 'get').mockReturnValue(true);
    jest.spyOn(signUpFormService, 'formData', 'get').mockReturnValue(
      {
        password: 'testTest',
        confirmPassword: 'testTest',
        lastName: 'there',
        firstName: 'hello',
        email: 'e@mail'
      });

    component.signup();

    expect(signUpService.signUp).toHaveBeenCalledWith({
      lastName: 'there',
      firstName: 'hello',
      email: 'e@mail'
    })

    expect(matDialog.open).toHaveBeenCalled();

    expect(component.signUpResponseDialogOpen).toBe(true);

    matDialogRefMock.close();

    expect(component.signUpResponseDialogOpen).toBe(false);
  })
});
