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
        await runner.verifyElementIsVisible(homePage.firstProductCard);
        await runner.verifyElementIsVisible(homePage.secondProductCard);
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
        await runner.verifyElementIsVisible(homePage.firstProductCard);
      });
    });
  }
}

const homePageTest = new HomePageTest();
homePageTest.runTest();
