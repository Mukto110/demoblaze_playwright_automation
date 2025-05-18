import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";

class LoginModal extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("Home Page Functionality Test", () => {
      test.beforeEach(async ({ runner, envData, homePage }) => {
        await runner.navigateTo(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
      });

      test("Verify that the login modal opens when clicking the Log in button ", async ({
        runner,
        homePage,
        loginModal,
      }) => {
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.clickOnElement(homePage.navbarLogin);

        await runner.verifyContainText(loginModal.loginModalLabel, "Log in");
        await runner.verifyElementIsVisible(loginModal.usernameTextField);
        await runner.verifyElementIsVisible(loginModal.passwordTextField);
        await runner.verifyElementIsVisible(loginModal.closeButton);
        await runner.verifyElementIsVisible(loginModal.loginButton);
      });
      test("Verify that a user can log in with valid credentials ", async ({
        runner,
        homePage,
        loginModal,
        envData,
      }) => {
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.clickOnElement(homePage.navbarLogin);
        await runner.verifyContainText(loginModal.loginModalLabel, "Log in");
        await runner.fillInputBox(
          loginModal.usernameTextField,
          envData.username
        );
        await runner.fillInputBox(
          loginModal.passwordTextField,
          envData.password
        );
        await runner.clickOnElement(loginModal.loginButton);
        await runner.verifyElementIsVisible(loginModal.nameOfUserText);
      });
      test("Verify that a user cannot log in with invalid credentials ", async ({
        runner,
        homePage,
        loginModal,
        fakeUser,
      }) => {
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.clickOnElement(homePage.navbarLogin);
        await runner.verifyContainText(loginModal.loginModalLabel, "Log in");
        await runner.fillInputBox(
          loginModal.usernameTextField,
          fakeUser.username
        );
        await runner.fillInputBox(
          loginModal.passwordTextField,
          fakeUser.password
        );
        await runner.handleAlertWithMessage("User does not exist.");
        await runner.clickOnElement(loginModal.loginButton);
      });
      test("Verify that closing the login modal works as expected ", async ({
        runner,
        homePage,
        loginModal,
        envData,
      }) => {
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.clickOnElement(homePage.navbarLogin);
        await runner.verifyContainText(loginModal.loginModalLabel, "Log in");
        await runner.clickOnElement(loginModal.closeButton);
        await runner.navigateTo(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
        await runner.verifyElementIsVisible(homePage.navbarLogin);
      });
      test("Verify that logged-in user's name is displayed in the navbar ", async ({
        runner,
        homePage,
        loginModal,
        envData,
      }) => {
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.clickOnElement(homePage.navbarLogin);
        await runner.verifyContainText(loginModal.loginModalLabel, "Log in");
        await runner.fillInputBox(
          loginModal.usernameTextField,
          envData.username
        );
        await runner.fillInputBox(
          loginModal.passwordTextField,
          envData.password
        );
        await runner.clickOnElement(loginModal.loginButton);
        await runner.verifyElementIsVisible(loginModal.nameOfUserText);
      });
      test("Verify that the Log out option appears after a successful login ", async ({
        runner,
        homePage,
        loginModal,
        envData,
      }) => {
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.clickOnElement(homePage.navbarLogin);
        await runner.verifyContainText(loginModal.loginModalLabel, "Log in");
        await runner.fillInputBox(
          loginModal.usernameTextField,
          envData.username
        );
        await runner.fillInputBox(
          loginModal.passwordTextField,
          envData.password
        );
        await runner.clickOnElement(loginModal.loginButton);
        await runner.verifyElementIsVisible(loginModal.logoutButton);
      });
      test("Verify that user is logged out successfully when clicking Log out ", async ({
        runner,
        homePage,
        loginModal,
        envData,
      }) => {
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.clickOnElement(homePage.navbarLogin);
        await runner.verifyContainText(loginModal.loginModalLabel, "Log in");
        await runner.fillInputBox(
          loginModal.usernameTextField,
          envData.username
        );
        await runner.fillInputBox(
          loginModal.passwordTextField,
          envData.password
        );
        await runner.clickOnElement(loginModal.loginButton);
        await runner.verifyElementIsVisible(loginModal.logoutButton);
        await runner.clickOnElement(loginModal.logoutButton);
        await runner.verifyElementIsVisible(homePage.navbarLogin);
      });
    });
  }
}

const loginModalTest = new LoginModal();
loginModalTest.runTest();
