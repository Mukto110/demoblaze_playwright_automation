import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";
import homeData from "../testData/home.json";
import loginData from "../testData/login.json";

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
        await runner.validateLabels([
          {
            selector: loginModal.usernameLabel,
            expectedText: loginData.labels.userName,
          },
          {
            selector: loginModal.passwordLabel,
            expectedText: loginData.labels.Password,
          },
        ]);
      });

      test("Verify that login is prevented with a modal message when both username and password fields are empty", async ({
        loginHelper,
        loginModal,
      }) => {
        await loginHelper.loginAndExpectAlert({
          username: "",
          password: "",
          expectedAlertText: loginData.userNameOrPasswordRequiredText,
          selectors: {
            usernameField: loginModal.userNameInputField,
            passwordField: loginModal.passwordInputField,
            loginButton: loginModal.loginButton,
          },
        });
      });

      test("Verify that login is prevented when only the username is entered and the password is left blank", async ({
        loginHelper,
        envData,
        loginModal,
      }) => {
        await loginHelper.loginAndExpectAlert({
          username: envData.username,
          password: "",
          expectedAlertText: loginData.userNameOrPasswordRequiredText,
          selectors: {
            usernameField: loginModal.userNameInputField,
            passwordField: loginModal.passwordInputField,
            loginButton: loginModal.loginButton,
          },
        });
      });

      test("Verify that log in is prevented when only the password is entered and the username is left blank", async ({
        loginHelper,
        envData,
        loginModal,
      }) => {
        await loginHelper.loginAndExpectAlert({
          username: "",
          password: envData.password,
          expectedAlertText: loginData.userNameOrPasswordRequiredText,
          selectors: {
            usernameField: loginModal.userNameInputField,
            passwordField: loginModal.passwordInputField,
            loginButton: loginModal.loginButton,
          },
        });
      });

      test("Verify that log in fails with incorrect username and password", async ({
        loginHelper,
        fakeUser,
        loginModal,
      }) => {
        await loginHelper.loginAndExpectAlert({
          username: fakeUser.username,
          password: fakeUser.password,
          expectedAlertText: loginData.incorrectCredentialText,
          selectors: {
            usernameField: loginModal.userNameInputField,
            passwordField: loginModal.passwordInputField,
            loginButton: loginModal.loginButton,
          },
        });
      });

      test("Verify that login is successful with valid username and password credentials", async ({
        runner,
        homePage,
        loginHelper,
        loginModal,
        envData,
      }) => {
        await loginHelper.login(envData.username, envData.password, {
          usernameField: loginModal.userNameInputField,
          passwordField: loginModal.passwordInputField,
          loginButton: loginModal.loginButton,
        });
        await runner.wait(1, { waitForLoadState: "load" });

        await runner.verifyLoginUIState({
          welcomeSelector: homePage.navWelcome,
          logoutSelector: homePage.navLogoutButton,
          loginSelector: homePage.navbarLogin,
          signupSelector: homePage.navbarSignup,
          expectedUsername: envData.username,
        });
      });

      test("Verify that the user can logout successfully after login", async ({
        runner,
        envData,
        homePage,
        loginHelper,
        loginModal,
      }) => {
        await loginHelper.login(envData.username, envData.password, {
          usernameField: loginModal.userNameInputField,
          passwordField: loginModal.passwordInputField,
          loginButton: loginModal.loginButton,
        });
        await runner.wait(1, { waitForLoadState: "load" });

        await runner.verifyLoginUIState({
          welcomeSelector: homePage.navWelcome,
          logoutSelector: homePage.navLogoutButton,
          loginSelector: homePage.navbarLogin,
          signupSelector: homePage.navbarSignup,
          expectedUsername: envData.username,
        });
        await runner.clickOnElement(homePage.navLogoutButton);
        await runner.wait(1, { waitForLoadState: "load" });
        await runner.verifyLogoutUIState({
          logoutSelector: homePage.navLogoutButton,
          loginSelector: homePage.navbarLogin,
          signupSelector: homePage.navbarSignup,
          welcomeSelector: homePage.navWelcome,
        });
      });

      test("Verify that the login modal closes when the 'X' icon is clicked", async ({
        runner,
        loginModal,
      }) => {
        await runner.verifyElementIsVisible(loginModal.crossButton);
        await runner.clickOnElement(loginModal.crossButton);
        await runner.verifyElementIsNotVisible(loginModal.loginModalHeader);
      });

      test("Verify that the password input field masks the entered characters", async ({
        runner,
        loginModal,
      }) => {
        await runner.verifyFieldIsPasswordType(loginModal.passwordInputField);
      });
    });
  }
}

const loginModalTest = new LoginModal();
loginModalTest.runTest();
