import { Page } from "@playwright/test";

export class HomePage {
  readonly homePageLogo: string;
  readonly firstProductCard: string;
  readonly secondProductCard: string;

  constructor(page: Page) {
    this.homePageLogo = `css=a[id='nava']`;
    this.firstProductCard = `css=div[id='tbodyid'] div:nth-child(1) div:nth-child(1)`;
    this.secondProductCard = `css=div[id='tbodyid'] div:nth-child(2) div:nth-child(1)`;
  }
}
