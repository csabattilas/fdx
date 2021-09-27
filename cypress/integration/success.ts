import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SignUpFixtures, SignUpFixtureTypes} from '../fixtures/sign-up.model';
import {e2e} from '../support/helper';

// for sake of simplicity will keep just one spec
describe('My First Test', () => {
  let signUpFixtures: SignUpFixtures;
  before(() => {
    cy.fixture('sign-up.fixture').then((data) => {
      signUpFixtures = data;
    })
  })

  it('Visits the initial project page', () => {
    const r = CommonModule;
    const c = ReactiveFormsModule

    cy.visit('/')
    cy.contains('Sign up')

  })

  it('should fill in sign up form with valid values then after successful submit should show the dialog', () => {
    cy.fillInSignUpForm(signUpFixtures[SignUpFixtureTypes.VAlID])
    cy.get(e2e('button_signup')).click();
    cy.contains('Sign up successful'); // waiting that much so if there is network pending will finish with error i can still finish the round-trip
  });
})
