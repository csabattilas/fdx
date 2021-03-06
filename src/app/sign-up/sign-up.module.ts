import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {SignUpComponent} from './sign-up.component';
import {SignUpResultComponent} from './components/sign-up-result/sign-up-result.component';

@NgModule({
  declarations: [
    SignUpComponent,
    SignUpResultComponent,
  ],
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    HttpClientModule,
  ],
})
export class SignUpModule {
}
