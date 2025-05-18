import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";

class CartPage extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("Home Page Functionality Test", () => {
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






    });
  }
}

const cartPageTest = new CartPage();
cartPageTest.runTest();