import { Page } from "@playwright/test";

export class ProductDetailPage {
  readonly firstProductTitle: string;
  readonly firstProductPrice: string;
  readonly firstProductDescription: string;

  constructor(page: Page) {
    this.firstProductTitle = `css=h2[class='name']`;
    this.firstProductPrice = `css=h3[class='price-container']`;
    this.firstProductDescription = `css=div[id='more-information']`;
  }
}
