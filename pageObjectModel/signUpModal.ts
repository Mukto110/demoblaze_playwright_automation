import { Page } from "@playwright/test";

export class SignupModal {
  readonly signUpModalLabel: string;
  readonly usernameTextField: string;
  readonly passwordTextField: string;
  readonly closeButton: string;
  readonly signUpButton: string;

  constructor(page: Page) {
    this.signUpModalLabel = `css=#signInModalLabel`;
    this.usernameTextField = `css=#sign-username`;
    this.passwordTextField = `css=#sign-password`;
    this.closeButton = `css=body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1)`;
    this.signUpButton = `css=body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(2)`;
  }
}
