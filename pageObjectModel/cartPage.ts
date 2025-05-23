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
  readonly orderModalTitle: string;
  readonly totalPriceInOrderModal: string;
  readonly nameInputInOrderModal: string;
  readonly countryInputInOrderModal: string;
  readonly cityInputInOrderModal: string;
  readonly creditCardInputInOrderModal: string;
  readonly monthInputInOrderModal: string;
  readonly yearInputInOrderModal: string;
  readonly closeButtonInOrderModal: string;
  readonly purchaseButtonInOrderModal: string;
  readonly purchaseCofimationMessageAlert: string;
  readonly purchaseCofimationDetailsInAlert: string;
  readonly okButtonInAlert: string;
// --------------------------------------------
  readonly cartedProductsDetails: string;
  readonly cartedProductsTitle: string;
  readonly cartedProductsPrice: string;

  constructor(page: Page) {
    this.cartPageTitle = `css=div[class='col-lg-8'] h2`;
    this.totalText = `css=div[class='col-lg-1'] h2`;
    this.placeOrderButton = `xpath=//button[normalize-space()='Place Order']`;
    this.picSection = `xpath=//th[normalize-space()='Pic']`;
    this.titleSection = `xpath=//th[normalize-space()='Title']`;
    this.priceSection = `xpath=//th[normalize-space()='Price']`;
    this.closeSection = `xpath=//th[normalize-space()='x']`;
    this.deleteButton = `xpath=/html[1]/body[1]/div[6]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]/a[1]`;
    this.firstCartedProduct = `css=body > div:nth-child(7) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1)`;
    this.secondCartedProduct = `css=body > div:nth-child(7) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(2)`;
    this.orderModalTitle = `css=h5[id="orderModalLabel"]`;
    this.totalPriceInOrderModal = `css=label[id="totalm"]`;
    this.nameInputInOrderModal = `css=input[id="name"]`;
    this.countryInputInOrderModal = `css=input[id="country"]`;
    this.cityInputInOrderModal = `css=input[id="city"]`;
    this.creditCardInputInOrderModal = `css=input[id="card"]`;
    this.monthInputInOrderModal = `css=input[id="month"]`;
    this.yearInputInOrderModal = `css=input[id="year"]`;
    this.closeButtonInOrderModal = `css=div[id='orderModal'] div[class='modal-footer'] button[data-dismiss="modal"]`;
    this.purchaseButtonInOrderModal = `css=div[id='orderModal'] div[class='modal-footer'] button[class="btn btn-primary"]`;
    this.purchaseCofimationMessageAlert = `xpath=//h2[normalize-space()='Thank you for your purchase!']`;
    this.purchaseCofimationDetailsInAlert = `css=p[class="lead text-muted "]`;
    this.okButtonInAlert = `css=button[class="confirm btn btn-lg btn-primary"]`;
    this.cartedProductsDetails = `css=tr[class="success"]`;
    this.cartedProductsTitle = `css=td:nth-child(2)`;
    this.cartedProductsPrice = `css=td:nth-child(3)`;
  }
}
