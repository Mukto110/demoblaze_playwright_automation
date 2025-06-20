import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";
import homeData from "../testData/home.json";
import loginData from "../testData/login.json";
import { HomePage } from "../pageObjectModel/homePage";

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
        await runner.verifyElementsAreEnabled(homePage.navbarLogin);
        await runner.mouseHover(homePage.navbarLogin);
        await runner.verifyElementToHaveCSSProperty(
          homePage.navbarLogin,
          "color",
          homeData.navItemsColorOnHover
        );
        await runner.validateAndClick(
          homePage.navbarLogin,
          homeData.navbar.login
        );

        await runner.wait(5, { waitForSelector: loginModal.loginModalHeader });
        await runner.wait(2, { waitForSelector: loginModal.loginModalHeader });
        await runner.verifyElementIsVisible(loginModal.loginModalHeader);
        await runner.verifyContainText(
          loginModal.loginModalHeader,
          loginData.headerText
        );
      });

      test("Verify that the username and password field labels are correctly displayed", async ({
        runner,
        loginModal,
      }) => {
        await runner.verifyElementIsVisible(loginModal.usernameLabel);
        await runner.validateLabel(
          loginModal.usernameLabel,
          loginData.labels.userName
        );
        await runner.verifyElementIsVisible(loginModal.passwordInputField);
        await runner.validateLabel(
          loginModal.passwordLabel,
          loginData.labels.Password
        );
      });

      test("Verify that the user can type into the input fields and reopening the modal after clicking 'close' button shouldn't get removed the value", async ({
        runner,
        fakeUser,
        loginModal,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(loginModal.userNameInputField);
        await runner.validateAttribute(
          loginModal.userNameInputField,
          "type",
          "text"
        );
        await runner.fillInputBox(
          loginModal.userNameInputField,
          fakeUser.username
        );
        await runner.verifyElementIsVisible(loginModal.passwordInputField);
        await runner.validateAttribute(
          loginModal.passwordInputField,
          "type",
          "password"
        );
        await runner.fillInputBox(
          loginModal.passwordInputField,
          fakeUser.password
        );
        await runner.verifyElementIsVisible(loginModal.closeButton);
        await runner.verifyElementsAreEnabled(loginModal.closeButton);
        await runner.validateAndClick(
          loginModal.closeButton,
          loginData.closeButtonText
        );

        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.verifyElementsAreEnabled(homePage.navbarLogin);
        await runner.validateAndClick(
          homePage.navbarLogin,
          homeData.navbar.login
        );
        await runner.verifyInputValue(
          loginModal.userNameInputField,
          fakeUser.username
        );
        await runner.verifyInputValue(
          loginModal.passwordInputField,
          fakeUser.password
        );
      });

      test("Verify that the values of input fields shouldn't get removed on reopening the modal after clicking 'cross' button", async ({
        runner,
        fakeUser,
        loginModal,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(loginModal.userNameInputField);
        await runner.fillInputBox(
          loginModal.userNameInputField,
          fakeUser.username
        );
        await runner.verifyElementIsVisible(loginModal.passwordInputField);
        await runner.fillInputBox(
          loginModal.passwordInputField,
          fakeUser.password
        );
        await runner.verifyElementIsVisible(loginModal.crossButton);
        await runner.verifyElementsAreEnabled(loginModal.crossButton);
        await runner.clickOnElement(loginModal.crossButton);
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.verifyElementsAreEnabled(homePage.navbarLogin);
        await runner.validateAndClick(
          homePage.navbarLogin,
          homeData.navbar.login
        );
        await runner.verifyInputValue(
          loginModal.userNameInputField,
          fakeUser.username
        );
        await runner.verifyInputValue(
          loginModal.passwordInputField,
          fakeUser.password
        );
      });

      test("Verify that login is prevented with a modal message when both username and password fields are empty", async ({
        runner,
        loginHelper,
        loginModal,
      }) => {
        await runner.verifyElementIsVisible(loginModal.userNameInputField);
        await runner.verifyElementIsVisible(loginModal.passwordInputField);
        await runner.verifyElementIsVisible(loginModal.loginButton);
        await runner.verifyElementsAreEnabled(loginModal.loginButton);

        await runner.validateAttribute(
          loginModal.loginButton,
          "type",
          "button"
        );
        await runner.handleAlertWithMessage(
          loginData.userNameOrPasswordRequiredText
        );
        await loginHelper.login("", "");
      });

      test("Verify that login is prevented when only the username is entered and the password is left blank", async ({
        runner,
        loginHelper,
        envData,
        loginModal,
      }) => {
        await runner.verifyElementIsVisible(loginModal.userNameInputField);
        await runner.verifyElementIsVisible(loginModal.passwordInputField);
        await runner.verifyElementIsVisible(loginModal.loginButton);
        await runner.verifyElementsAreEnabled(loginModal.loginButton);
        await runner.handleAlertWithMessage(
          loginData.userNameOrPasswordRequiredText
        );
        await loginHelper.login(envData.username, "");
      });

      test("Verify that log in is prevented when only the password is entered and the username is left blank", async ({
        runner,
        loginHelper,
        envData,
        loginModal,
      }) => {
        await runner.verifyElementIsVisible(loginModal.userNameInputField);
        await runner.verifyElementIsVisible(loginModal.passwordInputField);
        await runner.verifyElementIsVisible(loginModal.loginButton);
        await runner.verifyElementsAreEnabled(loginModal.loginButton);
        await runner.handleAlertWithMessage(
          loginData.userNameOrPasswordRequiredText
        );
        await loginHelper.login("", envData.password);
      });

      test("Verify that log in fails with incorrect username and password", async ({
        runner,
        loginHelper,
        fakeUser,
        loginModal,
      }) => {
        await runner.verifyElementIsVisible(loginModal.userNameInputField);
        await runner.verifyElementIsVisible(loginModal.passwordInputField);
        await runner.verifyElementIsVisible(loginModal.loginButton);
        await runner.verifyElementsAreEnabled(loginModal.loginButton);
        await loginHelper.login(fakeUser.username, fakeUser.password);
        await runner.acceptWebAlert(loginData.incorrectCredentialText);
      });

      test("Verify that the login fails with right username but wrong password", async ({
        runner,
        envData,
        fakeUser,
        loginHelper,
        loginModal,
      }) => {
        await runner.verifyElementIsVisible(loginModal.userNameInputField);
        await runner.verifyElementIsVisible(loginModal.passwordInputField);
        await runner.verifyElementIsVisible(loginModal.loginButton);
        await runner.verifyElementsAreEnabled(loginModal.loginButton);
        await loginHelper.login(envData.username, fakeUser.password);
        await runner.acceptWebAlert(loginData.wrongPasswordText);
      });

      test("Verify that the login fails with wrong username but right password", async ({
        runner,
        envData,
        fakeUser,
        loginHelper,
        loginModal,
      }) => {
        await runner.verifyElementIsVisible(loginModal.userNameInputField);
        await runner.verifyElementIsVisible(loginModal.passwordInputField);
        await runner.verifyElementIsVisible(loginModal.loginButton);
        await runner.verifyElementsAreEnabled(loginModal.loginButton);
        await loginHelper.login(fakeUser.username, envData.password);
        await runner.acceptWebAlert(loginData.incorrectCredentialText);
      });

      test("Verify that login is successful with valid username and password credentials", async ({
        runner,
        homePage,
        loginHelper,
        loginModal,
        envData,
      }) => {
        await runner.verifyElementIsVisible(loginModal.userNameInputField);
        await runner.verifyElementIsVisible(loginModal.passwordInputField);
        await runner.verifyElementIsVisible(loginModal.loginButton);
        await runner.verifyElementsAreEnabled(loginModal.loginButton);
        await loginHelper.login(envData.username, envData.password);
        await runner.wait(5, { waitForSelector: homePage.navLogoutButton });
        await runner.validateVisibleNavItems(homePage.navItems, [
          homeData.navbar.home,
          homeData.navbar.contact,
          homeData.navbar.about,
          homeData.navbar.cart,
          homeData.navbar.logout,
          `${loginData.welcomeText} ${envData.username}`,
        ]);
      });

      test("Verify that the user can logout successfully after login", async ({
        runner,
        envData,
        homePage,
        loginHelper,
        loginModal,
      }) => {
        await runner.verifyElementIsVisible(loginModal.userNameInputField);
        await runner.verifyElementIsVisible(loginModal.passwordInputField);
        await runner.verifyElementIsVisible(loginModal.loginButton);
        await runner.verifyElementsAreEnabled(loginModal.loginButton);
        await loginHelper.login(envData.username, envData.password);
        await runner.wait(5, { waitForSelector: homePage.navLogoutButton });
        await runner.validateVisibleNavItems(homePage.navItems, [
          homeData.navbar.home,
          homeData.navbar.contact,
          homeData.navbar.about,
          homeData.navbar.cart,
          homeData.navbar.logout,
          `${loginData.welcomeText} ${envData.username}`,
        ]);

        await runner.verifyElementIsVisible(homePage.navLogoutButton);
        await runner.verifyElementsAreEnabled(homePage.navLogoutButton);
        await runner.validateAndClick(
          homePage.navLogoutButton,
          homeData.navbar.logout
        );
        await runner.wait(5, { waitForSelector: homePage.navbarLogin });
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.validateVisibleNavItems(homePage.navItems, [
          homeData.navbar.home,
          homeData.navbar.contact,
          homeData.navbar.about,
          homeData.navbar.cart,
          homeData.navbar.login,
          homeData.navbar.signup,
        ]);
      });

      test("Verify that the login modal closes when the 'X' icon is clicked", async ({
        runner,
        loginModal,
      }) => {
        await runner.verifyElementIsVisible(loginModal.crossButton);
        await runner.verifyElementsAreEnabled(loginModal.crossButton);
        await runner.validateAttribute(
          loginModal.crossButton,
          "type",
          "button"
        );
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
