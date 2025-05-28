import { Page } from "@playwright/test";
import { Utils } from "../utilities/utils";
import { LoginModal } from "../pageObjectModel/loginModal";

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
