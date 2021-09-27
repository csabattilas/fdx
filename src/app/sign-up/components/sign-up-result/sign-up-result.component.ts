import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SignUpService} from '../../services/sign-up.service';
import {SignUpResponse} from '../../sign-up.model';

@Component({
  selector: 'app-sign-up-result',
  templateUrl: './sign-up-result.component.html',
  styleUrls: ['./sign-up-result.component.scss']
})
export class SignUpResultComponent {
  errorMessage$ = this.signUpService.errorMessage$

  constructor(
    private readonly signUpService: SignUpService,
    @Inject(MAT_DIALOG_DATA) readonly signUp$: Observable<SignUpResponse>,
  ) {
  }
}
