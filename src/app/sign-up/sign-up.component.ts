import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {SignUpFormGroup, SignUpRequest, SignUpResponse} from './sign-up.model';
import {MatDialog} from '@angular/material/dialog';
import {SignUpFormService} from './services/sign-up-form.service';
import {SignUpResultComponent} from './components/sign-up-result/sign-up-result.component';
import {SignUpService} from './services/sign-up.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  signUpForm!: SignUpFormGroup;
  signUpResponseDialogOpen = false;

  constructor(
    private readonly signUpFormService: SignUpFormService,
    private readonly signUpService: SignUpService,
    private readonly cdr: ChangeDetectorRef,
    private readonly matDialog: MatDialog,
  ) {
    this.signUpForm = signUpFormService.form;
  }

  signup(): void {
    this.signUpFormService.markAllAsTouched();

    // "(de)construct" request data
    const {password, confirmPassword, ...signUpRequest} = this.signUpFormService.formData;

    if (this.signUpFormService.isFormValid) {
      this.openSuccessDialog(signUpRequest);
    }
  }

  private openSuccessDialog(signUpRequest: SignUpRequest): void {
    this.signUpResponseDialogOpen = true;
    this.matDialog.open <SignUpResultComponent, Observable<SignUpResponse>>(
      SignUpResultComponent,
      {
        width: '50vw',
        data: this.signUpService.signUp(signUpRequest),
        disableClose: true,
      }
    ).afterClosed().pipe(
      finalize(() => {
        this.signUpResponseDialogOpen = false;
        this.signUpFormService.resetForm()
      })).subscribe();
  }
}
