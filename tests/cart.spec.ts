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
//       test.afterEach(async ({ runner }) => {
//   await runner.clearSessionData();
// });
 
      

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
        // await runner.verifyUrlContains(envData.firstProductUrl)
        await runner.verifyElementIsVisible(productDetailPage.firstProductDescription)
        await runner.verifyElementIsVisible(productDetailPage.firstProductPrice)
        await runner.verifyElementIsVisible(productDetailPage.firstProductTitle)
        await runner.verifyElementIsVisible(productDetailPage.firstProductTitle)
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton)
        await runner.clickAndVerifyAlertMessage(productDetailPage.addToCartButton,'Product added')


        await runner.clickOnElement(homePage.navbarCart)
        // await runner.verifyUrlContains(envData.cartUrl)
        await runner.verifyContainText(cartPage.cartPageTitle,'Products')
        await runner.verifyElementIsVisible(cartPage.picSection)
        await runner.verifyElementIsVisible(cartPage.titleSection)
        await runner.verifyElementIsVisible(cartPage.priceSection)
        await runner.verifyElementIsVisible(cartPage.closeSection)
        await runner.verifyElementIsVisible(cartPage.totalText)
        await runner.verifyElementIsVisible(cartPage.placeOrderButton)
        await runner.verifyElementIsVisible(cartPage.firstCartedProduct)






        
      });
      test("Verify that multiple products can be added to the cart,refreshed visibility", async ({
        runner,
        homePage,
        cartPage,
        envData,
        productDetailPage
      }) => {

        await runner.verifyElementIsVisible(homePage.firstProductCardOfAllProduct);
        await runner.clickOnElement(homePage.firstProductCardOfAllProduct);
        // await runner.wait(2)
        // await runner.verifyUrlContains(envData.firstProductUrl)
        await runner.verifyElementIsVisible(productDetailPage.firstProductDescription)
        await runner.verifyElementIsVisible(productDetailPage.firstProductPrice)
        await runner.verifyElementIsVisible(productDetailPage.firstProductTitle)
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton)
        await runner.clickAndVerifyAlertMessage(productDetailPage.addToCartButton,'Product added')

        await runner.clickOnElement(homePage.navbarHome)
        await runner.verifyElementIsVisible(homePage.secondProductCardOfAllProduct);
        await runner.clickOnElement(homePage.secondProductCardOfAllProduct);
        await runner.verifyUrlContains(envData.secondProductUrl)

        await runner.verifyElementIsVisible(productDetailPage.firstProductDescription)
        await runner.verifyElementIsVisible(productDetailPage.firstProductPrice)
        await runner.verifyElementIsVisible(productDetailPage.firstProductTitle)
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton)
        await runner.clickAndVerifyAlertMessage(productDetailPage.addToCartButton,'Product added')



        await runner.clickOnElement(homePage.navbarCart)
        // await runner.wait(2)
        // await runner.verifyUrlContains(envData.cartUrl)
        await runner.verifyContainText(cartPage.cartPageTitle,'Products')
        await runner.verifyElementIsVisible(cartPage.picSection)
        await runner.verifyElementIsVisible(cartPage.titleSection)
        await runner.verifyElementIsVisible(cartPage.priceSection)
        await runner.verifyElementIsVisible(cartPage.closeSection)
        await runner.verifyElementIsVisible(cartPage.totalText)
        await runner.verifyElementIsVisible(cartPage.placeOrderButton)


        await runner.verifyElementIsVisible(cartPage.firstCartedProduct)
        await runner.verifyElementIsVisible(cartPage.secondCartedProduct)
        await runner.refreshPage()
        await runner.verifyElementIsVisible(cartPage.firstCartedProduct)
        await runner.verifyElementIsVisible(cartPage.secondCartedProduct)







        
      });
      test("Verify delete button works ", async ({
        runner,
        homePage,
        cartPage,
        envData,
        productDetailPage
      }) => {

        await runner.verifyElementIsVisible(homePage.firstProductCardOfAllProduct);
        await runner.clickOnElement(homePage.firstProductCardOfAllProduct);
        // await runner.wait(2)
        // await runner.verifyUrlContains(envData.firstProductUrl)
        await runner.verifyElementIsVisible(productDetailPage.firstProductDescription)
        await runner.verifyElementIsVisible(productDetailPage.firstProductPrice)
        await runner.verifyElementIsVisible(productDetailPage.firstProductTitle)
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton)
        await runner.clickAndVerifyAlertMessage(productDetailPage.addToCartButton,'Product added')
        await runner.clickOnElement(homePage.navbarHome)
        await runner.clickOnElement(homePage.secondProductCardOfAllProduct)

       
        await runner.verifyElementIsVisible(productDetailPage.firstProductDescription)
        await runner.verifyElementIsVisible(productDetailPage.firstProductPrice)
        await runner.verifyElementIsVisible(productDetailPage.firstProductTitle)
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton)
        // await runner.clickAndVerifyAlertMessage(productDetailPage.addToCartButton,'Product added')
        await runner.clickOnElement(productDetailPage.addToCartButton)




        await runner.clickOnElement(homePage.navbarCart)
        // await runner.wait(2)
        // await runner.verifyUrlContains(envData.cartUrl)
        await runner.verifyContainText(cartPage.cartPageTitle,'Products')

        await runner.verifyElementIsVisible(cartPage.firstCartedProduct)
        await runner.verifyElementIsVisible(cartPage.secondCartedProduct)
        await runner.verifyElementIsVisible(cartPage.deleteButton)
        await runner.clickOnElement(cartPage.deleteButton)

        await runner.verifyElementIsNotVisible(cartPage.firstCartedProduct)
        await runner.verifyElementIsVisible(cartPage.secondCartedProduct)







        
      });
      test("verifying the purchase order procedure", async ({
        runner,
        homePage,
        cartPage,
        envData,
        productDetailPage,
        fakeUser
      }) => {

        await runner.verifyElementIsVisible(homePage.firstProductCardOfAllProduct);
        await runner.clickOnElement(homePage.firstProductCardOfAllProduct);
        // await runner.wait(2)
        // await runner.verifyUrlContains(envData.firstProductUrl)
        // await runner.verifyElementIsVisible(productDetailPage.firstProductDescription)
        // await runner.verifyElementIsVisible(productDetailPage.firstProductPrice)
        // await runner.verifyElementIsVisible(productDetailPage.firstProductTitle)
        // await runner.verifyElementIsVisible(productDetailPage.addToCartButton)
        await runner.clickAndVerifyAlertMessage(productDetailPage.addToCartButton,'Product added')



        await runner.clickOnElement(homePage.navbarCart)
        // await runner.wait(2)
        // await runner.verifyUrlContains(envData.cartUrl)
        await runner.verifyContainText(cartPage.cartPageTitle,'Products')

        await runner.verifyElementIsVisible(cartPage.firstCartedProduct)

        await runner.verifyElementIsVisible(cartPage.placeOrderButton)  
        await runner.clickOnElement(cartPage.placeOrderButton)
        await runner.verifyContainText(cartPage.orderModalTitle,'Place order')
        await runner.verifyElementIsVisible(cartPage.totalPriceInOrderModal)
        await runner.fillInputBox(cartPage.nameInputInOrderModal,fakeUser.username)
        await runner.fillInputBox(cartPage.countryInputInOrderModal,fakeUser.country)
        await runner.fillInputBox(cartPage.cityInputInOrderModal,fakeUser.city)
        await runner.fillInputBox(cartPage.creditCardInputInOrderModal,fakeUser.card)
        await runner.fillInputBox(cartPage.monthInputInOrderModal,fakeUser.month)
        await runner.fillInputBox(cartPage.yearInputInOrderModal,fakeUser.year)
        await runner.clickAndVerifyAlertMessage(cartPage.purchaseButtonInOrderModal,cartPage.purchaseCofimationMessageAlert)
        await runner.verifyElementIsVisible(cartPage.purchaseCofimationDetailsInAlert)
        await runner.verifyElementIsVisible(cartPage.okButtonInAlert)
        await runner.clickOnElement(cartPage.okButtonInAlert)
        await runner.wait(2)
        await runner.verifyUrlContains(envData.baseUrl)








        
      });






    });
  }
}

const cartPageTest = new CartPage();
cartPageTest.runTest();