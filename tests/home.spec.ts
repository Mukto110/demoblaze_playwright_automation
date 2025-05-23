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
        await runner.verifyContainText(
          homePage.homePageLogo,
          homeData.homeLogoText
        );
        await runner.clickOnElement(homePage.homePageLogo);
        await runner.wait(2);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
      });

      test("Verify navigation bar is displayed correctly", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.navbarHome);
        await runner.verifyContainText(
          homePage.navbarHome,
          homeData.navbar.home
        );
        await runner.verifyElementIsVisible(homePage.navbarContact);
        await runner.verifyContainText(
          homePage.navbarContact,
          homeData.navbar.contact
        );
        await runner.verifyElementIsVisible(homePage.navbarAbout);
        await runner.verifyContainText(
          homePage.navbarAbout,
          homeData.navbar.contact
        );
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.verifyContainText(
          homePage.navbarCart,
          homeData.navbar.cart
        );
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.verifyContainText(
          homePage.navbarLogin,
          homeData.navbar.login
        );
        await runner.verifyElementIsVisible(homePage.navbarSignup);
        await runner.verifyContainText(
          homePage.navbarSignup,
          homeData.navbar.signup
        );
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
        await runner.verifyElementIsVisible(homePage.categoriesHeader);
        await runner.verifyContainText(
          homePage.categoriesHeader,
          homeData.categories.header
        );

        // Validate "Phones"
        await runner.verifyElementIsVisible(homePage.categoriesPhones);
        await runner.verifyContainText(
          homePage.categoriesPhones,
          homeData.categories.phones.name
        );
        await runner.clickOnElement(homePage.categoriesPhones);
        await runner.validateProductContainers(homePage.productContainer);
        await runner.verifyContainText(
          homePage.firstProductCardTitle,
          homeData.categories.phones.firstProduct
        );
        await runner.verifyContainText(
          homePage.secondProductCardTitle,
          homeData.categories.phones.secondProduct
        );

        // Validate "Laptops"
        await runner.verifyElementIsVisible(homePage.categoriesLaptops);
        await runner.verifyContainText(
          homePage.categoriesLaptops,
          homeData.categories.laptops.name
        );
        await runner.clickOnElement(homePage.categoriesLaptops);
        await runner.validateProductContainers(homePage.productContainer);
        await runner.verifyContainText(
          homePage.firstProductCardTitle,
          homeData.categories.laptops.firstProduct
        );
        await runner.verifyContainText(
          homePage.secondProductCardTitle,
          homeData.categories.laptops.secondProduct
        );

        // Validate "Monitors"
        await runner.verifyElementIsVisible(homePage.categoriesMonitors);
        await runner.verifyContainText(
          homePage.categoriesMonitors,
          homeData.categories.monitors.name
        );
        await runner.clickOnElement(homePage.categoriesMonitors);
        await runner.validateProductContainers(homePage.productContainer);
        await runner.verifyContainText(
          homePage.firstProductCardTitle,
          homeData.categories.monitors.firstProduct
        );
        await runner.verifyContainText(
          homePage.secondProductCardTitle,
          homeData.categories.monitors.secondProduct
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
          homeData.productCardTitles.homePage.first
        );
        await runner.verifyContainText(
          homePage.secondProductCardTitle,
          homeData.productCardTitles.homePage.second
        );
        await runner.clickOnElement(homePage.categoriesLaptops);
        await runner.verifyContainText(
          homePage.firstProductCardTitle,
          homeData.categories.laptops.firstProduct
        );
        await runner.verifyContainText(
          homePage.secondProductCardTitle,
          homeData.categories.laptops.secondProduct
        );
        await runner.clickOnElement(homePage.navbarHome);
        await runner.wait(1, { waitForLoadState: "load" });
        await runner.verifyContainText(
          homePage.firstProductCardTitle,
          homeData.productCardTitles.homePage.first
        );
        await runner.verifyContainText(
          homePage.secondProductCardTitle,
          homeData.productCardTitles.homePage.second
        );
      });

      test("Verify clicking 'Categories' reloads homepage and shows all products", async ({
        runner,
        homePage,
      }) => {
        await runner.clickOnElement(homePage.categoriesLaptops);
        await runner.verifyContainText(
          homePage.firstProductCardTitle,
          homeData.categories.laptops.firstProduct
        );
        await runner.verifyContainText(
          homePage.secondProductCardTitle,
          homeData.categories.laptops.secondProduct
        );
        await runner.clickOnElement(homePage.categoriesHeader);
        await runner.wait(1, { waitForLoadState: "load" });
        await runner.verifyContainText(
          homePage.firstProductCardTitle,
          homeData.productCardTitles.homePage.first
        );
        await runner.verifyContainText(
          homePage.secondProductCardTitle,
          homeData.productCardTitles.homePage.second
        );
      });

      test("Verify pagination controls with next and previous button", async ({
        runner,
        homePage,
      }) => {
        await runner.validateProductContainers(homePage.productContainer);
        await runner.verifyElementIsVisible(homePage.paginationPreviousButton);
        await runner.verifyElementIsVisible(homePage.paginationNextButton);
        await runner.verifyContainText(
          homePage.paginationPreviousButton,
          homeData.pagination.previous
        );
        await runner.verifyContainText(
          homePage.paginationNextButton,
          homeData.pagination.next
        );
        await runner.clickOnElement(homePage.paginationNextButton);
        await runner.wait(1, { waitForLoadState: "load" });
        await runner.validateProductContainers(homePage.productContainer);
        await runner.clickOnElement(homePage.paginationPreviousButton);
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

      // test("Verify returning to first page with previous button click shows correct products", async ({
      //       runner,
      //       homePage,
      //     }) => {
      // in this test I need to store the data of first page's products to match with again visit first page's products
      //     });

      test("Verify clicking on a product image navigates to the correct product detail page", async ({
        runner,
        homePage,
        productDetailPage,
      }) => {
        await runner.clickOnElement(homePage.firstProductImage);
        await runner.wait(1);
        await runner.verifyUrlContains(
          homeData.productDetails.firstProduct.urlFragment
        );
        await runner.verifyElementIsVisible(productDetailPage.productTitle);
        await runner.verifyContainText(
          productDetailPage.productTitle,
          homeData.productDetails.firstProduct.title
        );
        await runner.verifyElementIsVisible(productDetailPage.productPrice);
        await runner.verifyContainText(
          productDetailPage.productPrice,
          homeData.productDetails.firstProduct.price
        );
        await runner.goBack();
        await runner.wait(1);
        await runner.clickOnElement(homePage.secondProductImage);
        await runner.wait(1);
        await runner.verifyUrlContains(
          homeData.productDetails.secondProduct.urlFragment
        );
        await runner.verifyContainText(
          productDetailPage.productTitle,
          homeData.productDetails.secondProduct.title
        );
        await runner.verifyContainText(
          productDetailPage.productPrice,
          homeData.productDetails.secondProduct.price
        );
      });

      // ------------------------------------------------------------------------------------------

      test("Verify clicking product title navigates to product detail page", async ({
        runner,
        homePage,
        productDetailPage,
      }) => {
        // await runner.clickOnElement(homePage.firstProductTitle);
        // await runner.verifyElementIsVisible(productDetailPage.productTitle);
        // await runner.verifyElementIsVisible(productDetailPage.productPrice);
        // await runner.verifyElementIsVisible(
        //   productDetailPage.firstProductDescription
        // );
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
          homeData.footer.copyright
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
