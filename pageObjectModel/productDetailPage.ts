import { Page } from "@playwright/test";

export class ProductDetailPage {
  readonly productTitle: string;
  readonly productPrice: string;
  readonly addToCartButton: string;

  constructor(page: Page) {
    this.productTitle = `css=h2[class='name']`;
    this.productPrice = `css=div[id='tbodyid'] h3[class='price-container']`;
    this.addToCartButton = `xpath=//a[normalize-space()='Add to cart']`;
  }
}
