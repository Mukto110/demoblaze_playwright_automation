import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";
import homeData from "../testData/home.json";

class HomePageTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("Home Page Functionality Test", () => {
      test.beforeEach(async ({ runner, envData, homePage }) => {
        await runner.navigateTo(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
      });

      test("Verify that the homepage loads with featured products visible", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(
          homePage.firstProductCardOfAllProduct
        );
        await runner.verifyElementIsVisible(
          homePage.secondProductCardOfAllProduct
        );
      });

      test("Verify navigation bar is displayed correctly", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.navbarHome);
        await runner.verifyElementIsVisible(homePage.navbarContact);
        await runner.verifyElementIsVisible(homePage.navbarAbout);
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.verifyElementIsVisible(homePage.navbarSignup);
      });

      test("Verify homepage reloads and resets filters on 'Home' navbar click", async ({
        runner,
        homePage,
      }) => {
        await runner.clickOnElement(homePage.categoryLaptops);
        await runner.verifyElementIsVisible(homePage.macbookLaptopCard);
        await runner.clickOnElement(homePage.homePageLogo);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
        await runner.verifyElementIsVisible(
          homePage.firstProductCardOfAllProduct
        );
      });

      test("Verify clicking 'Categories' reloads homepage and shows all products", async ({
        runner,
        homePage,
      }) => {
        await runner.clickOnElement(homePage.categoryLaptops);
        await runner.verifyElementIsVisible(homePage.macbookLaptopCard);
        await runner.verifyElementIsVisible(homePage.categoriesHeaderSidebar);
        await runner.clickOnElement(homePage.categoriesHeaderSidebar);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
        await runner.verifyElementIsVisible(
          homePage.firstProductCardOfAllProduct
        );
        await runner.verifyElementIsVisible(
          homePage.secondProductCardOfAllProduct
        );
      });

      test("Verify filtering works by 'Phones', 'Laptops', 'Monitors'", async ({
        runner,
        homePage,
      }) => {
        await runner.clickOnElement(homePage.categoriesPhones);
        await runner.verifyElementIsVisible(
          homePage.firstProductCardOfAllProduct
        );
        await runner.clickOnElement(homePage.categoryLaptops);
        await runner.verifyElementIsVisible(homePage.macbookLaptopCard);
        await runner.clickOnElement(homePage.categoriesMonitors);
        await runner.verifyElementIsVisible(
          homePage.firstProductCardOfMonitors
        );
      });

      test("Verify product cards display image, title, price, description", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyAllProductCardsContent({
          productCardSelector: homePage.allProductCards,
          titleSelector: homePage.productCardTitle,
          priceSelector: homePage.productCardPrice,
          imageSelector: homePage.productCardImage,
        });
      });

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

      test("Verify carousel is displayed, functional, and auto changes", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.carousel);
        const firstImageSrc = await runner.getAttributeFromLocator(
          homePage.activeCarouselImage,
          "src"
        );
        await runner.wait(7);
        const secondImageSrc = await runner.getAttributeFromLocator(
          homePage.activeCarouselImage,
          "src"
        );
        await runner.verifyNotEqual(
          firstImageSrc,
          secondImageSrc,
          "Carousel image did not auto-change."
        );
      });

      test("Verify carousel arrows change displayed product", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.carousel);

        const firstImageSrc = await runner.getAttributeFromLocator(
          homePage.activeCarouselImage,
          "src"
        );

        await runner.clickOnElement(homePage.carouselNextButton);
        await runner.wait(1);
        const secondImageSrc = await runner.getAttributeFromLocator(
          homePage.activeCarouselImage,
          "src"
        );
        await runner.verifyNotEqual(secondImageSrc, firstImageSrc);

        await runner.clickOnElement(homePage.carouselNextButton);
        await runner.wait(1);
        const thirdImageSrc = await runner.getAttributeFromLocator(
          homePage.activeCarouselImage,
          "src"
        );
        await runner.verifyNotEqual(thirdImageSrc, secondImageSrc);

        await runner.clickOnElement(homePage.carouselPreviousButton);
        await runner.wait(1);
        const backToSecond = await runner.getAttributeFromLocator(
          homePage.activeCarouselImage,
          "src"
        );
        await runner.verifyEqual(backToSecond, secondImageSrc);

        await runner.clickOnElement(homePage.carouselPreviousButton);
        await runner.wait(1);
        const backToFirst = await runner.getAttributeFromLocator(
          homePage.activeCarouselImage,
          "src"
        );
        await runner.verifyEqual(backToFirst, firstImageSrc);
      });

      test("Verify pagination 'Next' and 'Previous' buttons work correctly", async ({
        runner,
        homePage,
      }) => {
        const firstPageProductTitle = await runner.getText(
          homePage.firstProductTitle
        );
        await runner.clickOnElement(homePage.paginationNextButton);
        await runner.wait(1);
        const secondPageProductTitle = await runner.getText(
          homePage.firstProductTitle
        );
        await runner.verifyNotEqual(
          firstPageProductTitle,
          secondPageProductTitle,
          "Products did not change after clicking 'Next'."
        );

        await runner.clickOnElement(homePage.paginationPreviousButton);
        await runner.wait(2);

        const backToFirstPageProductTitle = await runner.getText(
          homePage.firstProductTitle
        );
        await runner.verifyEqual(
          backToFirstPageProductTitle,
          firstPageProductTitle,
          "Products did not return to first page after clicking 'Previous'."
        );
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
