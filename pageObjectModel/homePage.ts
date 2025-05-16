import { Page } from "@playwright/test";

export class HomePage {
  readonly homePageLogo: string;
  readonly firstProductCard: string;
  readonly secondProductCard: string;
  readonly navbarHome: string;
  readonly navbarContact: string;
  readonly navbarAbout: string;
  readonly navbarCart: string;
  readonly navbarLogin: string;
  readonly navbarSignup: string;

  constructor(page: Page) {
    this.homePageLogo = `css=a[id='nava']`;
    this.firstProductCard = `xpath=//body/div[@id='contcont']/div[@class='row']/div[@class='col-lg-9']/div[@id='tbodyid']/div[1]/div[1]`;
    this.secondProductCard = `xpath=//body/div[@id='contcont']/div[@class='row']/div[@class='col-lg-9']/div[@id='tbodyid']/div[2]/div[1]`;
    this.navbarHome = `css=a[class='nav-link'][href='index.html']`;
    this.navbarContact = `css=a[data-target='#exampleModal']`;
    this.navbarAbout = `css=a[data-target='#videoModal']`;
    this.navbarCart = `css=a[id='cartur']`;
    this.navbarLogin = `css=a[id='login2']`;
    this.navbarSignup = `css=a[id='signin2']`;
  }
}
