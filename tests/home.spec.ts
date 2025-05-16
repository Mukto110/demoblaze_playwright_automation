import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";

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
        await runner.verifyElementIsVisible(homePage.firstProductImage);
        await runner.verifyElementIsVisible(homePage.firstProductTitle);
        await runner.verifyElementIsVisible(homePage.firstProductPrice);
        await runner.verifyElementIsVisible(homePage.firstProductDescription);
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
    });
  }
}

const homePageTest = new HomePageTest();
homePageTest.runTest();
