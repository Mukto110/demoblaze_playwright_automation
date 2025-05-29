import { Page } from "@playwright/test";
import { Utils } from "../utilities/utils";
import { LoginModal } from "../pageObjectModel/loginModal";
import { SignUpModal } from "../pageObjectModel/signUpModal";

export class LoginHelper {
  private page: Page;
  private utils: Utils;
  private loginModal: LoginModal;

  constructor(page: Page) {
    this.page = page;
    this.utils = new Utils(page);
    this.loginModal = new LoginModal(page);
  }

  async login(username: string, password: string): Promise<void> {
    await this.utils.fillInputBox(this.loginModal.userNameInputField, username);
    await this.utils.fillInputBox(this.loginModal.passwordInputField, password);
    await this.page.locator(this.loginModal.loginButton).click();
  }

  async loginAndExpectAlert(
    username: string,
    password: string,
    expectedAlertText: string
  ): Promise<void> {
    const alertPromise = this.utils.handleAlertWithMessage(expectedAlertText);

    await this.page.locator(this.loginModal.userNameInputField).fill(username);
    await this.page.locator(this.loginModal.passwordInputField).fill(password);
    await this.page.locator(this.loginModal.loginButton).click();

    await alertPromise;
  }
}

export class SignupHelper {
  private page: Page;
  private utils: Utils;
  private signUpModal: SignUpModal;

  constructor(page: Page) {
    this.page = page;
    this.utils = new Utils(page);
    this.signUpModal = new SignUpModal(page);
  }

  async signup(username: string, password: string): Promise<void> {
    await this.utils.fillInputBox(
      this.signUpModal.usernameInputField,
      username
    );
    await this.utils.fillInputBox(
      this.signUpModal.passwordInputField,
      password
    );
    await this.utils.clickOnElement(this.signUpModal.signUpButton);
  }

  async signupAndExpectAlert(
    username: string,
    password: string,
    expectedAlertText: string
  ): Promise<void> {
    const alertPromise = this.utils.handleAlertWithMessage(expectedAlertText);

    await this.utils.fillInputBox(
      this.signUpModal.usernameInputField,
      username
    );
    await this.utils.fillInputBox(
      this.signUpModal.passwordInputField,
      password
    );
    await this.utils.clickOnElement(this.signUpModal.signUpButton);

    await alertPromise;
  }
}
