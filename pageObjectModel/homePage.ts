import { Page } from "@playwright/test";

export class HomePage {
  readonly homePageLogo: string;
  readonly firstProductCardOfAllProduct: string;
  readonly secondProductCardOfAllProduct: string;
  readonly navbarHome: string;
  readonly navbarContact: string;
  readonly navbarAbout: string;
  readonly navbarCart: string;
  readonly navbarLogin: string;
  readonly navbarSignup: string;
  readonly categoryLaptops: string;
  readonly macbookLaptopCard: string;

  constructor(page: Page) {
    this.homePageLogo = `css=a[id='nava']`;
    this.firstProductCardOfAllProduct = `xpath=//body/div[@id='contcont']/div[@class='row']/div[@class='col-lg-9']/div[@id='tbodyid']/div[1]/div[1]`;
    this.secondProductCardOfAllProduct = `xpath=//body/div[@id='contcont']/div[@class='row']/div[@class='col-lg-9']/div[@id='tbodyid']/div[2]/div[1]`;
    this.navbarHome = `css=a[class='nav-link'][href='index.html']`;
    this.navbarContact = `css=a[data-target='#exampleModal']`;
    this.navbarAbout = `css=a[data-target='#videoModal']`;
    this.navbarCart = `css=a[id='cartur']`;
    this.navbarLogin = `css=a[id='login2']`;
    this.navbarSignup = `css=a[id='signin2']`;
    this.categoryLaptops = `xpath=//a[@id='itemc' and text()='Laptops']`;
    this.macbookLaptopCard = `css=body > div:nth-child(6) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3)`;
  }
}
