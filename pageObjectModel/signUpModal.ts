import { Page } from "@playwright/test";

export class SignUpModal {
  readonly SignUpModalHeader: string;
  readonly userNameLabel: string;
  readonly passwordLabel: string;
  readonly usernameInputField: string;
  readonly passwordInputField: string;
  readonly signUpButton: string;
  readonly closeButton: string;
  readonly crossButton: string;

  constructor(page: Page) {
    this.SignUpModalHeader = `css=h5[id='signInModalLabel']`;
    this.userNameLabel = `css=label[for='sign-username']`;
    this.passwordLabel = `css=label[for='sign-password']`;
    this.usernameInputField = `css=input[id='sign-username']`;
    this.passwordInputField = `css=input[id='sign-password'`;
    this.signUpButton = `css=button[onclick='register()']`;
    this.closeButton = `css=div[id='signInModal'] div[class='modal-content'] div[class='modal-footer'] button:nth-child(1)`;
    this.crossButton = `xpath=div[id='signInModal'] span[aria-hidden='true']`;
  }
}
