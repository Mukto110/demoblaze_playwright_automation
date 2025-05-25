import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";
import aboutUsData from "../testData/aboutUs.json";

class AboutUsTest extends ExpectedValueProvider {
  runTest() {
    test.describe("AboutUs Modal Functionality", () => {
      test.beforeEach(async ({ runner, envData, homePage, aboutModal }) => {
        await runner.navigateTo(envData.baseUrl);
        await runner.clickOnElement(homePage.navbarAbout);
        await runner.verifyElementIsVisible(aboutModal.title);
        await runner.verifyContainText(
          aboutModal.title,
          aboutUsData.aboutUsTitle
        );
      });

      test("Verify modal contains video element", async ({
        runner,
        aboutModal,
      }) => {
        await runner.verifyElementIsVisible(aboutModal.video);
      });

      test("video plays correctly", async ({ runner, aboutModal }) => {
        await runner.clickOnElement(aboutModal.playButton);
        await runner.wait(2);
        const t = await runner.getVideoCurrentTime(aboutModal.video);
        await runner.verifyGreaterThan(t, 0, "Video did not start playing");
      });

      test("reopening modal resets video to beginning", async ({
        runner,
        homePage,
        aboutModal,
      }) => {
        await runner.clickOnElement(aboutModal.closeButton);
        await runner.clickOnElement(homePage.navbarAbout);
        const t = await runner.getVideoCurrentTime(aboutModal.playButton);
        await runner.verifyEqual(t, 0, "Video was not reset to start");
      });
    });
  }
}

new AboutUsTest().runTest();
