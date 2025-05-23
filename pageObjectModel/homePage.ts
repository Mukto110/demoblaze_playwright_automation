import { Page } from "@playwright/test";

export class HomePage {
  readonly homePageLogo: string;
  readonly homePageLogoImage: string;
  readonly navbarHome: string;
  readonly navbarContact: string;
  readonly navbarAbout: string;
  readonly navbarCart: string;
  readonly navbarLogin: string;
  readonly navbarSignup: string;
  readonly categoriesHeader: string;
  readonly categoriesPhones: string;
  readonly categoriesLaptops: string;
  readonly categoriesMonitors: string;
  readonly firstProductCardTitle: string;
  readonly secondProductCardTitle: string;
  readonly paginationPreviousButton: string;
  readonly paginationNextButton: string;
  readonly firstProductImage: string;
  readonly secondProductImage: string;
  // --------------------------------------------
  readonly macbookLaptopCard: string;
  readonly firstProductCardOfMonitors: string;

  readonly firstProductTitle: string;
  readonly firstProductPrice: string;
  readonly firstProductDescription: string;
  readonly carousel: string;
  readonly activeCarouselImage: string;
  readonly carouselNextButton: string;
  readonly carouselPreviousButton: string;

  readonly footer: string;
  readonly footerText: string;
  readonly productContainer: string;
  readonly productTitle: string;
  readonly productPrice: string;
  readonly productImage: string;
  readonly productDescription: string;

  constructor(page: Page) {
    this.homePageLogo = `css=a[id='nava']`;
    this.homePageLogoImage = `css=[id='nava'] img`;
    this.navbarHome = `css=ul[class='navbar-nav ml-auto'] [href='index.html']`;
    this.navbarContact = `css=a[data-target='#exampleModal']`;
    this.navbarAbout = `css=a[data-target='#videoModal']`;
    this.navbarCart = `css=a[id='cartur']`;
    this.navbarLogin = `css=a[id='login2']`;
    this.navbarSignup = `css=a[id='signin2']`;
    this.categoriesHeader = `css=div[class='list-group'] a[id='cat']`;
    this.categoriesPhones = `xpath=//a[@id='itemc' and text()='Phones']`;
    this.categoriesLaptops = `xpath=//a[@id='itemc' and text()='Laptops']`;
    this.categoriesMonitors = `xpath=//a[@id='itemc' and text()='Monitors']`;
    this.firstProductCardTitle = `css=div[id='tbodyid'] div:nth-child(1) div:nth-child(1) div:nth-child(2) h4:nth-child(1) a`;
    this.secondProductCardTitle = `css=div[id='tbodyid'] div:nth-child(2) div:nth-child(1) div:nth-child(2) h4:nth-child(1) a`;
    this.paginationPreviousButton = `css=li[class='page-item'] button[id='prev2']`;
    this.paginationNextButton = `css=li[class='page-item'] button[id='next2']`;
    this.firstProductImage = `css=div[id='tbodyid'] div:nth-child(1) div:nth-child(1) a:nth-child(1) img:nth-child(1)`;
    this.secondProductImage = `css=div[id='tbodyid'] div:nth-child(2) div:nth-child(1) a:nth-child(1) img:nth-child(1)`;
    // -----------------------------------------------------------------------------------
    this.macbookLaptopCard = `css=body > div:nth-child(6) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3)`;
    this.firstProductCardOfMonitors = `css=body > div:nth-child(6) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)`;

    this.firstProductTitle = `css=body > div:nth-child(6) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > h4:nth-child(1) > a:nth-child(1)`;
    this.firstProductPrice = `css=body > div:nth-child(6) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > h5:nth-child(2)`;
    this.firstProductDescription = `css=body > div:nth-child(6) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(3)`;
    this.carousel = `css=div[id='carouselExampleIndicators']`;
    this.activeCarouselImage = `css=.carousel-item.active img`;
    this.carouselNextButton = `css=span[class='carousel-control-next-icon']`;
    this.carouselPreviousButton = `css=.carousel-control-prev-icon`;
    this.footer = `css=div[id='footc']`;
    this.footerText = `xpath=//p[@class='m-0 text-center text-white']`;
    // <--------------------------------------------------------------->
    this.productContainer = `css=div[class="card h-100"]`;
    this.productTitle = `css=h4[class="card-title"]`;
    this.productPrice = `css=div[id='tbodyid'] div[class='col-lg-4 col-md-6 mb-4'] h5`;
    this.productImage = `css=div[id='tbodyid'] div[class='col-lg-4 col-md-6 mb-4'] img`;
    this.productDescription = `css=div[id='tbodyid'] div[class='col-lg-4 col-md-6 mb-4'] p`;
  }
}
