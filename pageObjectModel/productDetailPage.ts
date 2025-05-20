import { Page } from "@playwright/test";

export class ProductDetailPage {
  readonly firstProductTitle: string;
  readonly firstProductPrice: string;
  readonly firstProductDescription: string;
  readonly secondProductTitle: string;
  readonly secondProductPrice: string;
  readonly secondProductDescription: string;
  readonly addToCartButton: string;

  constructor(page: Page) {
    this.firstProductTitle = `css=h2[class='name']`;
    this.firstProductPrice = `xpath=/html[1]/body[1]/div[5]/div[1]/div[2]/div[1]/div[1]/div[1]/p[1]`;
    this.firstProductDescription = `css=div[id="more-information"] p`;
    // this.secondProductTitle = `css=h2[class='name']`;
    // this.secondProductPrice = `css=h3[class='price-container']`;
    // this.secondProductDescription = `css=div[id='more-information']`;
    this.addToCartButton = `xpath=//a[normalize-space()='Add to cart']`;
  }
}
