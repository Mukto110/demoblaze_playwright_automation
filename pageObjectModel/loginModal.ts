import { Page } from "@playwright/test";

export class LoginModal {
  readonly loginModalHeader: string;
  readonly usernameLabel: string;
  readonly passwordLabel: string;

  // <---------------------------------------------->
  readonly usernameTextField: string;
  readonly passwordTextField: string;
  readonly closeButton: string;
  readonly loginButton: string;
  readonly logoutButton: string;
  readonly nameOfUserText: string;

  constructor(page: Page) {
    this.loginModalHeader = `css=h5[id='logInModalLabel']`;
    this.usernameLabel = `css=div[id='logInModal'] div[class='modal-body'] label[for='log-name']`;
    this.passwordLabel = `css=div[id='logInModal'] div[class='modal-body'] div:nth-child(2) label`;

    // <------------------------------------------------------------------------------------------>
    this.usernameTextField = `css=#loginusername`;
    this.passwordTextField = `css=#loginpassword`;
    this.closeButton = `css=div[id='logInModal'] div[class='modal-footer'] button:nth-child(1)`;
    this.loginButton = `css=button[onclick='logIn()']`;
    this.logoutButton = `css=#logout2`;
    this.nameOfUserText = `css=#nameofuser`;
  }
}
