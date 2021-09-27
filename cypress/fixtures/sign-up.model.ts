export interface SignUpFixture {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export enum SignUpFixtureTypes {
  VAlID = 'valid',
  PASSWORD_DO_NOT_MATCH = 'passwordNotMatch',
  INVALID_EMAIL = 'invalidEmail',
  PASSWORD_CONTAINS_FIRSTNAME = 'passwordContainsFirstName'
}

export type SignUpFixtures = Record<SignUpFixtureTypes, SignUpFixture>;
