import { Page } from "@playwright/test";
import { Utils } from "../utilities/utils";

export class LoginHelper {
  private page: Page;
  private utils: Utils;

  constructor(page: Page) {
    this.page = page;
    this.utils = new Utils(page);
  }

  async login(
    username: string,
    password: string,
    selectors: {
      usernameField: string;
      passwordField: string;
      loginButton: string;
    }
  ): Promise<void> {
    await this.utils.verifyElementIsVisible(selectors.usernameField);
    await this.utils.fillInputBox(selectors.usernameField, username);

    await this.utils.verifyElementIsVisible(selectors.passwordField);
    await this.utils.fillInputBox(selectors.passwordField, password);

    await this.utils.verifyElementIsVisible(selectors.loginButton);
    await this.page.locator(selectors.loginButton).click();
  }

  async loginAndExpectAlert({
    username,
    password,
    selectors,
    expectedAlertText,
  }: {
    username: string;
    password: string;
    selectors: {
      usernameField: string;
      passwordField: string;
      loginButton: string;
    };
    expectedAlertText: string;
  }): Promise<void> {
    const { usernameField, passwordField, loginButton } = selectors;

    await this.page.locator(usernameField).fill(username);
    await this.page.locator(passwordField).fill(password);

    // Use Promise.all to ensure both dialog and click are awaited
    await Promise.all([
      this.page.waitForEvent("dialog").then(async (dialog) => {
        const message = dialog.message();
        if (message !== expectedAlertText) {
          throw new Error(
            `Expected alert "${expectedAlertText}", but got "${message}"`
          );
        }
        console.log(`✅ Alert message matched: "${message}"`);
        await dialog.accept();
      }),
      this.page.locator(loginButton).click(),
    ]);
  }
}
