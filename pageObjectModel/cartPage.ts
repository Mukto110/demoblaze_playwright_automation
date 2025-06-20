import { Page } from "@playwright/test";

export class CartPage {
  readonly picSection: string;
  readonly titleSection: string;
  readonly priceSection: string;
  readonly closeSection: string;
  readonly deleteButton: string;
  readonly firstCartedProduct: string;
  readonly secondCartedProduct: string;
  //----------------------------------------------------
  readonly cartPageHeaderText: string;
  readonly totalText: string;
  readonly placeOrderButton: string;
  readonly orderModalHeader: string;
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
  readonly cartedProductsImg: string;
  readonly cartedProductsTitle: string;
  readonly cartedProductsPrice: string;
  readonly cartedProductsDeleteButtonFirst: string;
  readonly totalPrice: string;

  constructor(page: Page) {
    this.picSection = `xpath=//th[normalize-space()='Pic']`;
    this.titleSection = `xpath=//th[normalize-space()='Title']`;
    this.priceSection = `xpath=//th[normalize-space()='Price']`;
    this.closeSection = `xpath=//th[normalize-space()='x']`;
    this.deleteButton = `xpath=/html[1]/body[1]/div[6]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]/a[1]`;
    this.firstCartedProduct = `css=body > div:nth-child(7) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1)`;
    this.secondCartedProduct = `css=body > div:nth-child(7) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(2)`;
    //---------------------------------------------------------------------------------------------------
    this.cartPageHeaderText = `css=div[id='page-wrapper'] div[class='col-lg-8'] h2`;
    this.totalText = `css=div[class='col-lg-1'] h2`;
    this.placeOrderButton = `css=button[class="btn btn-success"]`;
    this.orderModalHeader = `css=h5[id="orderModalLabel"]`;
    this.totalPriceInOrderModal = `css=label[id="totalm"]`;
    this.nameInputInOrderModal = `css=input[id="name"]`;
    this.countryInputInOrderModal = `css=input[id="country"]`;
    this.cityInputInOrderModal = `css=input[id="city"]`;
    this.creditCardInputInOrderModal = `css=input[id="card"]`;
    this.monthInputInOrderModal = `css=input[id="month"]`;
    this.yearInputInOrderModal = `css=input[id="year"]`;
    this.closeButtonInOrderModal = `css=div[id='orderModal'] div[class='modal-footer'] button[data-dismiss="modal"]`;
    this.purchaseButtonInOrderModal = `css=div[id='orderModal'] div[class='modal-footer'] button[class="btn btn-primary"]`;

    this.purchaseCofimationMessageAlert = `css=div[class="sweet-alert  showSweetAlert visible"] h2`;
    this.purchaseCofimationDetailsInAlert = `css=p[class="lead text-muted "]`;
    this.okButtonInAlert = `css=button[class="confirm btn btn-lg btn-primary"]`;
    this.cartedProductsDetails = `css=tr[class="success"]`;
    this.cartedProductsImg = `css= td:nth-child(1) `;
    this.cartedProductsTitle = `css= td:nth-child(2)`;
    this.cartedProductsPrice = `css=  td:nth-child(3)`;
    this.cartedProductsDeleteButtonFirst = `css= td:nth-child(4) a`;
    this.totalPrice = `css= h3[id="totalp"]`;
  }
}
