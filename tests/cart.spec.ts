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
        envData,
      }) => {
        await runner.validateAndClick(homePage.navbarCart, "Cart");
        await runner.verifyUrlContains(envData.cartUrl);
        await runner.verifyContainText(cartPage.cartPageTitle, "Products");
        await runner.verifyContainText(cartPage.picSection, "Pic");
        await runner.verifyContainText(cartPage.titleSection, "Title");
        await runner.verifyContainText(cartPage.priceSection, "Price");
        await runner.verifyContainText(cartPage.closeSection, "x");
        await runner.verifyContainText(cartPage.totalText, "Total");
        await runner.verifyContainText(
          cartPage.placeOrderButton,
          "Place Order"
        );
      });

      test("Verify that single product can be added to the cart from the product detail page", async ({
        runner,
        homePage,
        cartPage,
        envData,
        productDetailPage,
      }) => {
        await runner.validateProductContainers(homePage.productContainer);
        await runner.validateProductTitles(homePage.productTitles);
        await runner.validateProductPrices(homePage.productPrices);
        await runner.validateProductDescriptions(homePage.productDescriptions);
        const clickedProductDetails: any = [];
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles,
            homePage.productTitles,
            homePage.productPrices,
            homePage.productImages
          );
        await runner.waitUntilSeconds(2);

        await runner.verifyUrlContains(envData.productUrl);
        await runner.validateProductDetailsOnDetailPage(
          firstProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );

        clickedProductDetails.push(firstProductDetails);

        await runner.validateAndClick(
          productDetailPage.addToCartButton,
          "Add to cart"
        );
        await runner.acceptWebAlert("Product added");

        console.log(clickedProductDetails);
        await runner.validateAndClick(homePage.navbarCart, "Cart");
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
        await runner.validateProductContainers(homePage.productContainer);
        await runner.validateProductTitles(homePage.productTitles);
        await runner.validateProductPrices(homePage.productPrices);
        await runner.validateProductDescriptions(homePage.productDescriptions);
        const clickedProductDetails: any = [];
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles,
            homePage.productTitles,
            homePage.productPrices,
            homePage.productImages
          );
        await runner.waitUntilSeconds(2);
        await runner.verifyUrlContains(envData.productUrl);
        clickedProductDetails.push(firstProductDetails);
        await runner.validateProductDetailsOnDetailPage(
          firstProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );

        await runner.validateAndClickButton(
          productDetailPage.addToCartButton,
          "Add to cart button",
          { expectedText: "Add to cart", waitForLoadState: "load" }
        );
        await runner.acceptWebAlert("Product added");
        await runner.clickOnElement(homePage.navbarHome);

        await runner.validateProductContainers(homePage.productContainer);

        const secondProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles,
            homePage.productTitles,
            homePage.productPrices,
            homePage.productImages
          );
        await runner.waitUntilSeconds(2);
        await runner.verifyUrlContains(envData.productUrl);
        await runner.validateProductDetailsOnDetailPage(
          secondProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );
        clickedProductDetails.push(secondProductDetails);

        await runner.validateAndClickButton(
          productDetailPage.addToCartButton,
          "Add to cart button",
          { expectedText: "Add to cart", waitForLoadState: "load" }
        );
        await runner.acceptWebAlert("Product added");

        console.log(clickedProductDetails);
        await runner.validateAndClick(homePage.navbarCart, "Cart");
        await runner.validateProductsInCart(
          clickedProductDetails,
          cartPage.cartedProductsDetails,
          cartPage.cartedProductsTitle,
          cartPage.cartedProductsPrice,
          cartPage.cartedProductsImg,
          cartPage.totalPrice
        );
      });
      test("Verify that after reload cart remains same,delete a product succesfully", async ({
        runner,
        homePage,
        cartPage,
        envData,
        productDetailPage,
      }) => {
        await runner.validateProductContainers(homePage.productContainer);
        await runner.validateProductTitles(homePage.productTitles);
        await runner.validateProductPrices(homePage.productPrices);
        await runner.validateProductDescriptions(homePage.productDescriptions);
        const clickedProductDetails: any = [];
        const firstProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles,
            homePage.productTitles,
            homePage.productPrices,
            homePage.productImages
          );
        await runner.waitUntilSeconds(3);
        await runner.verifyUrlContains(envData.productUrl);
        await runner.validateProductDetailsOnDetailPage(
          firstProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );
        clickedProductDetails.push(firstProductDetails);

        await runner.validateAndClickButton(
          productDetailPage.addToCartButton,
          "Add to cart button",
          { expectedText: "Add to cart", waitForLoadState: "load" }
        );
        await runner.acceptWebAlert("Product added");
        await runner.clickOnElement(homePage.navbarHome);

        await runner.validateProductContainers(homePage.productContainer);

        const secondProductDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles,
            homePage.productTitles,
            homePage.productPrices,
            homePage.productImages
          );
        await runner.waitUntilSeconds(2);
        await runner.verifyUrlContains(envData.productUrl);
        await runner.validateProductDetailsOnDetailPage(
          secondProductDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );
        clickedProductDetails.push(secondProductDetails);

        await runner.validateAndClickButton(
          productDetailPage.addToCartButton,
          "Add to cart button",
          { expectedText: "Add to cart", waitForLoadState: "load" }
        );
        await runner.acceptWebAlert("Product added");

        console.log(clickedProductDetails);
        await runner.validateAndClick(homePage.navbarCart, "Cart");
        await runner.validateProductsInCart(
          clickedProductDetails,
          cartPage.cartedProductsDetails,
          cartPage.cartedProductsTitle,
          cartPage.cartedProductsPrice,
          cartPage.cartedProductsImg,
          cartPage.totalPrice
        );
        await runner.validateAndClick(homePage.navbarHome, "Home (current)");
        await runner.refreshPage();
        await runner.validateAndClick(homePage.navbarCart, "Cart");
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

        // console.log(updatedExpectedProducts)
        await runner.waitUntilSeconds(2);
        await runner.validateProductsInCart(
          updatedExpectedProducts,
          cartPage.cartedProductsDetails,
          cartPage.cartedProductsTitle,
          cartPage.cartedProductsPrice,
          cartPage.cartedProductsImg,
          cartPage.totalPrice
        );
      });
    });
  }
}

const cartPageTest = new CartPage();
cartPageTest.runTest();
