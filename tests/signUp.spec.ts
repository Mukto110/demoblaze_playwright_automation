import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";
import homeData from "../testData/home.json";
import signUpData from "../testData/signup.json";
import loginData from "../testData/login.json";

class SignUpModal extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("SignUp Modal Functionality Test", () => {
      test.beforeEach(async ({ runner, envData, homePage, signUpModal }) => {
        await runner.navigateTo(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
        await runner.verifyUrlContains(envData.baseUrl);
        await runner.wait(5, { waitForSelector: homePage.navbarSignup });
        await runner.verifyElementIsVisible(homePage.navbarSignup);
        await runner.verifyElementsAreEnabled(homePage.navbarSignup);
        await runner.mouseHover(homePage.navbarSignup);
        await runner.verifyElementToHaveCSSProperty(
          homePage.navbarSignup,
          "color",
          homeData.navItemsColorOnHover
        );
        await runner.validateAndClick(
          homePage.navbarSignup,
          homeData.navbar.signup
        );
        await runner.wait(2, {
          waitForSelector: signUpModal.signUpModalHeader,
        });
        await runner.verifyElementIsVisible(signUpModal.signUpModalHeader);
        await runner.verifyContainText(
          signUpModal.signUpModalHeader,
          signUpData.headerText
        );
      });

      test("Verify that the username and password field labels are correctly displayed", async ({
        runner,
        signUpModal,
      }) => {
        await runner.verifyElementIsVisible(signUpModal.userNameLabel);
        await runner.verifyContainText(
          signUpModal.userNameLabel,
          signUpData.labels.username
        );
        await runner.verifyElementIsVisible(signUpModal.passwordLabel);
        await runner.verifyContainText(
          signUpModal.passwordLabel,
          signUpData.labels.password
        );
      });

      test("Verify that the user can type into the input fields and reopening the modal after clicking 'close' button shouldn't get removed the value", async ({
        runner,
        fakeUser,
        homePage,
        signUpModal,
      }) => {
        await runner.verifyElementIsVisible(signUpModal.usernameInputField);
        await runner.validateAttribute(
          signUpModal.usernameInputField,
          "type",
          "text"
        );
        await runner.fillInputBox(
          signUpModal.usernameInputField,
          fakeUser.username
        );
        await runner.verifyElementIsVisible(signUpModal.passwordInputField);
        await runner.validateAttribute(
          signUpModal.passwordInputField,
          "type",
          "password"
        );
        await runner.fillInputBox(
          signUpModal.passwordInputField,
          fakeUser.password
        );
        await runner.verifyElementIsVisible(signUpModal.closeButton);
        await runner.verifyElementsAreEnabled(signUpModal.closeButton);

        await runner.validateAndClick(
          signUpModal.closeButton,
          signUpData.closeButtonText
        );
        await runner.verifyElementIsVisible(homePage.navbarSignup);
        await runner.verifyElementsAreEnabled(homePage.navbarSignup);

        await runner.validateAndClick(
          homePage.navbarSignup,
          homeData.navbar.signup
        );
        await runner.verifyElementIsVisible(signUpModal.signUpModalHeader);
        await runner.verifyContainText(
          signUpModal.signUpModalHeader,
          signUpData.headerText
        );
        await runner.verifyElementIsVisible(signUpModal.usernameInputField);
        await runner.verifyToHaveValue(
          signUpModal.usernameInputField,
          fakeUser.username
        );
        await runner.verifyElementIsVisible(signUpModal.passwordInputField);
        await runner.verifyToHaveValue(
          signUpModal.passwordInputField,
          fakeUser.password
        );
      });

      test("Verify that the password input field masks the entered characters", async ({
        runner,
        signUpModal,
      }) => {
        await runner.verifyFieldIsPasswordType(signUpModal.passwordInputField);
      });

      test("Verify that the values of input fields shouldn't get removed on reopening the modal after clicking 'cross' button", async ({
        runner,
        homePage,
        signUpModal,
        fakeUser,
      }) => {
        await runner.verifyElementIsVisible(signUpModal.usernameInputField);
        await runner.validateAttribute(
          signUpModal.usernameInputField,
          "type",
          "text"
        );
        await runner.fillInputBox(
          signUpModal.usernameInputField,
          fakeUser.username
        );
        await runner.verifyElementIsVisible(signUpModal.passwordInputField);
        await runner.validateAttribute(
          signUpModal.passwordInputField,
          "type",
          "password"
        );
        await runner.fillInputBox(
          signUpModal.passwordInputField,
          fakeUser.password
        );
        await runner.verifyElementIsVisible(signUpModal.crossButton);
        await runner.verifyElementsAreEnabled(signUpModal.crossButton);
        await runner.clickOnElement(signUpModal.crossButton);
        await runner.verifyElementIsVisible(homePage.navbarSignup);
        await runner.verifyElementsAreEnabled(homePage.navbarSignup);

        await runner.validateAndClick(
          homePage.navbarSignup,
          homeData.navbar.signup
        );
        await runner.verifyElementIsVisible(signUpModal.signUpModalHeader);
        await runner.verifyContainText(
          signUpModal.signUpModalHeader,
          signUpData.headerText
        );
        await runner.verifyElementIsVisible(signUpModal.usernameInputField);
        await runner.verifyToHaveValue(
          signUpModal.usernameInputField,
          fakeUser.username
        );
        await runner.verifyElementIsVisible(signUpModal.passwordInputField);
        await runner.verifyToHaveValue(
          signUpModal.passwordInputField,
          fakeUser.password
        );
      });

      test("Verify that signup is prevented with a modal message when both username and password fields are empty", async ({
        runner,
        signUpHelper,
        signUpModal,
      }) => {
        await runner.verifyElementIsVisible(signUpModal.usernameInputField);
        await runner.verifyElementIsVisible(signUpModal.passwordInputField);
        await runner.verifyElementIsVisible(signUpModal.signUpButton);
        await runner.verifyElementsAreEnabled(signUpModal.signUpButton);

        await runner.handleAlertWithMessage(
          signUpData.userNameOrPasswordRequiredText
        );
        await signUpHelper.signup("", "");
      });

      test("Verify that signup is prevented when only the username is entered and the password is left blank", async ({
        runner,
        fakeUser,
        signUpModal,
        signUpHelper,
      }) => {
        await runner.verifyElementIsVisible(signUpModal.usernameInputField);
        await runner.verifyElementIsVisible(signUpModal.passwordInputField);
        await runner.verifyElementIsVisible(signUpModal.signUpButton);
        await runner.verifyElementsAreEnabled(signUpModal.signUpButton);
        await runner.handleAlertWithMessage(
          signUpData.userNameOrPasswordRequiredText
        );
        await signUpHelper.signup(fakeUser.username, "");
      });

      test("Verify that signup is prevented when only the password is entered and the username is left blank", async ({
        runner,
        fakeUser,
        signUpModal,
        signUpHelper,
      }) => {
        await runner.verifyElementIsVisible(signUpModal.usernameInputField);
        await runner.verifyElementIsVisible(signUpModal.passwordInputField);
        await runner.verifyElementIsVisible(signUpModal.signUpButton);
        await runner.verifyElementsAreEnabled(signUpModal.signUpButton);
        await runner.handleAlertWithMessage(
          signUpData.userNameOrPasswordRequiredText
        );
        await signUpHelper.signup("", fakeUser.password);
      });

      test("Verify that a user can register with valid and unique credentials", async ({
        runner,
        signUpModal,
        signUpHelper,
        fakeUser,
      }) => {
        await runner.verifyElementIsVisible(signUpModal.usernameInputField);
        await runner.verifyElementIsVisible(signUpModal.passwordInputField);
        await runner.verifyElementIsVisible(signUpModal.signUpButton);
        await runner.verifyElementsAreEnabled(signUpModal.signUpButton);
        await signUpHelper.signup(fakeUser.username, fakeUser.password);
        await runner.acceptWebAlert(signUpData.signUpSuccessText);
      });

      test("Verify that user cannot register with existing username", async ({
        runner,
        signUpHelper,
        envData,
        signUpModal,
      }) => {
        await runner.verifyElementIsVisible(signUpModal.usernameInputField);
        await runner.verifyElementIsVisible(signUpModal.passwordInputField);
        await runner.verifyElementIsVisible(signUpModal.signUpButton);
        await runner.verifyElementsAreEnabled(signUpModal.signUpButton);
        await signUpHelper.signup(envData.username, envData.password);
        await runner.acceptWebAlert(signUpData.userExistText);
      });

      // BUG_SIGNUP_01 -> Register is accepting the password shorter than 6 characters
      test("Verify that registration fails when the password is shorter than 6 characters", async ({
        runner,
        fakeUser,
        signUpModal,
        signUpHelper,
      }) => {
        await runner.verifyElementIsVisible(signUpModal.usernameInputField);
        await runner.verifyElementIsVisible(signUpModal.passwordInputField);
        await runner.verifyElementIsVisible(signUpModal.signUpButton);
        await runner.verifyElementsAreEnabled(signUpModal.signUpButton);
        await signUpHelper.signup(
          fakeUser.username,
          fakeUser.passwordLessThanSix
        );
        await runner.acceptWebAlert(signUpData.passwordLessThanText);
      });

      test("Verify that registration is succesfull and then user is logged in succesfully", async ({
        runner,
        fakeUser,
        signUpModal,
        signUpHelper,
        homePage,
        loginModal,
        loginHelper,
      }) => {
        await runner.verifyElementIsVisible(signUpModal.usernameInputField);
        await runner.verifyElementIsVisible(signUpModal.passwordInputField);
        await runner.verifyElementIsVisible(signUpModal.signUpButton);
        await runner.verifyElementsAreEnabled(signUpModal.signUpButton);
        await signUpHelper.signup(fakeUser.username, fakeUser.password);
        await runner.acceptWebAlert(signUpData.signUpSuccessText);
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.verifyElementsAreEnabled(homePage.navbarLogin);
        await runner.validateAndClick(
          homePage.navbarLogin,
          homeData.navbar.login
        );

        await runner.verifyElementIsVisible(loginModal.loginModalHeader);
        await runner.verifyContainText(
          loginModal.loginModalHeader,
          loginData.headerText
        );
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.verifyElementsAreEnabled(homePage.navbarLogin);
        await loginHelper.login(fakeUser.username, fakeUser.password);
        await runner.wait(5, { waitForSelector: homePage.navLogoutButton });
        await runner.wait(6, { waitForSelector: homePage.navLogoutButton });
        await runner.validateVisibleNavItems(homePage.navItems, [
          homeData.navbar.home,
          homeData.navbar.contact,
          homeData.navbar.about,
          homeData.navbar.cart,
          homeData.navbar.logout,
          `Welcome ${fakeUser.username}`,
        ]);
      });
    });
  }
}

const SignUpModalTest = new SignUpModal();
SignUpModalTest.runTest();
