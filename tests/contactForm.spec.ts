import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";
import contactModalData from "../testData/contact.json";

class ContactFormTest extends ExpectedValueProvider {
  runTest() {
    test.describe("Contact Form Functionality", () => {
      test.beforeEach(async ({ runner, homePage, contactModal, envData }) => {
        await runner.navigateTo(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.navbarContact);
        await runner.clickOnElement(homePage.navbarContact);
        await runner.verifyElementIsVisible(contactModal.header);
        await runner.verifyContainText(
          contactModal.header,
          contactModalData.contactModalHeader
        );
      });

      test("Verify the contact modal contains input fields for email, name, and message", async ({
        runner,
        contactModal,
      }) => {
        // validating email label and input field ->
        await runner.verifyElementIsVisible(contactModal.emailInputLabel);
        await runner.verifyContainText(
          contactModal.emailInputLabel,
          contactModalData.labels.emailLabe
        );
        await runner.verifyElementIsVisible(contactModal.emailInput);

        // validating name label and input field ->
        await runner.verifyElementIsVisible(contactModal.nameInputLabel);
        await runner.verifyContainText(
          contactModal.nameInputLabel,
          contactModalData.labels.nameLabel
        );
        await runner.verifyElementIsVisible(contactModal.nameInput);

        // validating message label and input field ->
        await runner.verifyElementIsVisible(contactModal.messageInputLabel);
        await runner.verifyContainText(
          contactModal.messageInputLabel,
          contactModalData.labels.messageLabel
        );
        await runner.verifyElementIsVisible(contactModal.messageTextarea);
      });

      test("Verify the user can type into the Email, Name and Message fields", async ({
        runner,
        contactModal,
      }) => {
        await runner.typeText(contactModal.emailInput, "dlkjfaslkdjflaksd");
        await runner.typeText(contactModal.nameInput, "ajsoiweurowmc");
        await runner.typeText(
          contactModal.messageTextarea,
          "somethingsomethingsomething"
        );
      });

      test("Verify the contact modal shows an alert on successful message submission", async ({
        runner,
        contactModal,
        fakeUser,
      }) => {
        await runner.fillInputBox(contactModal.emailInput, fakeUser.email);
        await runner.fillInputBox(contactModal.nameInput, fakeUser.username);
        await runner.fillInputBox(
          contactModal.messageTextarea,
          fakeUser.message
        );
        await runner.verifyContainText(contactModal.sendButton, "Send message");
        await runner.handleAlertWithMessage("Thanks for the message!!");
        await runner.clickOnElement(contactModal.sendButton);
      });

      test("Verify the contact modal closes when the 'Close' button is clicked", async ({
        runner,
        contactModal,
      }) => {
        await runner.verifyElementIsVisible(contactModal.closeButton);
        await runner.verifyContainText(contactModal.closeButton, "Close");
        await runner.clickOnElement(contactModal.closeButton);
        await runner.verifyElementIsNotVisible(contactModal.header);
      });

      // BUG_CONTACT_01 -> The form is getting submitted with success message when all fields are left empty
      test("Verify the form should not get submitted when all fields are left empty", async ({
        runner,
        contactModal,
      }) => {
        await runner.fillInputBox(contactModal.emailInput, "");
        await runner.fillInputBox(contactModal.nameInput, "");
        await runner.fillInputBox(contactModal.messageTextarea, "");
        await runner.handleAlertWithMessage("All the fields must be filled!!");
        await runner.clickOnElement(contactModal.sendButton);
      });

      // BUG_CONTACT_02 -> The form is getting submitted when only the email field is filled
      test("Verify the form should not get submitted when only the email field is filled", async ({
        runner,
        fakeUser,
        contactModal,
      }) => {
        await runner.fillInputBox(contactModal.emailInput, fakeUser.email);
        await runner.fillInputBox(contactModal.nameInput, "");
        await runner.fillInputBox(contactModal.messageTextarea, "");
        await runner.handleAlertWithMessage("All the fields must be filled!!");
        await runner.clickOnElement(contactModal.sendButton);
      });

      // BUG_CONTACT_03 -> Then form is getting submitted when only the name field if filled
      test("Verify the form should not get submitted when only the name field is filled", async ({
        runner,
        fakeUser,
        contactModal,
      }) => {
        await runner.fillInputBox(contactModal.emailInput, "");
        await runner.fillInputBox(contactModal.nameInput, fakeUser.username);
        await runner.fillInputBox(contactModal.messageTextarea, "");
        await runner.handleAlertWithMessage("All the fields must be filled!!");
        await runner.clickOnElement(contactModal.sendButton);
      });

      // BUG_CONTACT_04 -> The form is getting submitted when only the message field is filled
      test("Verify the form should not get submitted when only the message field is filled", async ({
        runner,
        fakeUser,
        contactModal,
      }) => {
        await runner.fillInputBox(contactModal.emailInput, "");
        await runner.fillInputBox(contactModal.nameInput, "");
        await runner.fillInputBox(
          contactModal.messageTextarea,
          fakeUser.message
        );
        await runner.handleAlertWithMessage("All the fields must be filled!!");
        await runner.clickOnElement(contactModal.sendButton);
      });

      // BUG_CONTACT_05 -> The form is getting submitted when all fields have the whitespace in the fields
      test("Verify the form should not get submitted when whitespace is entered into all fields", async ({
        runner,
        contactModal,
      }) => {
        await runner.fillInputBox(contactModal.emailInput, " ");
        await runner.fillInputBox(contactModal.nameInput, " ");
        await runner.fillInputBox(contactModal.messageTextarea, " ");
        await runner.handleAlertWithMessage("Whitespace does not allowed!!");
        await runner.clickOnElement(contactModal.sendButton);
      });

      test("Verify input fields must be empty on reopen after successful submission", async ({
        runner,
        fakeUser,
        homePage,
        contactModal,
      }) => {
        // submission
        await runner.fillInputBox(contactModal.emailInput, fakeUser.email);
        await runner.fillInputBox(contactModal.nameInput, fakeUser.username);
        await runner.fillInputBox(
          contactModal.messageTextarea,
          fakeUser.message
        );
        await runner.verifyContainText(contactModal.sendButton, "Send message");
        await runner.handleAlertWithMessage("Thanks for the message!!");
        await runner.clickOnElement(contactModal.sendButton);

        await runner.wait(1, { waitForLoadState: "load" });
        // again click to the contact button from navbar
        await runner.clickOnElement(homePage.navbarContact);

        // checking all the fields are empty
        await runner.verifyToHaveValue(contactModal.emailInput, "");
        await runner.verifyToHaveValue(contactModal.nameInput, "");
        await runner.verifyToHaveValue(contactModal.messageTextarea, "");
      });

      test("Verify multiple submissions can be made consecutively with valid data", async ({
        runner,
        fakeUser,
        homePage,
        contactModal,
      }) => {
        // submission 1
        await runner.fillInputBox(contactModal.emailInput, fakeUser.email);
        await runner.fillInputBox(contactModal.nameInput, fakeUser.username);
        await runner.fillInputBox(
          contactModal.messageTextarea,
          fakeUser.message
        );
        await runner.handleAlertWithMessage("Thanks for the message!!");
        await runner.clickOnElement(contactModal.sendButton);

        await runner.wait(1, { waitForLoadState: "load" });

        await runner.clickOnElement(homePage.navbarContact);
        await runner.verifyElementIsVisible(contactModal.header);

        // submission 2
        await runner.fillInputBox(contactModal.emailInput, fakeUser.email);
        await runner.fillInputBox(contactModal.nameInput, fakeUser.username);
        await runner.fillInputBox(
          contactModal.messageTextarea,
          fakeUser.message
        );
        await runner.clickOnElement(contactModal.sendButton);

        await runner.wait(1, { waitForLoadState: "load" });

        await runner.clickOnElement(homePage.navbarContact);
        await runner.verifyElementIsVisible(contactModal.header);

        // submission 3
        await runner.fillInputBox(contactModal.emailInput, fakeUser.email);
        await runner.fillInputBox(contactModal.nameInput, fakeUser.username);
        await runner.fillInputBox(
          contactModal.messageTextarea,
          fakeUser.message
        );
        await runner.clickOnElement(contactModal.sendButton);
      });
    });
  }
}

new ContactFormTest().runTest();
