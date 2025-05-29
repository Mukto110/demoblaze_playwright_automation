import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";
import homeData from "../testData/home.json";
import signUpData from "../testData/signup.json";

// test("", async ({runner}) => {

// })

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
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.verifyContainText(
          homePage.navbarLogin,
          homeData.navbar.login
        );
        await runner.clickOnElement(homePage.navbarSignup);
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
        await runner.verifyContainText(
          signUpModal.closeButton,
          signUpData.closeButtonText
        );
        await runner.clickOnElement(signUpModal.closeButton);
        await runner.verifyElementIsVisible(homePage.navbarSignup);
        await runner.verifyContainText(
          homePage.navbarSignup,
          homeData.navbar.signup
        );
        await runner.clickOnElement(homePage.navbarSignup);
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
        await runner.clickOnElement(signUpModal.crossButton);
        await runner.verifyElementIsVisible(homePage.navbarSignup);
        await runner.verifyContainText(
          homePage.navbarSignup,
          homeData.navbar.signup
        );
        await runner.clickOnElement(homePage.navbarSignup);
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
        fakeUser,
        signUpHelper,
        signUpModal,
      }) => {
        await runner.verifyElementIsVisible(signUpModal.usernameInputField);
        await runner.verifyElementIsVisible(signUpModal.passwordInputField);
        await signUpHelper.signupAndExpectAlert(
          "",
          "",
          signUpData.userNameOrPasswordRequiredText
        );
      });

      test("Verify that signup is prevented when only the username is entered and the password is left blank", async ({
        runner,
        fakeUser,
        signUpModal,
        signUpHelper,
      }) => {
        await runner.verifyElementIsVisible(signUpModal.usernameInputField);
        await runner.verifyElementIsVisible(signUpModal.passwordInputField);
        await signUpHelper.signupAndExpectAlert(
          fakeUser.username,
          "",
          signUpData.userNameOrPasswordRequiredText
        );
      });

      test("Verify that signup is prevented when only the password is entered and the username is left blank", async ({
        runner,
        fakeUser,
        signUpModal,
        signUpHelper,
      }) => {
        await runner.verifyElementIsVisible(signUpModal.usernameInputField);
        await runner.verifyElementIsVisible(signUpModal.passwordInputField);
        await signUpHelper.signupAndExpectAlert(
          "",
          fakeUser.password,
          signUpData.userNameOrPasswordRequiredText
        );
      });

      // <-------------------------------------------------------------------------------------------->

      // test("Verify that the signup modal opens when clicking the Sign up button ", async ({
      //   runner,
      //   homePage,
      //   SignUpModal,
      //   fakeUser,
      // }) => {
      //   await runner.verifyElementIsVisible(homePage.navbarSignup);
      //   await runner.clickOnElement(homePage.navbarSignup);
      //   await runner.verifyContainText(
      //     SignUpModal.SignUpModalHeader,
      //     "Sign up"
      //   );
      //   await runner.verifyElementIsVisible(SignUpModal.usernameTextField);
      //   await runner.verifyElementIsVisible(SignUpModal.passwordTextField);
      //   await runner.verifyElementIsVisible(SignUpModal.closeButton);
      //   await runner.verifyElementIsVisible(SignUpModal.signUpButton);
      // });
      // test("Verify that a new user can register with valid, unique credentials ", async ({
      //   runner,
      //   homePage,
      //   SignUpModal,
      //   fakeUser,
      // }) => {
      //   await runner.verifyElementIsVisible(homePage.navbarSignup);
      //   await runner.clickOnElement(homePage.navbarSignup);
      //   await runner.verifyContainText(
      //     SignUpModal.SignUpModalHeader,
      //     "Sign up"
      //   );
      //   await runner.fillInputBox(
      //     SignUpModal.usernameTextField,
      //     fakeUser.username
      //   );
      //   await runner.fillInputBox(
      //     SignUpModal.passwordTextField,
      //     fakeUser.password
      //   );
      //   await runner.handleAlertWithMessage("Sign up successful.");
      //   await runner.clickOnElement(SignUpModal.signUpButton);
      // });
      // test("Verify that an error message is shown when registering with existing username T", async ({
      //   runner,
      //   homePage,
      //   SignUpModal,
      //   fakeUser,
      // }) => {
      //   await runner.verifyElementIsVisible(homePage.navbarSignup);
      //   await runner.clickOnElement(homePage.navbarSignup);
      //   await runner.verifyContainText(
      //     SignUpModal.SignUpModalHeader,
      //     "Sign up"
      //   );
      //   await runner.fillInputBox(
      //     SignUpModal.usernameTextField,
      //     fakeUser.username
      //   );
      //   await runner.fillInputBox(
      //     SignUpModal.passwordTextField,
      //     fakeUser.password
      //   );
      //   await runner.handleAlertWithMessage("This user already exist.");
      //   await runner.clickOnElement(SignUpModal.signUpButton);
      // });
      // test("Verify mandatory field validation when signup fields are empty", async ({
      //   runner,
      //   homePage,
      //   SignUpModal,
      //   fakeUser,
      // }) => {
      //   await runner.verifyElementIsVisible(homePage.navbarSignup);
      //   await runner.clickOnElement(homePage.navbarSignup);
      //   await runner.verifyContainText(
      //     SignUpModal.SignUpModalHeader,
      //     "Sign up"
      //   );
      //   await runner.fillInputBox(SignUpModal.usernameTextField, "");
      //   await runner.fillInputBox(SignUpModal.passwordTextField, "");
      //   await runner.handleAlertWithMessage(
      //     "Please fill out Username and Password."
      //   );
      //   await runner.clickOnElement(SignUpModal.signUpButton);
      // });
      // test("Verify that closing the signup modal works as expected ", async ({
      //   runner,
      //   homePage,
      //   SignUpModal,
      //   envData,
      // }) => {
      //   await runner.verifyElementIsVisible(homePage.navbarSignup);
      //   await runner.clickOnElement(homePage.navbarSignup);
      //   await runner.verifyContainText(
      //     SignUpModal.SignUpModalHeader,
      //     "Sign up"
      //   );
      //   await runner.clickOnElement(SignUpModal.closeButton);
      //   await runner.verifyUrlContains(envData.baseUrl);
      //   await runner.verifyElementIsVisible(homePage.homePageLogo);
      // });
      // test("Verify that the password field must contain more than 6 characters during user registration ", async ({
      //   runner,
      //   homePage,
      //   SignUpModal,
      //   envData,
      //   fakeUser,
      // }) => {
      //   await runner.verifyElementIsVisible(homePage.navbarSignup);
      //   await runner.clickOnElement(homePage.navbarSignup);
      //   await runner.verifyContainText(
      //     SignUpModal.SignUpModalHeader,
      //     "Sign up"
      //   );
      //   await runner.fillInputBox(
      //     SignUpModal.usernameTextField,
      //     fakeUser.username
      //   );
      //   await runner.fillInputBox(SignUpModal.passwordTextField, "ash");
      //   await runner.validateMinLengthAfterSubmit(
      //     SignUpModal.passwordTextField,
      //     SignUpModal.signUpButton,
      //     4
      //   );
      // });
    });
  }
}

const SignUpModalTest = new SignUpModal();
SignUpModalTest.runTest();
