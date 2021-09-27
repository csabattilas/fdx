import {SignUpFixture} from '../../fixtures/sign-up.model';
import {e2e} from '../helper';

export const fillInSignUpForm = (fixtureData: SignUpFixture) => {
  Object.keys(fixtureData).forEach((key) => {
    const value: string = fixtureData[key as keyof SignUpFixture];
    cy.get(e2e(`input_${key}`)).type(value);
  })
}
