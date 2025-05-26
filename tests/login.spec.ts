import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";
import homeData from "../testData/home.json";
import loginData from "../testData/login.json";

// test("", async ({runner}) => {

// })

class LoginModal extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("Login Modal Functionality Test", () => {
      test.beforeEach(async ({ runner, envData, loginModal, homePage }) => {
        await runner.navigateTo(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
        await runner.verifyUrlContains(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.verifyContainText(
          homePage.navbarLogin,
          homeData.navbar.login
        );
        await runner.clickOnElement(homePage.navbarLogin);
        await runner.wait(1, { waitForLoadState: "load" });
        await runner.verifyElementIsVisible(loginModal.loginModalHeader);
        await runner.verifyContainText(
          loginModal.loginModalHeader,
          loginData.headerText
        );
        await runner.wait(1, { waitForLoadState: "load" });
      });

      test("Verify that the username and password field labels are correctly displayed", async ({
        runner,
        loginModal,
      }) => {
        // validating username label
        await runner.verifyElementIsVisible(loginModal.usernameLabel);
        await runner.verifyContainText(
          loginModal.usernameLabel,
          loginData.labels.userName
        );
        await runner.verifyElementIsVisible(loginModal.passwordLabel);
        await runner.verifyContainText(
          loginModal.passwordLabel,
          loginData.labels.Password
        );
      });

      // <---------------------------------------------------------------------------------------->

      // test("Verify that the login modal opens when clicking the Log in button ", async ({
      //   runner,
      //   homePage,
      //   loginModal,
      // }) => {
      //   await runner.verifyElementIsVisible(homePage.navbarLogin);
      //   await runner.clickOnElement(homePage.navbarLogin);

      //   await runner.verifyContainText(loginModal.loginModalTitle, "Log in");
      //   await runner.verifyElementIsVisible(loginModal.usernameTextField);
      //   await runner.verifyElementIsVisible(loginModal.passwordTextField);
      //   await runner.verifyElementIsVisible(loginModal.closeButton);
      //   await runner.verifyElementIsVisible(loginModal.loginButton);
      // });
      // test("Verify that a user can log in with valid credentials ", async ({
      //   runner,
      //   homePage,
      //   loginModal,
      //   envData,
      // }) => {
      //   await runner.verifyElementIsVisible(homePage.navbarLogin);
      //   await runner.clickOnElement(homePage.navbarLogin);
      //   await runner.verifyContainText(loginModal.loginModalTitle, "Log in");
      //   await runner.fillInputBox(
      //     loginModal.usernameTextField,
      //     envData.username
      //   );
      //   await runner.fillInputBox(
      //     loginModal.passwordTextField,
      //     envData.password
      //   );
      //   await runner.clickOnElement(loginModal.loginButton);
      //   await runner.verifyElementIsVisible(loginModal.nameOfUserText);
      // });
      // test("Verify that a user cannot log in with invalid credentials ", async ({
      //   runner,
      //   homePage,
      //   loginModal,
      //   fakeUser,
      // }) => {
      //   await runner.verifyElementIsVisible(homePage.navbarLogin);
      //   await runner.clickOnElement(homePage.navbarLogin);
      //   await runner.verifyContainText(loginModal.loginModalTitle, "Log in");
      //   await runner.fillInputBox(
      //     loginModal.usernameTextField,
      //     fakeUser.username
      //   );
      //   await runner.fillInputBox(
      //     loginModal.passwordTextField,
      //     fakeUser.password
      //   );
      //   await runner.handleAlertWithMessage("User does not exist.");
      //   await runner.clickOnElement(loginModal.loginButton);
      // });
      // test("Verify that closing the login modal works as expected ", async ({
      //   runner,
      //   homePage,
      //   loginModal,
      //   envData,
      // }) => {
      //   await runner.verifyElementIsVisible(homePage.navbarLogin);
      //   await runner.clickOnElement(homePage.navbarLogin);
      //   await runner.verifyContainText(loginModal.loginModalTitle, "Log in");
      //   await runner.clickOnElement(loginModal.closeButton);
      //   await runner.navigateTo(envData.baseUrl);
      //   await runner.verifyElementIsVisible(homePage.homePageLogo);
      //   await runner.verifyElementIsVisible(homePage.navbarLogin);
      // });
      // test("Verify that logged-in user's name is displayed in the navbar ", async ({
      //   runner,
      //   homePage,
      //   loginModal,
      //   envData,
      // }) => {
      //   await runner.verifyElementIsVisible(homePage.navbarLogin);
      //   await runner.clickOnElement(homePage.navbarLogin);
      //   await runner.verifyContainText(loginModal.loginModalTitle, "Log in");
      //   await runner.fillInputBox(
      //     loginModal.usernameTextField,
      //     envData.username
      //   );
      //   await runner.fillInputBox(
      //     loginModal.passwordTextField,
      //     envData.password
      //   );
      //   await runner.clickOnElement(loginModal.loginButton);
      //   await runner.verifyElementIsVisible(loginModal.nameOfUserText);
      // });
      // test("Verify that the Log out option appears after a successful login ", async ({
      //   runner,
      //   homePage,
      //   loginModal,
      //   envData,
      // }) => {
      //   await runner.verifyElementIsVisible(homePage.navbarLogin);
      //   await runner.clickOnElement(homePage.navbarLogin);
      //   await runner.verifyContainText(loginModal.loginModalTitle, "Log in");
      //   await runner.fillInputBox(
      //     loginModal.usernameTextField,
      //     envData.username
      //   );
      //   await runner.fillInputBox(
      //     loginModal.passwordTextField,
      //     envData.password
      //   );
      //   await runner.clickOnElement(loginModal.loginButton);
      //   await runner.verifyElementIsVisible(loginModal.logoutButton);
      // });
      // test("Verify that user is logged out successfully when clicking Log out ", async ({
      //   runner,
      //   homePage,
      //   loginModal,
      //   envData,
      // }) => {
      //   await runner.verifyElementIsVisible(homePage.navbarLogin);
      //   await runner.clickOnElement(homePage.navbarLogin);
      //   await runner.verifyContainText(loginModal.loginModalTitle, "Log in");
      //   await runner.fillInputBox(
      //     loginModal.usernameTextField,
      //     envData.username
      //   );
      //   await runner.fillInputBox(
      //     loginModal.passwordTextField,
      //     envData.password
      //   );
      //   await runner.clickOnElement(loginModal.loginButton);
      //   await runner.verifyElementIsVisible(loginModal.logoutButton);
      //   await runner.clickOnElement(loginModal.logoutButton);
      //   await runner.verifyElementIsVisible(homePage.navbarLogin);
      // });
    });
  }
}

const loginModalTest = new LoginModal();
loginModalTest.runTest();
