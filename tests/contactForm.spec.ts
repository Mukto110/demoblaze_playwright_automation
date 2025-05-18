import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";

class ContactFormTest extends ExpectedValueProvider {
  runTest() {
    test.describe("Contact Form Functionality", () => {
      test.beforeEach(async ({ runner, homePage, envData }) => {
        await runner.navigateTo(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.navbarContact);
        await runner.clickOnElement(homePage.navbarContact);
      });

      test("Verify the contact modal contains input fields for email, name, and message", async ({
        runner,
        contactModal,
      }) => {
        await runner.verifyElementIsVisible(contactModal.emailInput);
        await runner.verifyElementIsVisible(contactModal.nameInput);
        await runner.verifyElementIsVisible(contactModal.messageTextarea);
      });

      test("Verify all input fields accept valid input", async ({
        runner,
        contactModal,
        fakeUser,
      }) => {
        await runner.typeText(contactModal.emailInput, fakeUser.email);
        await runner.typeText(contactModal.nameInput, fakeUser.username);
        await runner.typeText(contactModal.messageTextarea, fakeUser.message);
        await runner.verifyInputValue(contactModal.emailInput, fakeUser.email);
        await runner.verifyInputValue(
          contactModal.nameInput,
          fakeUser.username
        );
        await runner.verifyInputValue(
          contactModal.messageTextarea,
          fakeUser.message
        );
      });

      test("Verify user can send a message and sees confirmation", async ({
        runner,
        fakeUser,
        contactModal,
      }) => {
        await runner.typeText(contactModal.emailInput, fakeUser.email);
        await runner.typeText(contactModal.nameInput, fakeUser.username);
        await runner.typeText(contactModal.messageTextarea, fakeUser.message);
        await runner.handleAlertWithMessage("Thanks for the message!!");
        await runner.clickOnElement(contactModal.sendButton);
      });

      test("Verify 'Send message' button is disabled when required fields are empty", async ({
        runner,
        contactModal,
      }) => {
        await runner.verifyElementIsDisabled(contactModal.sendButton);
      });

      test("Verify inputs are cleared after closing and reopening the modal", async ({
        runner,
        homePage,
        contactModal,
      }) => {
        await runner.clickOnElement(contactModal.closeButton);
        await runner.wait(1);
        await runner.clickOnElement(homePage.navbarContact);
        await runner.verifyInputValue(contactModal.emailInput, "");
        await runner.verifyInputValue(contactModal.nameInput, "");
        await runner.verifyInputValue(contactModal.messageTextarea, "");
      });
    });
  }
}

new ContactFormTest().runTest();
