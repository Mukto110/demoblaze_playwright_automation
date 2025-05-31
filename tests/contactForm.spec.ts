import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";
import contactModalData from "../testData/contact.json";
import homeData from "../testData/home.json";

class ContactFormTest extends ExpectedValueProvider {
  runTest() {
    test.describe("Contact Form Functionality", () => {
      test.beforeEach(async ({ runner, homePage, contactModal, envData }) => {
        await runner.navigateTo(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.navbarContact);
        await runner.mouseHover(homePage.navbarContact);
        await runner.verifyElementToHaveCSSProperty(
          homePage.navbarContact,
          "color",
          homeData.navItemsColorOnHover
        );
        await runner.clickOnElement(homePage.navbarContact);
        await runner.verifyElementIsVisible(contactModal.header);
        await runner.verifyContainText(
          contactModal.header,
          contactModalData.contactModalHeader
        );
      });

      test("Verify the contact modal contains input fields and labels for email, name, and message", async ({
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
        await runner.validateAttribute(contactModal.emailInput, "type", "text");

        // validating name label and input field ->
        await runner.verifyElementIsVisible(contactModal.nameInputLabel);
        await runner.verifyContainText(
          contactModal.nameInputLabel,
          contactModalData.labels.nameLabel
        );
        await runner.verifyElementIsVisible(contactModal.nameInput);
        await runner.validateAttribute(contactModal.nameInput, "type", "text");

        // validating message label and input field ->
        await runner.verifyElementIsVisible(contactModal.messageInputLabel);
        await runner.verifyContainText(
          contactModal.messageInputLabel,
          contactModalData.labels.messageLabel
        );
        await runner.verifyElementIsVisible(contactModal.messageTextarea);
        await runner.validateAttribute(
          contactModal.messageTextarea,
          "id",
          "message-text"
        );
      });

      test("Verify the user can type into the input fields and reopen the modal after clicking 'close' button shouldn't get removed the values", async ({
        runner,
        fakeUser,
        homePage,
        contactModal,
      }) => {
        await runner.verifyElementIsVisible(contactModal.emailInput);
        await runner.fillInputBox(contactModal.emailInput, fakeUser.email);
        await runner.verifyElementIsVisible(contactModal.nameInput);
        await runner.fillInputBox(contactModal.nameInput, fakeUser.username);
        await runner.verifyElementIsVisible(contactModal.messageTextarea);
        await runner.fillInputBox(
          contactModal.messageTextarea,
          fakeUser.message
        );
        await runner.verifyElementIsVisible(contactModal.closeButton);
        await runner.validateAttribute(
          contactModal.closeButton,
          "type",
          "button"
        );
        await runner.verifyContainText(
          contactModal.closeButton,
          contactModalData.closeButtonText
        );
        await runner.verifyElementsAreEnabled(contactModal.closeButton);
        await runner.clickOnElement(contactModal.closeButton);
        await runner.wait(5, { waitForSelector: homePage.navbarContact });
        await runner.verifyElementsAreEnabled(homePage.navbarContact);
        await runner.clickOnElement(homePage.navbarContact);
        await runner.verifyElementIsVisible(contactModal.header);
        await runner.verifyContainText(
          contactModal.header,
          contactModalData.contactModalHeader
        );
        await runner.verifyElementIsVisible(contactModal.emailInput);
        await runner.verifyToHaveValue(contactModal.emailInput, fakeUser.email);
        await runner.verifyElementIsVisible(contactModal.nameInput);
        await runner.verifyToHaveValue(
          contactModal.nameInput,
          fakeUser.username
        );
        await runner.verifyElementIsVisible(contactModal.messageTextarea);
        await runner.verifyToHaveValue(
          contactModal.messageTextarea,
          fakeUser.message
        );
      });

      test("Verify the user can type into the input fields and reopen the modal after clicking 'cross' button shouldn't get removed the values", async ({
        runner,
        fakeUser,
        homePage,
        contactModal,
      }) => {
        await runner.verifyElementIsVisible(contactModal.emailInput);
        await runner.fillInputBox(contactModal.emailInput, fakeUser.email);
        await runner.verifyElementIsVisible(contactModal.nameInput);
        await runner.fillInputBox(contactModal.nameInput, fakeUser.username);
        await runner.verifyElementIsVisible(contactModal.messageTextarea);
        await runner.fillInputBox(
          contactModal.messageTextarea,
          fakeUser.message
        );
        await runner.verifyElementIsVisible(contactModal.crossButton);
        await runner.validateAttribute(
          contactModal.crossButton,
          "type",
          "button"
        );
        await runner.verifyElementsAreEnabled(contactModal.closeButton);
        await runner.clickOnElement(contactModal.closeButton);
        await runner.wait(5, { waitForSelector: homePage.navbarContact });
        await runner.verifyElementsAreEnabled(homePage.navbarContact);
        await runner.clickOnElement(homePage.navbarContact);
        await runner.verifyElementIsVisible(contactModal.header);
        await runner.verifyContainText(
          contactModal.header,
          contactModalData.contactModalHeader
        );
        await runner.verifyElementIsVisible(contactModal.emailInput);
        await runner.verifyToHaveValue(contactModal.emailInput, fakeUser.email);
        await runner.verifyElementIsVisible(contactModal.nameInput);
        await runner.verifyToHaveValue(
          contactModal.nameInput,
          fakeUser.username
        );
        await runner.verifyElementIsVisible(contactModal.messageTextarea);
        await runner.verifyToHaveValue(
          contactModal.messageTextarea,
          fakeUser.message
        );
      });

      test("Verify the contact modal shows an alert on successful message submission", async ({
        runner,
        contactModal,
        fakeUser,
      }) => {
        await runner.verifyElementIsVisible(contactModal.emailInput);
        await runner.fillInputBox(contactModal.emailInput, fakeUser.email);
        await runner.verifyElementIsVisible(contactModal.nameInput);
        await runner.fillInputBox(contactModal.nameInput, fakeUser.username);
        await runner.verifyElementIsVisible(contactModal.messageTextarea);
        await runner.fillInputBox(
          contactModal.messageTextarea,
          fakeUser.message
        );
        await runner.verifyContainText(
          contactModal.sendButton,
          contactModalData.sendButtonText
        );
        await runner.validateAttribute(
          contactModal.sendButton,
          "type",
          "button"
        );
        await runner.verifyElementsAreEnabled(contactModal.sendButton);
        await runner.handleAlertWithMessage(contactModalData.successAlertText);
        await runner.clickOnElement(contactModal.sendButton);
      });

      // BUG_CONTACT_01 -> The form is getting submitted with success message when all fields are left empty
      test("Verify the form should not get submitted when all fields are left empty", async ({
        runner,
        contactModal,
      }) => {
        await runner.verifyElementIsVisible(contactModal.emailInput);
        await runner.fillInputBox(contactModal.emailInput, "");
        await runner.verifyElementIsVisible(contactModal.nameInput);
        await runner.fillInputBox(contactModal.nameInput, "");
        await runner.verifyElementIsVisible(contactModal.messageTextarea);
        await runner.fillInputBox(contactModal.messageTextarea, "");
        await runner.verifyElementsAreEnabled(contactModal.sendButton);
        await runner.handleAlertWithMessage(
          contactModalData.allFieldRequiredText
        );
        await runner.validateAndClick(
          contactModal.sendButton,
          contactModalData.sendButtonText
        );
      });

      // BUG_CONTACT_02 -> The form is getting submitted when only the email field is filled
      test("Verify the form should not get submitted when only the email field is filled", async ({
        runner,
        fakeUser,
        contactModal,
      }) => {
        await runner.verifyElementIsVisible(contactModal.emailInput);
        await runner.fillInputBox(contactModal.emailInput, fakeUser.email);
        await runner.verifyElementIsVisible(contactModal.nameInput);
        await runner.fillInputBox(contactModal.nameInput, "");
        await runner.verifyElementIsVisible(contactModal.messageTextarea);
        await runner.fillInputBox(contactModal.messageTextarea, "");
        await runner.verifyElementsAreEnabled(contactModal.sendButton);
        await runner.handleAlertWithMessage(
          contactModalData.allFieldRequiredText
        );
        await runner.clickOnElement(contactModal.sendButton);
      });

      // BUG_CONTACT_03 -> Then form is getting submitted when only the name field if filled
      test("Verify the form should not get submitted when only the name field is filled", async ({
        runner,
        fakeUser,
        contactModal,
      }) => {
        await runner.verifyElementIsVisible(contactModal.emailInput);
        await runner.fillInputBox(contactModal.emailInput, "");
        await runner.verifyElementIsVisible(contactModal.nameInput);
        await runner.fillInputBox(contactModal.nameInput, fakeUser.username);
        await runner.verifyElementIsVisible(contactModal.messageTextarea);
        await runner.fillInputBox(contactModal.messageTextarea, "");
        await runner.verifyElementsAreEnabled(contactModal.sendButton);
        await runner.handleAlertWithMessage(
          contactModalData.allFieldRequiredText
        );
        await runner.clickOnElement(contactModal.sendButton);
      });

      // BUG_CONTACT_04 -> The form is getting submitted when only the message field is filled
      test("Verify the form should not get submitted when only the message field is filled", async ({
        runner,
        fakeUser,
        contactModal,
      }) => {
        await runner.verifyElementIsVisible(contactModal.emailInput);
        await runner.fillInputBox(contactModal.emailInput, "");
        await runner.verifyElementIsVisible(contactModal.nameInput);
        await runner.fillInputBox(contactModal.nameInput, "");
        await runner.verifyElementIsVisible(contactModal.messageTextarea);
        await runner.fillInputBox(
          contactModal.messageTextarea,
          fakeUser.message
        );
        await runner.verifyElementsAreEnabled(contactModal.sendButton);
        await runner.handleAlertWithMessage(
          contactModalData.allFieldRequiredText
        );
        await runner.clickOnElement(contactModal.sendButton);
      });

      // BUG_CONTACT_05 -> The form is getting submitted when all fields have the whitespace in the fields
      test("Verify the form should not get submitted when whitespace is entered into all fields", async ({
        runner,
        contactModal,
      }) => {
        await runner.verifyElementIsVisible(contactModal.nameInput);
        await runner.fillInputBox(contactModal.emailInput, " ");
        await runner.verifyElementIsVisible(contactModal.nameInput);
        await runner.fillInputBox(contactModal.nameInput, " ");
        await runner.verifyElementIsVisible(contactModal.messageTextarea);
        await runner.fillInputBox(contactModal.messageTextarea, " ");
        await runner.verifyElementsAreEnabled(contactModal.sendButton);
        await runner.handleAlertWithMessage(
          contactModalData.whiteSpaceNotAllowedText
        );
        await runner.clickOnElement(contactModal.sendButton);
      });

      test("Verify input fields must be empty on reopen after successful submission", async ({
        runner,
        fakeUser,
        homePage,
        contactModal,
      }) => {
        // submission
        await runner.verifyElementIsVisible(contactModal.emailInput);
        await runner.fillInputBox(contactModal.emailInput, fakeUser.email);
        await runner.verifyElementIsVisible(contactModal.nameInput);
        await runner.fillInputBox(contactModal.nameInput, fakeUser.username);
        await runner.verifyElementIsVisible(contactModal.messageTextarea);
        await runner.fillInputBox(
          contactModal.messageTextarea,
          fakeUser.message
        );
        await runner.verifyElementIsVisible(contactModal.sendButton);
        await runner.verifyElementsAreEnabled(contactModal.sendButton);
        await runner.handleAlertWithMessage("Thanks for the message!!");
        await runner.clickOnElement(contactModal.sendButton);

        await runner.wait(5, { waitForLoadState: "load" });

        // again click to the contact button from navbar
        await runner.verifyElementIsVisible(homePage.navbarContact);
        await runner.clickOnElement(homePage.navbarContact);
        await runner.verifyElementIsVisible(contactModal.header);
        await runner.verifyContainText(
          contactModal.header,
          contactModalData.contactModalHeader
        );
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
        await runner.verifyElementIsVisible(contactModal.emailInput);
        await runner.fillInputBox(contactModal.emailInput, fakeUser.email);
        await runner.verifyElementIsVisible(contactModal.nameInput);
        await runner.fillInputBox(contactModal.nameInput, fakeUser.username);
        await runner.verifyElementIsVisible(contactModal.messageTextarea);
        await runner.fillInputBox(
          contactModal.messageTextarea,
          fakeUser.message
        );
        await runner.verifyElementIsVisible(contactModal.sendButton);
        await runner.verifyElementsAreEnabled(contactModal.sendButton);
        await runner.handleAlertWithMessage("Thanks for the message!!");
        await runner.clickOnElement(contactModal.sendButton);

        await runner.wait(2, { waitForLoadState: "load" });
        await runner.verifyElementIsVisible(homePage.navbarContact);
        await runner.clickOnElement(homePage.navbarContact);
        await runner.wait(5, { waitForSelector: contactModal.header });
        await runner.verifyElementIsVisible(contactModal.header);
        await runner.verifyContainText(
          contactModal.header,
          contactModalData.contactModalHeader
        );

        // submission 2
        await runner.verifyElementIsVisible(contactModal.emailInput);
        await runner.fillInputBox(contactModal.emailInput, fakeUser.email);
        await runner.verifyElementIsVisible(contactModal.nameInput);
        await runner.fillInputBox(contactModal.nameInput, fakeUser.username);
        await runner.verifyElementIsVisible(contactModal.messageTextarea);
        await runner.fillInputBox(
          contactModal.messageTextarea,
          fakeUser.message
        );
        await runner.verifyElementIsVisible(contactModal.sendButton);
        await runner.verifyElementsAreEnabled(contactModal.sendButton);
        await runner.clickOnElement(contactModal.sendButton);

        await runner.wait(5, { waitForSelector: homePage.navbarContact });
        await runner.verifyElementIsVisible(homePage.navbarContact);
        await runner.clickOnElement(homePage.navbarContact);
        await runner.wait(5, { waitForSelector: contactModal.header });
        await runner.verifyElementIsVisible(contactModal.header);
        await runner.verifyContainText(
          contactModal.header,
          contactModalData.contactModalHeader
        );

        // submission 3
        await runner.verifyElementIsVisible(contactModal.emailInput);
        await runner.fillInputBox(contactModal.emailInput, fakeUser.email);
        await runner.verifyElementIsVisible(contactModal.nameInput);
        await runner.fillInputBox(contactModal.nameInput, fakeUser.username);
        await runner.verifyElementIsVisible(contactModal.messageTextarea);
        await runner.fillInputBox(
          contactModal.messageTextarea,
          fakeUser.message
        );
        await runner.verifyElementIsVisible(contactModal.sendButton);
        await runner.verifyElementsAreEnabled(contactModal.sendButton);
        await runner.clickOnElement(contactModal.sendButton);
      });
    });
  }
}

new ContactFormTest().runTest();
