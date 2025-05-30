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
    try {
      await this.utils.fillInputBox(
        this.loginModal.userNameInputField,
        username
      );
      await this.utils.fillInputBox(
        this.loginModal.passwordInputField,
        password
      );
      await this.page.locator(this.loginModal.loginButton).click();
      this.utils.logMessage(`Login attempted with username: "${username}"`);
    } catch (error) {
      const errorMsg = `Failed to perform login with username: "${username}"`;
      this.utils.logMessage(errorMsg, "error");
      await this.utils.captureScreenshotOnFailure("login");
      throw new Error(errorMsg);
    }
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
    try {
      await this.utils.fillInputBox(
        this.signUpModal.usernameInputField,
        username
      );
      await this.utils.fillInputBox(
        this.signUpModal.passwordInputField,
        password
      );
      await this.utils.clickOnElement(this.signUpModal.signUpButton);
      this.utils.logMessage(`Signup attempted with username: "${username}"`);
    } catch (error) {
      const errorMsg = `Failed to perform signup with username: "${username}"`;
      this.utils.logMessage(errorMsg, "error");
      await this.utils.captureScreenshotOnFailure("signup");
      throw new Error(errorMsg);
    }
  }
}
