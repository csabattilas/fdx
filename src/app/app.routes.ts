import {Routes} from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';

export const APP_ROUTES: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: '**', redirectTo: '/sign-up'
  }
];
