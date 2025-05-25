import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";
import * as homeData from "../testData/home.json";
import * as cartData from "../testData/cart.json";

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
        envData,
      }) => {
        await runner.validateAndClick(homePage.navbarCart, {
          expectedText: homeData.navbar.cart,
        });
        await runner.verifyUrlContains(envData.cartUrl);
        await runner.verifyContainText(
          cartPage.cartPageHeaderText,
          cartData.cartPageHeaderText
        );
        await runner.verifyContainText(
          cartPage.picSection,
          cartData.picSectionText
        );
        await runner.verifyContainText(
          cartPage.titleSection,
          cartData.ttleSectionText
        );
        await runner.verifyContainText(
          cartPage.priceSection,
          cartData.priceSectionText
        );
        await runner.verifyContainText(
          cartPage.closeSection,
          cartData.closeSectionText
        );
        await runner.verifyContainText(
          cartPage.totalText,
          cartData.cartPageTotalText
        );
        await runner.verifyContainText(
          cartPage.placeOrderButton,
          cartData.placeOrderButtonText
        );
      });

      test("Verify that single product can be added to the cart from the product detail page", async ({
        runner,
        homePage,
        cartPage,
        envData,
        productDetailPage,
      }) => {
        await runner.wait(5, { waitForSelector: homePage.productContainer });
        await runner.verifyElementsIsExist(homePage.productContainer);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);
        const clickedProductDetails: any = [];
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer
          );
        await runner.wait(5, {
          waitForSelector: productDetailPage.productTitle,
        });

        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          firstProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );

        await runner.validateAndClick(productDetailPage.addToCartButton, {
          expectedText: homeData.productDetails.buttonText,
          waitForSelectorAfterClick: productDetailPage.productTitle,
        });
        clickedProductDetails.push(firstProductDetails);
        await runner.acceptWebAlert("Product added");

        console.log(clickedProductDetails);
        await runner.validateAndClick(homePage.navbarCart, {
          expectedText: homeData.navbar.cart,
          waitForSelectorAfterClick: productDetailPage.productTitle,
        });

        await runner.validateProductsInCart(
          clickedProductDetails,
          cartPage.cartedProductsDetails,
          cartPage.cartedProductsTitle,
          cartPage.cartedProductsPrice,
          cartPage.cartedProductsImg,
          cartPage.totalPrice
        );
      });
      test("Verify that multiple products can be added to the cart from the product detail page", async ({
        runner,
        homePage,
        cartPage,
        envData,
        productDetailPage,
      }) => {
        await runner.wait(5, { waitForSelector: homePage.productContainer });
        await runner.verifyElementsIsExist(homePage.productContainer);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);
        const clickedProductDetails: any = [];
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer
          );
        await runner.wait(2, { waitForLoadState: "load" });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          firstProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );

        await runner.validateAndClick(productDetailPage.addToCartButton, {
          expectedText: homeData.productDetails.buttonText,
          waitForSelectorAfterClick: productDetailPage.productTitle,
        });
        await runner.acceptWebAlert("Product added");

        clickedProductDetails.push(firstProductDetails);
        await runner.validateAndClick(homePage.navbarHome, {
          expectedText: homeData.navbar.home,
          waitForLoadState: "load",
        });
        await runner.wait(5, { waitForLoadState: "load" });

        await runner.verifyElementsIsExist(homePage.productContainer);

        const secondProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer
          );
        await runner.wait(2, { waitForLoadState: "load" });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          secondProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );

        await runner.validateAndClick(productDetailPage.addToCartButton, {
          expectedText: homeData.productDetails.buttonText,
          waitForSelectorAfterClick: productDetailPage.productTitle,
        });
        await runner.acceptWebAlert("Product added");
        clickedProductDetails.push(secondProductDetails);

        console.log(clickedProductDetails);
        await runner.validateAndClick(homePage.navbarCart, {
          expectedText: homeData.navbar.cart,
          waitForLoadState: "load",
        });
        await runner.validateProductsInCart(
          clickedProductDetails,
          cartPage.cartedProductsDetails,
          cartPage.cartedProductsTitle,
          cartPage.cartedProductsPrice,
          cartPage.cartedProductsImg,
          cartPage.totalPrice
        );
      });
      test("Verify that after reload cart remains same", async ({
        runner,
        homePage,
        cartPage,
        envData,
        productDetailPage,
      }) => {
        await runner.wait(5, { waitForSelector: homePage.productContainer });
        await runner.verifyElementsIsExist(homePage.productContainer);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);
        const clickedProductDetails: any = [];
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer
          );
        await runner.wait(2, { waitForLoadState: "load" });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          firstProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );

        await runner.validateAndClick(productDetailPage.addToCartButton, {
          expectedText: homeData.productDetails.buttonText,
          waitForSelectorAfterClick: productDetailPage.productTitle,
        });
        await runner.acceptWebAlert("Product added");

        clickedProductDetails.push(firstProductDetails);
        await runner.validateAndClick(homePage.navbarHome, {
          expectedText: homeData.navbar.home,
          waitForLoadState: "load",
        });
        await runner.wait(5, { waitForLoadState: "load" });

        await runner.verifyElementsIsExist(homePage.productContainer);

        const secondProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer
          );
        await runner.wait(2, { waitForLoadState: "load" });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          secondProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );

        await runner.validateAndClick(productDetailPage.addToCartButton, {
          expectedText: homeData.productDetails.buttonText,
          waitForSelectorAfterClick: productDetailPage.productTitle,
        });
        await runner.acceptWebAlert("Product added");
        clickedProductDetails.push(secondProductDetails);

        console.log(clickedProductDetails);
        await runner.validateAndClick(homePage.navbarCart, {
          expectedText: homeData.navbar.cart,
          waitForLoadState: "load",
        });
        await runner.validateProductsInCart(
          clickedProductDetails,
          cartPage.cartedProductsDetails,
          cartPage.cartedProductsTitle,
          cartPage.cartedProductsPrice,
          cartPage.cartedProductsImg,
          cartPage.totalPrice
        );
        await runner.validateAndClick(homePage.navbarHome, {
          expectedText: homeData.navbar.home,
        });
        await runner.refreshPage();
        await runner.validateAndClick(homePage.navbarCart, {
          expectedText: homeData.navbar.cart,
        });
        await runner.validateProductsInCart(
          clickedProductDetails,
          cartPage.cartedProductsDetails,
          cartPage.cartedProductsTitle,
          cartPage.cartedProductsPrice,
          cartPage.cartedProductsImg,
          cartPage.totalPrice
        );
      });
      test("Verify deleting a product succesfully", async ({
        runner,
        homePage,
        cartPage,
        envData,
        productDetailPage,
      }) => {
        await runner.wait(5, { waitForSelector: homePage.productContainer });
        await runner.verifyElementsIsExist(homePage.productContainer);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);
        const clickedProductDetails: any = [];
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer
          );
        await runner.wait(2, { waitForLoadState: "load" });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          firstProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );

        await runner.validateAndClick(productDetailPage.addToCartButton, {
          expectedText: homeData.productDetails.buttonText,
          waitForSelectorAfterClick: productDetailPage.productTitle,
        });
        await runner.acceptWebAlert("Product added");

        clickedProductDetails.push(firstProductDetails);
        await runner.validateAndClick(homePage.navbarHome, {
          expectedText: homeData.navbar.home,
          waitForLoadState: "load",
        });
        await runner.wait(5, { waitForLoadState: "load" });

        await runner.verifyElementsIsExist(homePage.productContainer);

        const secondProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer
          );
        await runner.wait(2, { waitForLoadState: "load" });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          secondProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );

        await runner.validateAndClick(productDetailPage.addToCartButton, {
          expectedText: homeData.productDetails.buttonText,
          waitForSelectorAfterClick: productDetailPage.productTitle,
        });
        await runner.acceptWebAlert("Product added");
        clickedProductDetails.push(secondProductDetails);

        console.log(clickedProductDetails);
        await runner.validateAndClick(homePage.navbarCart, {
          expectedText: homeData.navbar.cart,
          waitForLoadState: "load",
        });
        await runner.validateProductsInCart(
          clickedProductDetails,
          cartPage.cartedProductsDetails,
          cartPage.cartedProductsTitle,
          cartPage.cartedProductsPrice,
          cartPage.cartedProductsImg,
          cartPage.totalPrice
        );
        await runner.validateAndClick(homePage.navbarHome, {
          expectedText: homeData.navbar.home,
        });
        await runner.refreshPage();
        await runner.validateAndClick(homePage.navbarCart, {
          expectedText: homeData.navbar.cart,
        });
        await runner.validateProductsInCart(
          clickedProductDetails,
          cartPage.cartedProductsDetails,
          cartPage.cartedProductsTitle,
          cartPage.cartedProductsPrice,
          cartPage.cartedProductsImg,
          cartPage.totalPrice
        );

        const deletedProductTitle = await runner.deleteProductFromCartByIndex(
          0,
          cartPage.cartedProductsDetails
        );
        const updatedExpectedProducts = clickedProductDetails.filter(
          (clickedProductDetails: any) =>
            clickedProductDetails.title !== deletedProductTitle
        );

        console.log(updatedExpectedProducts);
        await runner.wait(2, { waitForLoadState: "load" });
        await runner.validateProductsInCart(
          updatedExpectedProducts,
          cartPage.cartedProductsDetails,
          cartPage.cartedProductsTitle,
          cartPage.cartedProductsPrice,
          cartPage.cartedProductsImg,
          cartPage.totalPrice
        );
      });
      test("Verify that order is not placed succesfully without required fields", async ({
        runner,
        homePage,
        cartPage,
        envData,
        productDetailPage,
        fakeUser,
      }) => {
        await runner.wait(5, { waitForSelector: homePage.productContainer });
        await runner.verifyElementsIsExist(homePage.productContainer);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);
        const clickedProductDetails: any = [];
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer
          );
        await runner.wait(2, { waitForLoadState: "load" });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          firstProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );

        await runner.validateAndClick(productDetailPage.addToCartButton, {
          expectedText: homeData.productDetails.buttonText,
          waitForSelectorAfterClick: productDetailPage.productTitle,
        });
        await runner.acceptWebAlert("Product added");

        clickedProductDetails.push(firstProductDetails);
        await runner.validateAndClick(homePage.navbarHome, {
          expectedText: homeData.navbar.home,
          waitForLoadState: "load",
        });
        await runner.wait(5, { waitForLoadState: "load" });

        await runner.verifyElementsIsExist(homePage.productContainer);

        const secondProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer
          );
        await runner.wait(5, { waitForLoadState: "load" });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          secondProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );

        await runner.validateAndClick(productDetailPage.addToCartButton, {
          expectedText: homeData.productDetails.buttonText,
          waitForSelectorAfterClick: productDetailPage.productTitle,
        });
        await runner.acceptWebAlert("Product added");
        clickedProductDetails.push(secondProductDetails);

        console.log(clickedProductDetails);
        await runner.validateAndClick(homePage.navbarCart, {
          expectedText: homeData.navbar.cart,
          waitForLoadState: "load",
        });
        const totalPriceValue = await runner.validateProductsInCart(
          clickedProductDetails,
          cartPage.cartedProductsDetails,
          cartPage.cartedProductsTitle,
          cartPage.cartedProductsPrice,
          cartPage.cartedProductsImg,
          cartPage.totalPrice
        );
        console.log(totalPriceValue);
        await runner.validateAndClick(cartPage.placeOrderButton, {
          expectedText: cartData.placeOrderButtonText,
          waitForLoadState: "load",
        });
        await runner.verifyContainText(
          cartPage.totalPriceInOrderModal,
          `${totalPriceValue}`
        );
        await runner.fillInputBox(cartPage.nameInputInOrderModal, "");
        await runner.fillInputBox(
          cartPage.countryInputInOrderModal,
          fakeUser.country
        );
        await runner.fillInputBox(
          cartPage.cityInputInOrderModal,
          fakeUser.city
        );
        await runner.fillInputBox(cartPage.creditCardInputInOrderModal, "");
        await runner.fillInputBox(
          cartPage.monthInputInOrderModal,
          fakeUser.month
        );
        await runner.fillInputBox(
          cartPage.yearInputInOrderModal,
          fakeUser.year
        );

        await runner.handleAlertWithMessage(
          "Please fill out Name and Creditcard"
        );
        await runner.validateAndClick(cartPage.purchaseButtonInOrderModal, {
          expectedText: cartData.orderModalPurchaseButtonText,
          waitForLoadState: "load",
        });
      });
      test("Verify that order is  placed succesfully with required fields", async ({
        runner,
        homePage,
        cartPage,
        envData,
        productDetailPage,
        fakeUser,
      }) => {
        await runner.wait(5, { waitForSelector: homePage.productContainer });
        await runner.verifyElementsIsExist(homePage.productContainer);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);
        const clickedProductDetails: any = [];
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer
          );
        await runner.wait(5, { waitForLoadState: "load" });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          firstProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );

        await runner.validateAndClick(productDetailPage.addToCartButton, {
          expectedText: homeData.productDetails.buttonText,
          waitForLoadState: "load",
        });
        await runner.acceptWebAlert("Product added");

        clickedProductDetails.push(firstProductDetails);
        // await runner.wait(5, { waitForLoadState: "load" });
        await runner.validateAndClick(homePage.navbarHome, {
          expectedText: homeData.navbar.home,
          waitForLoadState: "load",
        });
        await runner.wait(5, { waitForLoadState: "load" });

        await runner.verifyElementsIsExist(homePage.productContainer);

        const secondProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer
          );
        await runner.wait(5, { waitForLoadState: "load" });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          secondProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );

        await runner.validateAndClick(productDetailPage.addToCartButton, {
          expectedText: homeData.productDetails.buttonText,
          waitForSelectorAfterClick: productDetailPage.productTitle,
        });
        await runner.acceptWebAlert("Product added");
        clickedProductDetails.push(secondProductDetails);

        console.log(clickedProductDetails);
        await runner.validateAndClick(homePage.navbarCart, {
          expectedText: homeData.navbar.cart,
          waitForLoadState: "load",
        });
        const totalPriceValue = await runner.validateProductsInCart(
          clickedProductDetails,
          cartPage.cartedProductsDetails,
          cartPage.cartedProductsTitle,
          cartPage.cartedProductsPrice,
          cartPage.cartedProductsImg,
          cartPage.totalPrice
        );
        console.log(totalPriceValue);
        await runner.validateAndClick(cartPage.placeOrderButton, {
          expectedText: cartData.placeOrderButtonText,
          waitForLoadState: "load",
        });
        await runner.verifyContainText(
          cartPage.totalPriceInOrderModal,
          `${totalPriceValue}`
        );

        await runner.fillInputBox(
          cartPage.nameInputInOrderModal,
          fakeUser.username
        );
        await runner.fillInputBox(
          cartPage.countryInputInOrderModal,
          fakeUser.country
        );
        await runner.fillInputBox(
          cartPage.cityInputInOrderModal,
          fakeUser.city
        );
        await runner.fillInputBox(
          cartPage.creditCardInputInOrderModal,
          fakeUser.card
        );
        await runner.fillInputBox(
          cartPage.monthInputInOrderModal,
          fakeUser.month
        );
        await runner.fillInputBox(
          cartPage.yearInputInOrderModal,
          fakeUser.year
        );
        await runner.validateAndClick(cartPage.purchaseButtonInOrderModal, {
          expectedText: cartData.orderModalPurchaseButtonText,
          waitForLoadState: "load",
        });

        await runner.verifyContainText(
          cartPage.purchaseCofimationMessageAlert,
          "Thank you for your purchase!"
        );
        await runner.verifyContainText(
          cartPage.purchaseCofimationDetailsInAlert,
          fakeUser.username
        );
        await runner.verifyContainText(
          cartPage.purchaseCofimationDetailsInAlert,
          fakeUser.card
        );
        await runner.verifyContainText(
          cartPage.purchaseCofimationDetailsInAlert,
          `${totalPriceValue}`
        );
        await runner.wait(5, { waitForLoadState: "load" });

        await runner.validateAndClick(cartPage.okButtonInAlert, {
          waitForLoadState: "load",
        });
        await runner.verifyUrlContains(envData.homeButtonClickUrl);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
        await runner.validateAndClick(homePage.navbarCart, {
          expectedText: homeData.navbar.cart,
          waitForLoadState: "load",
        });
        await runner.getCartProductCount(cartPage.cartedProductsDetails);
      });
    });
  }
}

const cartPageTest = new CartPage();
cartPageTest.runTest();
