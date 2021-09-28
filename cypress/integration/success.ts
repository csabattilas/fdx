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

  it('should fill in sign up form with valid values then after successful submit should show the dialog', () => {
    cy.fillInSignUpForm(signUpFixtures[SignUpFixtureTypes.VAlID])
    cy.get(e2e('button_signup')).click();
    cy.contains('Sign up successful', {timeout: 10000});
    cy.get('[data-e2e="button_signup"][disabled="true"]').should('exist');

    cy.get(e2e('button_close')).click(); // test closing
    cy.contains('Sign up successful').should('not.exist');
    cy.get('mat-dialog').should('not.exist');
    cy.get('[data-e2e="button_signup"][disabled="true"]').should('not.exist');
  });
})
