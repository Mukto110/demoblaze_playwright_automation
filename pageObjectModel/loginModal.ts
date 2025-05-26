import { Page } from "@playwright/test";

export class LoginModal {
  readonly loginModalHeader: string;
  readonly usernameLabel: string;
  readonly passwordLabel: string;
  readonly userNameInputField: string;
  readonly passwordInputField: string;
  readonly loginButton: string;
  readonly crossButton: string;
  readonly closeButton: string;

  constructor(page: Page) {
    this.loginModalHeader = `css=h5[id='logInModalLabel']`;
    this.usernameLabel = `css=div[id='logInModal'] div[class='modal-body'] label[for='log-name']`;
    this.passwordLabel = `css=div[id='logInModal'] div[class='modal-body'] div:nth-child(2) label`;
    this.userNameInputField = `css=input[id='loginusername']`;
    this.passwordInputField = `css=input[id='loginpassword']`;
    this.loginButton = `css=button[onclick='logIn()']`;
    this.crossButton = `css=div[id='logInModal'] span[aria-hidden='true']`;
    this.closeButton = `xpath=//div[@id='logInModal']//button[@type='button'][normalize-space()='Close']`;
  }
}
