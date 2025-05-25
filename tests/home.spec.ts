import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";
import homeData from "../testData/home.json";
import contactData from "../testData/contact.json";
import aboutData from "../testData/aboutUs.json";
import loginData from "../testData/login.json";
import signupData from "../testData/signup.json";
import cartData from "../testData/cart.json";

class HomePageTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("Home Page Functionality Test", () => {
      test.beforeEach(async ({ runner, envData, homePage }) => {
        await runner.navigateTo(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
        await runner.validateAttribute(
          homePage.homePageLogoImage,
          "src",
          "bm.png"
        );
        await runner.verifyContainText(
          homePage.homePageLogo,
          homeData.homeLogoText
        );
        await runner.wait(1, { waitForLoadState: "load" });
      });

      test("Verify homepage reloads on logo button click", async ({
        runner,
        envData,
        homePage,
      }) => {
        await runner.clickOnElement(homePage.homePageLogo);
        await runner.verifyUrlContains(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
        await runner.validateAttribute(
          homePage.homePageLogoImage,
          "src",
          "bm.png"
        );
        await runner.verifyContainText(
          homePage.homePageLogo,
          homeData.homeLogoText
        );
      });

      test("Verify navbar buttons interaction", async ({
        runner,
        homePage,
        loginModal,
        signUpModal,
        contactModal,
        aboutModal,
      }) => {
        // contact modal
        await runner.verifyElementIsVisible(homePage.navbarContact);
        await runner.verifyContainText(
          homePage.navbarContact,
          homeData.navbar.contact
        );
        await runner.clickOnElement(homePage.navbarContact);
        await runner.verifyElementIsVisible(contactModal.title);
        await runner.verifyContainText(
          contactModal.title,
          contactData.contactModalTitle
        );
        await runner.clickOnElement(contactModal.closeButton);

        // about us modal
        await runner.verifyElementIsVisible(homePage.navbarAbout);
        await runner.verifyContainText(
          homePage.navbarAbout,
          homeData.navbar.about
        );
        await runner.clickOnElement(homePage.navbarAbout);
        await runner.verifyElementIsVisible(aboutModal.title);
        await runner.verifyContainText(
          aboutModal.title,
          aboutData.aboutUsTitle
        );
        await runner.clickOnElement(aboutModal.closeButton);

        // login modal
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.verifyContainText(
          homePage.navbarLogin,
          homeData.navbar.login
        );
        await runner.clickOnElement(homePage.navbarLogin);
        await runner.verifyElementIsVisible(loginModal.loginModalTitle);
        await runner.verifyContainText(
          loginModal.loginModalTitle,
          loginData.loginModalTitle
        );
        await runner.clickOnElement(loginModal.closeButton);

        // signup modal
        await runner.verifyElementIsVisible(homePage.navbarSignup);
        await runner.verifyContainText(
          homePage.navbarSignup,
          homeData.navbar.signup
        );
        await runner.clickOnElement(homePage.navbarSignup);
        await runner.verifyElementIsVisible(signUpModal.signUpModalTitle);
        await runner.verifyContainText(
          signUpModal.signUpModalTitle,
          signupData.signUpModalTitle
        );
        await runner.clickOnElement(signUpModal.closeButton);
      });

      test("Verify cart button in navbar navigates to cart page", async ({
        runner,
        homePage,
        cartPage,
      }) => {
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.validateAndClick(
          homePage.navbarCart,
          homeData.navbar.cart
        );
        await runner.verifyUrlContains(cartData.cartUrlFragment);
        await runner.verifyContainText(
          cartPage.cartPageTitle,
          cartData.cartPageHeader
        );
      });

      test("Verify hero banner carousel is displayed, functional, and auto changes", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.carousel);
        await runner.validateAttributeExistsForAllElements(
          homePage.carouselImages,
          "src"
        );
        await runner.verifyAllCarouselImagesAutoChange(
          homePage.activeCarouselImage,
          homePage.carouselImages
        );
      });

      test("Verify hero banner carousel arrows change displayed image", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.carouselPreviousButton);
        await runner.verifyElementIsVisible(homePage.carouselNextButton);
        await runner.verifyCarouselArrowNavigation(
          homePage.activeCarouselImage,
          homePage.carouselImages,
          homePage.carouselNextButton,
          homePage.carouselPreviousButton
        );
      });

      test("Verify filtering phone tab interactions", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.categoriesPhones);
        await runner.validateAttribute(
          homePage.categoriesPhones,
          "onclick",
          "byCat('phone')"
        );
        await runner.validateAndClick(
          homePage.categoriesPhones,
          homeData.categories.phones
        );
        await runner.waitUntilSeconds(1);
        await runner.verifyElementsIsExist(homePage.productImage, true);
        await runner.verifyElementsIsExist(homePage.productTitle);
        await runner.verifyElementsIsExist(homePage.productPrice);
        await runner.verifyElementsIsExist(homePage.productDescription);
      });

      test("Verify filtering laptop tab interactions", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.categoriesLaptops);
        await runner.validateAttribute(
          homePage.categoriesLaptops,
          "onclick",
          "byCat('notebook')"
        );
        await runner.validateAndClick(
          homePage.categoriesLaptops,
          homeData.categories.laptops
        );
        await runner.waitUntilSeconds(1);
        await runner.verifyElementsIsExist(homePage.productImage, true);
        await runner.verifyElementsIsExist(homePage.productTitle);
        await runner.verifyElementsIsExist(homePage.productPrice);
        await runner.verifyElementsIsExist(homePage.productDescription);
      });

      test("Verify filtering monitors tab interactions", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.categoriesMonitors);
        await runner.validateAttribute(
          homePage.categoriesMonitors,
          "onclick",
          "byCat('monitor')"
        );
        await runner.validateAndClick(
          homePage.categoriesMonitors,
          homeData.categories.monitors
        );
        await runner.waitUntilSeconds(1);
        await runner.verifyElementsIsExist(homePage.productImage, true);
        await runner.verifyElementsIsExist(homePage.productTitle);
        await runner.verifyElementsIsExist(homePage.productPrice);
        await runner.verifyElementsIsExist(homePage.productDescription);
      });

      test("Verify homepage reloads and resets filters on 'Home' navbar click", async ({
        runner,
        envData,
        homePage,
      }) => {
        // verify homepage products
        await runner.verifyElementsIsExist(homePage.productTitle);
        await runner.verifyElementsIsExist(homePage.productPrice);
        await runner.verifyElementsIsExist(homePage.productDescription);
        await runner.verifyElementsIsExist(homePage.productImage, true);

        // click on laptops tab to show laptops products
        await runner.validateAndClick(
          homePage.categoriesLaptops,
          homeData.categories.laptops
        );
        await runner.wait(1, { waitForLoadState: "load" });
        await runner.verifyElementsIsExist(homePage.productTitle);
        await runner.verifyElementsIsExist(homePage.productPrice);
        await runner.verifyElementsIsExist(homePage.productDescription);
        await runner.verifyElementsIsExist(homePage.productImage, true);

        // click on home button and reset filter
        await runner.validateAndClick(
          homePage.navbarHome,
          homeData.navbar.home
        );
        await runner.wait(1, { waitForLoadState: "load" });
        await runner.verifyUrlContains(envData.homeButtonClickUrl);
        await runner.verifyElementsIsExist(homePage.productTitle);
        await runner.verifyElementsIsExist(homePage.productPrice);
        await runner.verifyElementsIsExist(homePage.productDescription);
        await runner.verifyElementsIsExist(homePage.productImage, true);
      });

      test("Verify clicking 'Categories' reloads homepage and shows all products", async ({
        runner,
        envData,
        homePage,
      }) => {
        // verify homepage products
        await runner.verifyElementsIsExist(homePage.productTitle);
        await runner.verifyElementsIsExist(homePage.productPrice);
        await runner.verifyElementsIsExist(homePage.productDescription);
        await runner.verifyElementsIsExist(homePage.productImage, true);

        // click on laptops tab to show laptops products
        await runner.validateAndClick(
          homePage.categoriesLaptops,
          homeData.categories.laptops
        );
        await runner.wait(1, { waitForLoadState: "load" });
        await runner.verifyElementsIsExist(homePage.productTitle);
        await runner.verifyElementsIsExist(homePage.productPrice);
        await runner.verifyElementsIsExist(homePage.productDescription);
        await runner.verifyElementsIsExist(homePage.productImage, true);

        // click on categories header and reset filter
        await runner.validateAndClick(
          homePage.categoriesHeader,
          homeData.categories.header
        );
        await runner.wait(1, { waitForLoadState: "load" });
        await runner.verifyUrlContains(envData.baseUrl);
        await runner.verifyElementsIsExist(homePage.productTitle);
        await runner.verifyElementsIsExist(homePage.productPrice);
        await runner.verifyElementsIsExist(homePage.productDescription);
        await runner.verifyElementsIsExist(homePage.productImage, true);
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
        await runner.verifyElementsIsExist(homePage.productImage, true);
        await runner.verifyElementsIsExist(homePage.productTitle);
        await runner.verifyElementsIsExist(homePage.productPrice);
        await runner.verifyElementsIsExist(homePage.productDescription);
      });

      test("Verify product content is valid on the second page of pagination", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.paginationNextButton);
        await runner.clickOnElement(homePage.paginationNextButton);
        await runner.waitForProductChangeAfterPagination(
          homePage.paginationNextButton,
          homePage.firstProductTitle
        );
        await runner.verifyElementsIsExist(homePage.productImage, true);
        await runner.verifyElementsIsExist(homePage.productTitle);
        await runner.verifyElementsIsExist(homePage.productPrice);
        await runner.verifyElementsIsExist(homePage.productDescription);
      });

      test("Verify pagination returning to first page with previous button click shows correct products", async ({
        runner,
        homePage,
      }) => {
        // getting page one's product titles
        await runner.validateProductContainers(homePage.productContainer);
        const pageOneProductTitles = await runner.getProductTitles(
          homePage.productTitle
        );

        // navigating to the next page of pagination
        await runner.clickOnElement(homePage.paginationNextButton);
        await runner.wait(1, { waitForLoadState: "load" });

        // getting page two's product titles
        const pageTwoProductTitles = await runner.getProductTitles(
          homePage.productTitle
        );

        // page tow's titles should not match with page one's titles
        await runner.verifyTitlesNoMatch(
          pageOneProductTitles,
          pageTwoProductTitles
        );

        // going back to the previous page and capture the again back page's products titles
        await runner.clickOnElement(homePage.carouselPreviousButton);
        await runner.wait(1, { waitForLoadState: "load" });
        const pageOneTitlesAgain = await runner.getProductTitles(
          homePage.productTitle
        );

        // now the products of pageOneTitles again should match with products of page one
        await runner.verifyTitlesMatch(
          pageOneProductTitles,
          pageOneTitlesAgain
        );
      });

      // ---------------------------------------------------------------------------------------------

      test("Verify clicking on a product image navigates to the correct product detail page", async ({
        runner,
        homePage,
        productDetailPage,
      }) => {});

      //     test("Verify clicking product title navigates to product detail page", async ({
      //       runner,
      //       homePage,
      //       productDetailPage,
      //     }) => {
      //       await runner.clickOnElement(homePage.firstProductCardTitle);
      //       await runner.wait(1);
      //       await runner.verifyUrlContains(
      //         homeData.productDetails.firstProduct.urlFragment
      //       );
      //       await runner.verifyElementIsVisible(productDetailPage.productTitle);
      //       await runner.verifyContainText(
      //         productDetailPage.productTitle,
      //         homeData.productDetails.firstProduct.title
      //       );
      //       await runner.verifyElementIsVisible(productDetailPage.productPrice);
      //       await runner.verifyContainText(
      //         productDetailPage.productPrice,
      //         homeData.productDetails.firstProduct.price
      //       );
      //       await runner.goBack();
      //       await runner.clickOnElement(homePage.secondProductCardTitle);
      //       await runner.wait(1);
      //       await runner.verifyUrlContains(
      //         homeData.productDetails.secondProduct.urlFragment
      //       );
      //       await runner.verifyContainText(
      //         productDetailPage.productTitle,
      //         homeData.productDetails.secondProduct.title
      //       );
      //       await runner.verifyContainText(
      //         productDetailPage.productPrice,
      //         homeData.productDetails.secondProduct.price
      //       );
      //     });

      //     test("Verify footer is present with copyright text", async ({
      //       runner,
      //       homePage,
      //     }) => {
      //       await runner.verifyElementIsVisible(homePage.footer);
      //       await runner.verifyContainText(
      //         homePage.footerText,
      //         homeData.footer.copyright
      //       );
      //     });
    });
  }
}

new HomePageTest().runTest();
