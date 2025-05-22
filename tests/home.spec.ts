import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";
import homeData from "../testData/home.json";

class HomePageTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  // test("Verify ", async ({
  //       runner,
  //       homePage,
  //     }) => {

  //     });

  runTest() {
    test.describe("Home Page Functionality Test", () => {
      test.beforeEach(async ({ runner, envData, homePage }) => {
        await runner.navigateTo(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
      });

      test("Verify homepage reloads on logo button click", async ({
        runner,
        homePage,
      }) => {
        await runner.getAttributeFromLocator(homePage.homePageLogoImage, "src");
        await runner.verifyContainText(homePage.homePageLogo, "PRODUCT STORE");
        await runner.clickOnElement(homePage.homePageLogo);
        await runner.wait(2);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
      });

      test("Verify navigation bar is displayed correctly", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.navbarHome);
        await runner.verifyContainText(homePage.navbarHome, "Home");
        await runner.verifyElementIsVisible(homePage.navbarContact);
        await runner.verifyContainText(homePage.navbarContact, "Contact");
        await runner.verifyElementIsVisible(homePage.navbarAbout);
        await runner.verifyContainText(homePage.navbarAbout, "About us");
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.verifyContainText(homePage.navbarCart, "Cart");
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.verifyContainText(homePage.navbarLogin, "Log in");
        await runner.verifyElementIsVisible(homePage.navbarSignup);
        await runner.verifyContainText(homePage.navbarSignup, "Sign up");
      });

      test("Verify hero banner carousel is displayed, functional, and auto changes", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyCarouselIsAutoChanging(
          homePage.carousel,
          homePage.activeCarouselImage
        );
      });

      test("Verify hero banner carousel arrows change displayed product", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyCarouselArrowNavigation(
          homePage.carousel,
          homePage.activeCarouselImage,
          homePage.carouselNextButton,
          homePage.carouselPreviousButton
        );
      });

      test("Verify that the homepage loads with featured products visible", async ({
        runner,
        homePage,
      }) => {
        await runner.validateProductContainers(homePage.productContainer);
      });

      test("Verify filtering works by 'Phones', 'Laptops', 'Monitors' and resets filtering on click on categories tab", async ({
        runner,
        homePage,
      }) => {
        // Validate "Phones"
        await runner.verifyElementIsVisible(homePage.categoriesHeader);
        await runner.verifyContainText(homePage.categoriesHeader, "CATEGORIES");

        await runner.verifyElementIsVisible(homePage.categoriesPhones);
        await runner.verifyContainText(homePage.categoriesPhones, "Phones");
        await runner.clickOnElement(homePage.categoriesPhones);
        await runner.validateProductContainers(homePage.productContainer);
        await runner.verifyContainText(
          homePage.firstProductCardTitle,
          "Samsung galaxy s6"
        );
        await runner.verifyContainText(
          homePage.secondProductCardTitle,
          "Nokia lumia 1520"
        );

        // Validate "Laptops"
        await runner.verifyElementIsVisible(homePage.categoriesLaptops);
        await runner.verifyContainText(homePage.categoriesLaptops, "Laptops");
        await runner.clickOnElement(homePage.categoriesLaptops);
        await runner.validateProductContainers(homePage.productContainer);
        await runner.verifyContainText(
          homePage.firstProductCardTitle,
          "Sony vaio i5"
        );
        await runner.verifyContainText(
          homePage.secondProductCardTitle,
          "Sony vaio i7"
        );

        // Validate "Monitors"
        await runner.verifyElementIsVisible(homePage.categoriesMonitors);
        await runner.verifyContainText(homePage.categoriesMonitors, "Monitors");
        await runner.clickOnElement(homePage.categoriesMonitors);
        await runner.validateProductContainers(homePage.productContainer);
        await runner.verifyContainText(
          homePage.firstProductCardTitle,
          "Apple monitor 24"
        );
        await runner.verifyContainText(
          homePage.secondProductCardTitle,
          "ASUS Full HD"
        );

        // Reset filtering by clicking "CATEGORIES"
        await runner.clickOnElement(homePage.categoriesHeader);
        await runner.validateProductContainers(homePage.productContainer);
      });

      test("Verify homepage reloads and resets filters on 'Home' navbar click", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyContainText(
          homePage.firstProductCardTitle,
          "Samsung galaxy s6"
        );
        await runner.verifyContainText(
          homePage.secondProductCardTitle,
          "Nokia lumia 1520"
        );
        await runner.clickOnElement(homePage.categoriesLaptops);
        await runner.verifyContainText(
          homePage.firstProductCardTitle,
          "Sony vaio i5"
        );
        await runner.verifyContainText(
          homePage.secondProductCardTitle,
          "Sony vaio i7"
        );
        await runner.clickOnElement(homePage.navbarHome);
        await runner.wait(1, { waitForLoadState: "load" });
        await runner.verifyContainText(
          homePage.firstProductCardTitle,
          "Samsung galaxy s6"
        );
        await runner.verifyContainText(
          homePage.secondProductCardTitle,
          "Nokia lumia 1520"
        );
      });

      test("Verify clicking 'Categories' reloads homepage and shows all products", async ({
        runner,
        homePage,
      }) => {
        await runner.clickOnElement(homePage.categoriesLaptops);
        await runner.verifyContainText(
          homePage.firstProductCardTitle,
          "Sony vaio i5"
        );
        await runner.verifyContainText(
          homePage.secondProductCardTitle,
          "Sony vaio i7"
        );
        await runner.clickOnElement(homePage.categoriesHeader);
        await runner.wait(1, { waitForLoadState: "load" });
        await runner.verifyContainText(
          homePage.firstProductCardTitle,
          "Samsung galaxy s6"
        );
        await runner.verifyContainText(
          homePage.secondProductCardTitle,
          "Nokia lumia 1520"
        );
      });

      test("Verify pagination controls and product count per page", async ({
        runner,
        homePage,
      }) => {
        await runner.validateProductContainers(homePage.productContainer);
        await runner.verifyElementIsVisible(homePage.paginationPreviousButton);
        await runner.verifyElementIsVisible(homePage.paginationNextButton);
        await runner.verifyContainText(
          homePage.paginationPreviousButton,
          "Previous"
        );
        await runner.verifyContainText(homePage.paginationNextButton, "Next");
        await runner.wait(1, { waitForLoadState: "load" });
        await runner.validateProductContainers(homePage.productContainer);
      });

      test("Verify product content is valid on the first page of pagination", async ({
        runner,
        homePage,
      }) => {
        await runner.validateProductContainers(homePage.productContainer);
        await runner.validateProductImages(homePage.productImage);
        await runner.validateProductTitles(homePage.productTitle);
        await runner.validateProductPrices(homePage.productPrice);
        await runner.validateProductDescriptions(homePage.productDescription);
      });

      test("Verify product content is valid on the second page of pagination", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.paginationNextButton);
        await runner.waitForProductChangeAfterPagination(
          homePage.paginationNextButton,
          homePage.firstProductTitle
        );

        await runner.validateProductContainers(homePage.productContainer);
        await runner.validateProductImages(homePage.productImage);
        await runner.validateProductTitles(homePage.productTitle);
        await runner.validateProductPrices(homePage.productPrice);
        await runner.validateProductDescriptions(homePage.productDescription);
      });

      // test("Verify Verify returning to first page with previous button click shows correct products", async ({
      //       runner,
      //       homePage,
      //     }) => {
      // in this test I need to store the data of first page's products to match with again visit first page's products
      //     });

      test("Verify clicking product image navigates to product detail page", async ({
        runner,
        homePage,
        productDetailPage,
      }) => {
        await runner.clickOnElement(homePage.firstProductImage);
        await runner.verifyElementIsVisible(
          productDetailPage.firstProductTitle
        );
        await runner.verifyElementIsVisible(
          productDetailPage.firstProductPrice
        );
        await runner.verifyElementIsVisible(
          productDetailPage.firstProductDescription
        );
      });

      // ------------------------------------------------------------------------------------------

      test("Verify clicking product title navigates to product detail page", async ({
        runner,
        homePage,
        productDetailPage,
      }) => {
        await runner.clickOnElement(homePage.firstProductTitle);
        await runner.verifyElementIsVisible(
          productDetailPage.firstProductTitle
        );
        await runner.verifyElementIsVisible(
          productDetailPage.firstProductPrice
        );
        await runner.verifyElementIsVisible(
          productDetailPage.firstProductDescription
        );
      });

      test("Verify pagination 'Next' and 'Previous' buttons work correctly", async ({
        runner,
        homePage,
      }) => {
        // await runner.verifyPaginationWorks({
        //   container: homePage.productCardSelectors.container,
        //   title: homePage.productCardSelectors.title,
        //   nextButton: homePage.paginationNextButton,
        //   previousButton: homePage.paginationPreviousButton,
        // });
      });

      test("Verify footer is present with copyright text", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.footer);
        await runner.verifyContainText(
          homePage.footerText,
          homeData.expectedFooterText
        );
      });

      test("Verify navbar links open correct modals ('Contact', 'Login', 'Sign up', 'About Us')", async ({
        runner,
        homePage,
        loginModal,
        signUpModal,
        contactModal,
        aboutModal,
      }) => {
        await runner.verifyElementIsVisible(homePage.navbarContact);
        await runner.clickOnElement(homePage.navbarContact);
        await runner.verifyElementIsVisible(contactModal.title);
        await runner.clickOnElement(contactModal.closeButton);
        await runner.wait(1);

        await runner.verifyElementIsVisible(homePage.navbarAbout);
        await runner.clickOnElement(homePage.navbarAbout);
        await runner.verifyElementIsVisible(aboutModal.title);
        await runner.clickOnElement(aboutModal.closeButton);
        await runner.wait(1);

        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.clickOnElement(homePage.navbarLogin);
        await runner.verifyElementIsVisible(loginModal.loginModalLabel);
        await runner.clickOnElement(loginModal.closeButton);
        await runner.wait(1);

        await runner.verifyElementIsVisible(homePage.navbarSignup);
        await runner.clickOnElement(homePage.navbarSignup);
        await runner.verifyElementIsVisible(signUpModal.signUpModalLabel);
        await runner.clickOnElement(signUpModal.closeButton);
      });

      test("Verify cart button in navbar navigates to cart page", async ({
        runner,
        homePage,
        cartPage,
      }) => {
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.clickOnElement(homePage.navbarCart);
        await runner.verifyContainText(cartPage.cartPageTitle, "Products");
      });
    });
  }
}

new HomePageTest().runTest();
