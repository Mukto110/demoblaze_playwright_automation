import { Page } from "@playwright/test";

export class CartPage {
  readonly cartPageTitle: string;
  readonly totalText: string;
  readonly placeOrderButton: string;
  readonly picSection: string;
  readonly titleSection: string;
  readonly priceSection: string;
  readonly closeSection: string;
  readonly deleteButton: string;
  readonly firstCartedProduct: string;
  readonly secondCartedProduct: string;

  constructor(page: Page) {
    this.cartPageTitle = `css=div[class='col-lg-8'] h2`;
    this.totalText = `css=div[class='col-lg-1'] h2`;
    this.placeOrderButton = `css=button[class="btn btn-success"]`;
    this.picSection = `xpath=//th[normalize-space()='Pic']`;
    this.titleSection = `xpath=//th[normalize-space()='Title']`;
    this.priceSection = `xpath=//th[normalize-space()='Price']`;
    this.closeSection = `xpath=//th[normalize-space()='x']`;
    this.deleteButton = `xpath=/html[1]/body[1]/div[6]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]/a[1]`;
    this.firstCartedProduct = `css=tbody tr:nth-child(1)`;
    this.secondCartedProduct = `css=tbody tr:nth-child(2)`;
  }
}
