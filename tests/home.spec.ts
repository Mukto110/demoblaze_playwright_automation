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
    });
  }
}

const homePageTest = new HomePageTest();
homePageTest.runTest();
