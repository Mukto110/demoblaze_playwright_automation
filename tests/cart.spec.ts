import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";
import homeData from "../testData/home.json";
import cartData from "../testData/cart.json";

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
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.verifyElementsAreEnabled(homePage.navbarCart);

        await runner.validateAndClick(
          homePage.navbarCart,
          homeData.navbar.cart
        );
        await runner.wait(5, { waitForSelector: cartPage.cartPageHeaderText });
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
        await runner.verifyElementIsVisible(homePage.productTitles);
        await runner.verifyElementsAreEnabled(homePage.productTitles);
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
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
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton);
        await runner.verifyElementsAreEnabled(
          productDetailPage.addToCartButton
        );

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          homeData.productDetails.buttonText
        );

        await runner.acceptWebAlert(cartData.porductAddedConfirmationAlert);
        clickedProductDetails.push(firstProductDetails);

        console.log(clickedProductDetails);
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.verifyElementsAreEnabled(homePage.navbarCart);
        await runner.validateAndClick(
          homePage.navbarCart,
          homeData.navbar.cart
        );
        await runner.wait(5, { waitForSelector: cartPage.cartedProductsImg });

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
        await runner.verifyElementIsVisible(homePage.productTitles);
        await runner.verifyElementsAreEnabled(homePage.productTitles);
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
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
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton);
        await runner.verifyElementsAreEnabled(
          productDetailPage.addToCartButton
        );

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          homeData.productDetails.buttonText
        );
        await runner.acceptWebAlert(cartData.porductAddedConfirmationAlert);
        await runner.wait(5, { waitForSelector: homePage.navbarHome });

        clickedProductDetails.push(firstProductDetails);
        await runner.verifyElementIsVisible(homePage.navbarHome);
        await runner.verifyElementsAreEnabled(homePage.navbarHome);
        await runner.validateAndClick(
          homePage.navbarHome,
          homeData.navbar.home
        );
        await runner.wait(5, { waitForSelector: homePage.productContainer });

        await runner.verifyElementsIsExist(homePage.productContainer);
        await runner.verifyElementIsVisible(homePage.productTitles);
        await runner.verifyElementsAreEnabled(homePage.productTitles);

        const secondProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
          );
        await runner.wait(5, {
          waitForSelector: productDetailPage.productTitle,
        });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          secondProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton);
        await runner.verifyElementsAreEnabled(
          productDetailPage.addToCartButton
        );

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          homeData.productDetails.buttonText
        );
        await runner.acceptWebAlert(cartData.porductAddedConfirmationAlert);
        clickedProductDetails.push(secondProductDetails);

        console.log(clickedProductDetails);
        await runner.wait(5, { waitForSelector: homePage.navbarCart });
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.verifyElementsAreEnabled(homePage.navbarCart);
        await runner.validateAndClick(
          homePage.navbarCart,
          homeData.navbar.cart
        );
        await runner.wait(5, {
          waitForSelector: cartPage.cartedProductsImg,
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
        await runner.verifyElementIsVisible(homePage.productTitles);
        await runner.verifyElementsAreEnabled(homePage.productTitles);

        const clickedProductDetails: any = [];
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
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
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton);
        await runner.verifyElementsAreEnabled(
          productDetailPage.addToCartButton
        );

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          homeData.productDetails.buttonText
        );
        await runner.acceptWebAlert(cartData.porductAddedConfirmationAlert);
        await runner.wait(5, {
          waitForSelector: productDetailPage.productTitle,
        });

        clickedProductDetails.push(firstProductDetails);
        await runner.verifyElementIsVisible(homePage.navbarHome);
        await runner.verifyElementsAreEnabled(homePage.navbarHome);

        await runner.validateAndClick(
          homePage.navbarHome,
          homeData.navbar.home
        );
        await runner.wait(5, { waitForSelector: homePage.productContainer });

        await runner.verifyElementsIsExist(homePage.productContainer);
        await runner.verifyElementIsVisible(homePage.productTitles);
        await runner.verifyElementsAreEnabled(homePage.productTitles);

        const secondProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
          );
        await runner.wait(5, {
          waitForSelector: productDetailPage.productTitle,
        });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          secondProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton);
        await runner.verifyElementsAreEnabled(
          productDetailPage.addToCartButton
        );

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          homeData.productDetails.buttonText
        );
        await runner.acceptWebAlert(cartData.porductAddedConfirmationAlert);
        clickedProductDetails.push(secondProductDetails);

        console.log(clickedProductDetails);
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.verifyElementsAreEnabled(homePage.navbarCart);

        await runner.validateAndClick(
          homePage.navbarCart,
          homeData.navbar.cart
        );
        await runner.wait(5, {
          waitForSelector: cartPage.cartedProductsImg,
        });
        await runner.validateProductsInCart(
          clickedProductDetails,
          cartPage.cartedProductsDetails,
          cartPage.cartedProductsTitle,
          cartPage.cartedProductsPrice,
          cartPage.cartedProductsImg,
          cartPage.totalPrice
        );
        await runner.verifyElementIsVisible(homePage.navbarHome);
        await runner.verifyElementsAreEnabled(homePage.navbarHome);
        await runner.validateAndClick(
          homePage.navbarHome,
          homeData.navbar.home
        );
        await runner.refreshPage();
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.verifyElementsAreEnabled(homePage.navbarCart);
        await runner.validateAndClick(
          homePage.navbarCart,
          homeData.navbar.cart
        );
        await runner.wait(5, {
          waitForSelector: cartPage.cartedProductsImg,
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
        await runner.verifyElementIsVisible(homePage.productTitles);
        await runner.verifyElementsAreEnabled(homePage.productTitles);

        const clickedProductDetails: any = [];
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
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
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton);
        await runner.verifyElementsAreEnabled(
          productDetailPage.addToCartButton
        );

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          homeData.productDetails.buttonText
        );
        await runner.acceptWebAlert(cartData.porductAddedConfirmationAlert);
        await runner.wait(5, {
          waitForSelector: productDetailPage.productTitle,
        });

        clickedProductDetails.push(firstProductDetails);
        await runner.verifyElementIsVisible(homePage.navbarHome);
        await runner.verifyElementsAreEnabled(homePage.navbarHome);

        await runner.validateAndClick(
          homePage.navbarHome,
          homeData.navbar.home
        );
        await runner.wait(5, { waitForSelector: homePage.productContainer });

        await runner.verifyElementsIsExist(homePage.productContainer);
        await runner.verifyElementIsVisible(homePage.productTitles);
        await runner.verifyElementsAreEnabled(homePage.productTitles);

        const secondProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
          );
        await runner.wait(5, {
          waitForSelector: productDetailPage.productTitle,
        });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          secondProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton);
        await runner.verifyElementsAreEnabled(
          productDetailPage.addToCartButton
        );

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          homeData.productDetails.buttonText
        );
        await runner.acceptWebAlert(cartData.porductAddedConfirmationAlert);
        clickedProductDetails.push(secondProductDetails);

        console.log(clickedProductDetails);
        await runner.wait(5, { waitForSelector: homePage.navbarCart });
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.verifyElementsAreEnabled(homePage.navbarCart);
        await runner.validateAndClick(
          homePage.navbarCart,
          homeData.navbar.cart
        );
        await runner.wait(5, {
          waitForSelector: cartPage.cartedProductsImg,
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
        await runner.wait(5, {
          waitForSelector: cartPage.cartedProductsDetails,
        });
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
        await runner.verifyElementIsVisible(homePage.productTitles);
        await runner.verifyElementsAreEnabled(homePage.productTitles);

        const clickedProductDetails: any = [];
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
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
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton);
        await runner.verifyElementsAreEnabled(
          productDetailPage.addToCartButton
        );

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          homeData.productDetails.buttonText
        );
        await runner.acceptWebAlert(cartData.porductAddedConfirmationAlert);
        await runner.wait(5, {
          waitForSelector: productDetailPage.productTitle,
        });

        clickedProductDetails.push(firstProductDetails);
        await runner.verifyElementIsVisible(homePage.navbarHome);
        await runner.verifyElementsAreEnabled(homePage.navbarHome);

        await runner.validateAndClick(
          homePage.navbarHome,
          homeData.navbar.home
        );
        await runner.wait(5, { waitForSelector: homePage.productContainer });

        await runner.verifyElementsIsExist(homePage.productContainer);
        await runner.verifyElementIsVisible(homePage.productTitles);
        await runner.verifyElementsAreEnabled(homePage.productTitles);

        const secondProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
          );
        await runner.wait(5, {
          waitForSelector: productDetailPage.productTitle,
        });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          secondProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton);
        await runner.verifyElementsAreEnabled(
          productDetailPage.addToCartButton
        );

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          homeData.productDetails.buttonText
        );
        await runner.acceptWebAlert(cartData.porductAddedConfirmationAlert);
        clickedProductDetails.push(secondProductDetails);

        console.log(clickedProductDetails);
        await runner.wait(5, { waitForSelector: homePage.navbarCart });
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.verifyElementsAreEnabled(homePage.navbarCart);
        await runner.validateAndClick(
          homePage.navbarCart,
          homeData.navbar.cart
        );
        await runner.wait(5, {
          waitForSelector: cartPage.cartedProductsImg,
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
        await runner.verifyElementIsVisible(cartPage.placeOrderButton);
        await runner.verifyElementsAreEnabled(cartPage.placeOrderButton);
        await runner.validateAndClick(
          cartPage.placeOrderButton,
          cartData.placeOrderButtonText
        );
        await runner.wait(5, { waitForSelector: cartPage.orderModalHeader });

        await runner.verifyContainText(
          cartPage.orderModalHeader,
          cartData.orderModalHeaderText
        );
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
          cartData.requiredFieldConfirmationAlert
        );
        await runner.verifyElementIsVisible(
          cartPage.purchaseButtonInOrderModal
        );
        await runner.verifyElementsAreEnabled(
          cartPage.purchaseButtonInOrderModal
        );
        await runner.validateAndClick(
          cartPage.purchaseButtonInOrderModal,
          cartData.orderModalPurchaseButtonText
        );
      });
      test("Verify that order is not placed succesfully without name field", async ({
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
        await runner.verifyElementIsVisible(homePage.productTitles);
        await runner.verifyElementsAreEnabled(homePage.productTitles);

        const clickedProductDetails: any = [];
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
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
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton);
        await runner.verifyElementsAreEnabled(
          productDetailPage.addToCartButton
        );

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          homeData.productDetails.buttonText
        );
        await runner.acceptWebAlert(cartData.porductAddedConfirmationAlert);
        await runner.wait(5, {
          waitForSelector: productDetailPage.productTitle,
        });

        clickedProductDetails.push(firstProductDetails);
        await runner.verifyElementIsVisible(homePage.navbarHome);
        await runner.verifyElementsAreEnabled(homePage.navbarHome);

        await runner.validateAndClick(
          homePage.navbarHome,
          homeData.navbar.home
        );
        await runner.wait(5, { waitForSelector: homePage.productContainer });

        await runner.verifyElementsIsExist(homePage.productContainer);
        await runner.verifyElementIsVisible(homePage.productTitles);
        await runner.verifyElementsAreEnabled(homePage.productTitles);

        const secondProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
          );
        await runner.wait(5, {
          waitForSelector: productDetailPage.productTitle,
        });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          secondProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton);
        await runner.verifyElementsAreEnabled(
          productDetailPage.addToCartButton
        );

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          homeData.productDetails.buttonText
        );
        await runner.acceptWebAlert(cartData.porductAddedConfirmationAlert);
        clickedProductDetails.push(secondProductDetails);

        console.log(clickedProductDetails);
        await runner.wait(5, { waitForSelector: homePage.navbarCart });
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.verifyElementsAreEnabled(homePage.navbarCart);
        await runner.validateAndClick(
          homePage.navbarCart,
          homeData.navbar.cart
        );
        await runner.wait(5, {
          waitForSelector: cartPage.cartedProductsImg,
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
        await runner.verifyElementIsVisible(cartPage.placeOrderButton);
        await runner.verifyElementsAreEnabled(cartPage.placeOrderButton);
        await runner.validateAndClick(
          cartPage.placeOrderButton,
          cartData.placeOrderButtonText
        );
        await runner.wait(5, { waitForSelector: cartPage.orderModalHeader });

        await runner.verifyContainText(
          cartPage.orderModalHeader,
          cartData.orderModalHeaderText
        );
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

        await runner.handleAlertWithMessage(
          cartData.requiredFieldConfirmationAlert
        );
        await runner.verifyElementIsVisible(
          cartPage.purchaseButtonInOrderModal
        );
        await runner.verifyElementsAreEnabled(
          cartPage.purchaseButtonInOrderModal
        );
        await runner.validateAndClick(
          cartPage.purchaseButtonInOrderModal,
          cartData.orderModalPurchaseButtonText
        );
      });
      test("Verify that order is not placed succesfully without credit card field", async ({
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
        await runner.verifyElementIsVisible(homePage.productTitles);
        await runner.verifyElementsAreEnabled(homePage.productTitles);

        const clickedProductDetails: any = [];
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
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
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton);
        await runner.verifyElementsAreEnabled(
          productDetailPage.addToCartButton
        );

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          homeData.productDetails.buttonText
        );
        await runner.acceptWebAlert(cartData.porductAddedConfirmationAlert);
        await runner.wait(5, {
          waitForSelector: productDetailPage.productTitle,
        });

        clickedProductDetails.push(firstProductDetails);
        await runner.verifyElementIsVisible(homePage.navbarHome);
        await runner.verifyElementsAreEnabled(homePage.navbarHome);

        await runner.validateAndClick(
          homePage.navbarHome,
          homeData.navbar.home
        );
        await runner.wait(5, { waitForSelector: homePage.productContainer });

        await runner.verifyElementsIsExist(homePage.productContainer);
        await runner.verifyElementIsVisible(homePage.productTitles);
        await runner.verifyElementsAreEnabled(homePage.productTitles);

        const secondProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
          );
        await runner.wait(5, {
          waitForSelector: productDetailPage.productTitle,
        });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          secondProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton);
        await runner.verifyElementsAreEnabled(
          productDetailPage.addToCartButton
        );

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          homeData.productDetails.buttonText
        );
        await runner.acceptWebAlert(cartData.porductAddedConfirmationAlert);
        clickedProductDetails.push(secondProductDetails);

        console.log(clickedProductDetails);
        await runner.wait(5, { waitForSelector: homePage.navbarCart });
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.verifyElementsAreEnabled(homePage.navbarCart);
        await runner.validateAndClick(
          homePage.navbarCart,
          homeData.navbar.cart
        );
        await runner.wait(5, {
          waitForSelector: cartPage.cartedProductsImg,
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
        await runner.verifyElementIsVisible(cartPage.placeOrderButton);
        await runner.verifyElementsAreEnabled(cartPage.placeOrderButton);
        await runner.validateAndClick(
          cartPage.placeOrderButton,
          cartData.placeOrderButtonText
        );
        await runner.wait(5, { waitForSelector: cartPage.orderModalHeader });

        await runner.verifyContainText(
          cartPage.orderModalHeader,
          cartData.orderModalHeaderText
        );
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
          cartData.requiredFieldConfirmationAlert
        );
        await runner.verifyElementIsVisible(
          cartPage.purchaseButtonInOrderModal
        );
        await runner.verifyElementsAreEnabled(
          cartPage.purchaseButtonInOrderModal
        );
        await runner.validateAndClick(
          cartPage.purchaseButtonInOrderModal,
          cartData.orderModalPurchaseButtonText
        );
      });
      test("Verify that the details remains same after closing the modal", async ({
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
        await runner.verifyElementIsVisible(homePage.productTitles);
        await runner.verifyElementsAreEnabled(homePage.productTitles);

        const clickedProductDetails: any = [];
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
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
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton);
        await runner.verifyElementsAreEnabled(
          productDetailPage.addToCartButton
        );

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          homeData.productDetails.buttonText
        );
        await runner.acceptWebAlert(cartData.porductAddedConfirmationAlert);
        await runner.wait(5, {
          waitForSelector: productDetailPage.productTitle,
        });

        clickedProductDetails.push(firstProductDetails);
        await runner.verifyElementIsVisible(homePage.navbarHome);
        await runner.verifyElementsAreEnabled(homePage.navbarHome);

        await runner.validateAndClick(
          homePage.navbarHome,
          homeData.navbar.home
        );
        await runner.wait(5, { waitForSelector: homePage.productContainer });

        await runner.verifyElementsIsExist(homePage.productContainer);
        await runner.verifyElementIsVisible(homePage.productTitles);
        await runner.verifyElementsAreEnabled(homePage.productTitles);

        const secondProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
          );
        await runner.wait(5, {
          waitForSelector: productDetailPage.productTitle,
        });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          secondProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton);
        await runner.verifyElementsAreEnabled(
          productDetailPage.addToCartButton
        );

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          homeData.productDetails.buttonText
        );
        await runner.acceptWebAlert(cartData.porductAddedConfirmationAlert);
        clickedProductDetails.push(secondProductDetails);

        console.log(clickedProductDetails);
        await runner.wait(5, { waitForSelector: homePage.navbarCart });
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.verifyElementsAreEnabled(homePage.navbarCart);
        await runner.validateAndClick(
          homePage.navbarCart,
          homeData.navbar.cart
        );
        await runner.wait(5, {
          waitForSelector: cartPage.cartedProductsImg,
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
        await runner.verifyElementIsVisible(cartPage.placeOrderButton);
        await runner.verifyElementsAreEnabled(cartPage.placeOrderButton);
        await runner.validateAndClick(
          cartPage.placeOrderButton,
          cartData.placeOrderButtonText
        );
        await runner.wait(5, { waitForSelector: cartPage.orderModalHeader });

        await runner.verifyContainText(
          cartPage.orderModalHeader,
          cartData.orderModalHeaderText
        );
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

        await runner.verifyElementIsVisible(cartPage.closeButtonInOrderModal);
        await runner.verifyElementsAreEnabled(cartPage.closeButtonInOrderModal);
        await runner.validateAndClick(
          cartPage.closeButtonInOrderModal,
          cartData.orderModalCloseButtonText
        );

        await runner.wait(5, {
          waitForSelector: cartPage.placeOrderButton,
        });
        await runner.verifyElementIsVisible(cartPage.placeOrderButton);
        await runner.verifyElementsAreEnabled(cartPage.placeOrderButton);
        await runner.validateAndClick(
          cartPage.placeOrderButton,
          cartData.placeOrderButtonText
        );
        await runner.wait(5, { waitForLoadState: "load" });
        await runner.verifyContainsValue(
          cartPage.nameInputInOrderModal,
          fakeUser.username
        );
        await runner.verifyContainsValue(
          cartPage.countryInputInOrderModal,
          fakeUser.country
        );
        await runner.verifyContainsValue(
          cartPage.cityInputInOrderModal,
          fakeUser.city
        );
        await runner.verifyContainsValue(
          cartPage.creditCardInputInOrderModal,
          fakeUser.card
        );
        await runner.verifyContainsValue(
          cartPage.monthInputInOrderModal,
          fakeUser.month
        );
        await runner.verifyContainsValue(
          cartPage.yearInputInOrderModal,
          fakeUser.year
        );
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
        await runner.verifyElementIsVisible(homePage.productTitles);
        await runner.verifyElementsAreEnabled(homePage.productTitles);

        const clickedProductDetails: any = [];
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
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
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton);
        await runner.verifyElementsAreEnabled(
          productDetailPage.addToCartButton
        );

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          homeData.productDetails.buttonText
        );
        await runner.acceptWebAlert(cartData.porductAddedConfirmationAlert);
        await runner.wait(5, {
          waitForSelector: productDetailPage.productTitle,
        });

        clickedProductDetails.push(firstProductDetails);
        await runner.verifyElementIsVisible(homePage.navbarHome);
        await runner.verifyElementsAreEnabled(homePage.navbarHome);

        await runner.validateAndClick(
          homePage.navbarHome,
          homeData.navbar.home
        );
        await runner.wait(5, { waitForSelector: homePage.productContainer });

        await runner.verifyElementsIsExist(homePage.productContainer);
        await runner.verifyElementIsVisible(homePage.productTitles);
        await runner.verifyElementsAreEnabled(homePage.productTitles);

        const secondProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
          );
        await runner.wait(5, {
          waitForSelector: productDetailPage.productTitle,
        });
        await runner.verifyUrlContains(envData.productUrl);
        await runner.verifyElementsIsExist(productDetailPage.productTitle);
        await runner.validateProductDetailsOnDetailPage(
          secondProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );
        await runner.verifyElementIsVisible(productDetailPage.addToCartButton);
        await runner.verifyElementsAreEnabled(
          productDetailPage.addToCartButton
        );

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          homeData.productDetails.buttonText
        );
        await runner.acceptWebAlert(cartData.porductAddedConfirmationAlert);
        clickedProductDetails.push(secondProductDetails);

        console.log(clickedProductDetails);
        await runner.wait(5, { waitForSelector: homePage.navbarCart });
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.verifyElementsAreEnabled(homePage.navbarCart);
        await runner.validateAndClick(
          homePage.navbarCart,
          homeData.navbar.cart
        );
        await runner.wait(5, {
          waitForSelector: cartPage.cartedProductsImg,
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
        await runner.verifyElementIsVisible(cartPage.placeOrderButton);
        await runner.verifyElementsAreEnabled(cartPage.placeOrderButton);
        await runner.validateAndClick(
          cartPage.placeOrderButton,
          cartData.placeOrderButtonText
        );
        await runner.wait(5, { waitForSelector: cartPage.orderModalHeader });

        await runner.verifyContainText(
          cartPage.orderModalHeader,
          cartData.orderModalHeaderText
        );
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

        await runner.verifyElementIsVisible(
          cartPage.purchaseButtonInOrderModal
        );
        await runner.verifyElementsAreEnabled(
          cartPage.purchaseButtonInOrderModal
        );
        await runner.validateAndClick(
          cartPage.purchaseButtonInOrderModal,
          cartData.orderModalPurchaseButtonText
        );
        await runner.wait(5, {
          waitForSelector: cartPage.purchaseCofimationMessageAlert,
        });
        await runner.verifyContainText(
          cartPage.purchaseCofimationMessageAlert,
          cartData.sucessfulOrderConfirmationMessage
        );
        await runner.verifyContainsDigit(
          cartPage.purchaseCofimationDetailsInAlert
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
        // This is a genuine Bug that the date is 1 month behind of the current date
        await runner.verifyContainsTodayDate(
          cartPage.purchaseCofimationDetailsInAlert
        );
        await runner.verifyElementIsVisible(cartPage.okButtonInAlert);
        await runner.verifyElementsAreEnabled(cartPage.okButtonInAlert);

        await runner.validateAndClick(
          cartPage.okButtonInAlert,
          cartData.okButtonInAlertText
        );
        await runner.wait(5, { waitForSelector: homePage.homePageLogo });
        await runner.verifyUrlContains(envData.homeButtonClickUrl);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.verifyElementsAreEnabled(homePage.navbarCart);
        await runner.validateAndClick(
          homePage.navbarCart,
          homeData.navbar.cart
        );
        await runner.wait(5, { waitForLoadState: "load" });
        await runner.getCartProductCount(cartPage.cartedProductsDetails);
      });
    });
  }
}

const cartPageTest = new CartPage();
cartPageTest.runTest();
