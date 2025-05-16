import { Page } from "@playwright/test";
export class LoginHelper {
  private page: Page;


  constructor(page: Page) {
    this.page = page;
  }

  async navigateToLoginPage() {
    await this.page.goto("https://demoblaze.com/");
  }

  async login(username: string, password: string) {
    await this.page.locator(`input[id='username']`).fill(username);
    await this.page.locator(`input[id='password']`).fill(password);
    await this.page.locator(`button[id='submit']`).click();
  }
}