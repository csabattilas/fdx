import {SignUpFixtureTypes, SignUpFixtures} from '../fixtures/sign-up.model';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {e2e} from '../support/helper';

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

  it('should fill in sign up form with not matching password then I should see input validation error', () => {
    cy.get(e2e('button_reset')).click();
    cy.get(e2e('input_firstName')).should('have.value', '');

    cy.fillInSignUpForm(signUpFixtures[SignUpFixtureTypes.PASSWORD_DO_NOT_MATCH])

    cy.get(e2e('button_signup')).click();
    cy.contains('Password and confirm password do not match');

    cy.get(e2e('input_password')).clear();
    cy.get(e2e('input_password')).type('testTEst');

    cy.get(e2e('input_confirmPassword')).clear()
    cy.get(e2e('input_confirmPassword')).type('testTEst');

    cy.contains('Password and confirm password do not match').should('not.exist');
  });

  it('should fill in sign up form with invalid email then I should see input validation error', () => {
    cy.get(e2e('button_reset')).click();

    cy.fillInSignUpForm(signUpFixtures[SignUpFixtureTypes.INVALID_EMAIL])
    cy.contains('Enter valid email address');
  });

  it('should fill in sign up form with password matching first name then I should see input validation error', () => {
    cy.get(e2e('button_reset')).click();

    cy.fillInSignUpForm(signUpFixtures[SignUpFixtureTypes.PASSWORD_CONTAINS_FIRSTNAME]);
    cy.contains('Password cannot contain first name');

    cy.get(e2e('input_firstName')).clear().type('aaaaa')
    cy.contains('Password cannot contain first name').should('not.exist');
    cy.contains('Password and confirm password do not match');
  });
})
