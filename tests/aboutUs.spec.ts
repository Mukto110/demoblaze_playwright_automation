import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";
import aboutUsData from "../testData/aboutUs.json";

class AboutUsTest extends ExpectedValueProvider {
  runTest() {
    test.describe("AboutUs Modal Functionality", () => {
      test.beforeEach(async ({ runner, envData, homePage, aboutModal }) => {
        await runner.navigateTo(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.navbarAbout);
        await runner.clickOnElement(homePage.navbarAbout);
        await runner.verifyElementIsVisible(aboutModal.title);
        await runner.verifyContainText(
          aboutModal.title,
          aboutUsData.aboutUsTitle
        );
      });

      // BUG_ABOUT_01 -> Expecting src value but getting null
      test("Verify modal contains video element", async ({
        runner,
        aboutModal,
      }) => {
        await runner.verifyElementIsVisible(aboutModal.video);
        await runner.validateAttribute(
          aboutModal.video,
          "src",
          aboutUsData.videoAttributeValue
        );
      });

      // BUG_ABOUT_US_02 -> Video is not playing correctly
      test("video plays correctly", async ({ runner, aboutModal }) => {
        await runner.clickOnElement(aboutModal.playButton);
        await runner.wait(2);
        const videoCurrentTime = await runner.getVideoCurrentTime(
          aboutModal.video
        );
        await runner.verifyGreaterThan(
          videoCurrentTime,
          0,
          "Video did not start playing"
        );
      });

      // BUG_ABOUT_US_03 -> Video is not playing and resetting in reopening modal
      test("reopening modal resets video to beginning", async ({
        runner,
        homePage,
        aboutModal,
      }) => {
        await runner.verifyElementIsVisible(aboutModal.playButton);
        await runner.clickOnElement(aboutModal.playButton);
        await runner.verifyElementIsVisible(aboutModal.closeButton);
        await runner.verifyContainText(
          aboutModal.closeButton,
          aboutUsData.closeButtonText
        );
        await runner.clickOnElement(aboutModal.closeButton);
        await runner.verifyElementIsVisible(homePage.navbarAbout);
        await runner.clickOnElement(homePage.navbarAbout);
        const videoCurrentTime = await runner.getVideoCurrentTime(
          aboutModal.playButton
        );
        await runner.verifyEqual(
          videoCurrentTime,
          0,
          "Video was not reset to start"
        );
      });
    });
  }
}

new AboutUsTest().runTest();
