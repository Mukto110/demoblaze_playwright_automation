import { Page } from "@playwright/test";

export class ProductDetailPage {
  readonly productTitle: string;
  readonly productPrice: string;
  readonly productImg: string;
  readonly addToCartButton: string;

  constructor(page: Page) {
    this.productTitle = `css=h2[class='name']`;
    this.productPrice = `css=div[id='tbodyid'] h3[class='price-container']`;
    this.addToCartButton = `css=a[class="btn btn-success btn-lg"]`;
    this.productImg = `css=div[class="item active"] img`;
  }
}
