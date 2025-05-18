import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";

class CartPage extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("Cart Page Functionality Test", () => {
      test.beforeEach(async ({ runner, envData, homePage }) => {
        await runner.navigateTo(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
      });
      

      test("Verify that clicking the Cart button in the navbar navigates to the cart page ", async ({
        runner,
        homePage,
        cartPage,
        envData
      }) => {
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.clickOnElement(homePage.navbarCart);
        await runner.verifyUrlContains(envData.cartUrl)
        await runner.verifyContainText(cartPage.cartPageTitle,'Products')
        await runner.verifyElementIsVisible(cartPage.picSection)
        await runner.verifyElementIsVisible(cartPage.titleSection)
        await runner.verifyElementIsVisible(cartPage.priceSection)
        await runner.verifyElementIsVisible(cartPage.closeSection)
        await runner.verifyElementIsVisible(cartPage.totalText)
        await runner.verifyElementIsVisible(cartPage.placeOrderButton)


        
      });
      test("Verify that a product can be added to the cart from the product detail page", async ({
        runner,
        homePage,
        cartPage,
        envData,
        productDetailPage
      }) => {

        await runner.verifyElementIsVisible(homePage.firstProductCardOfAllProduct);
        await runner.clickOnElement(homePage.firstProductCardOfAllProduct);
        await runner.verifyUrlContains(envData.firstProductUrl)
        await runner.verifyElementIsVisible(productDetailPage.firstProductDescription)
        await runner.verifyElementIsVisible(productDetailPage.firstProductPrice)
        await runner.verifyElementIsVisible(productDetailPage.firstProductTitle)
        await runner.verifyElementIsVisible(productDetailPage.firstProductTitle)
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton)
        await runner.clickOnElement(productDetailPage.addToCartButton)
        await runner.clickAndVerifyAlertMessage(productDetailPage.addToCartButton,'Product added')


        await runner.clickOnElement(homePage.navbarCart)
        await runner.verifyUrlContains(envData.cartUrl)
        await runner.verifyContainText(cartPage.cartPageTitle,'Products')
        await runner.verifyElementIsVisible(cartPage.picSection)
        await runner.verifyElementIsVisible(cartPage.titleSection)
        await runner.verifyElementIsVisible(cartPage.priceSection)
        await runner.verifyElementIsVisible(cartPage.closeSection)
        await runner.verifyElementIsVisible(cartPage.totalText)
        await runner.verifyElementIsVisible(cartPage.placeOrderButton)
        await runner.verifyElementIsVisible(cartPage.firstCartedProduct)






        
      });






    });
  }
}

const cartPageTest = new CartPage();
cartPageTest.runTest();