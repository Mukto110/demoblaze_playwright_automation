import { Page } from "@playwright/test";

export class CartPage {
  readonly cartPageTitle: string;

  constructor(page: Page) {
    this.cartPageTitle = `css=div[class='col-lg-8'] h2`;
  }
}
