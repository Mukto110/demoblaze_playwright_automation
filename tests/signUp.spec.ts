import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";

class SignupModal extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("Home Page Functionality Test", () => {
      test.beforeEach(async ({ runner, envData, homePage }) => {
        await runner.navigateTo(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
      });
      

      test("Verify that the signup modal opens when clicking the Sign up button TS_SGN_01", async ({
        runner,
        homePage,
        signUpModal,
        fakeUser
      }) => {
        await runner.verifyElementIsVisible(`css=#signin2`);
        // this to be updated when the locator is set in homePage.ts
        await runner.clickOnElement(`css=#signin2`);
        await runner.verifyContainText(signUpModal.signUpModalLabel,'Sign up')
        await runner.verifyElementIsVisible(signUpModal.usernameTextField)
        await runner.verifyElementIsVisible(signUpModal.passwordTextField)
        await runner.verifyElementIsVisible(signUpModal.closeButton)
        await runner.verifyElementIsVisible(signUpModal.signUpButton)

        
      });
      test("Verify that a new user can register with valid, unique credentials TS_SGN_02", async ({
        runner,
        homePage,
        signUpModal,
        fakeUser
      }) => {
        await runner.verifyElementIsVisible(`css=#signin2`);
        // this to be updated when the locator is set in homePage.ts
        await runner.clickOnElement(`css=#signin2`);
        await runner.verifyContainText(signUpModal.signUpModalLabel,'Sign up')
        await runner.fillInputBox(signUpModal.usernameTextField,fakeUser.username)
        await runner.fillInputBox(signUpModal.passwordTextField,fakeUser.password)
        await runner.handleAlertWithMessage('Sign up successful.')
        await runner.clickOnElement(signUpModal.signUpButton)
        
      });
      test("Verify that an error message is shown when registering with existing username TS_SGN_03", async ({
        runner,
        homePage,
        signUpModal,
        fakeUser
      }) => {
        await runner.verifyElementIsVisible(`css=#signin2`);
        // this to be updated when the locator is set in homePage.ts
        await runner.clickOnElement(`css=#signin2`);
        await runner.verifyContainText(signUpModal.signUpModalLabel,'Sign up')
        await runner.fillInputBox(signUpModal.usernameTextField,fakeUser.username)
        await runner.fillInputBox(signUpModal.passwordTextField,fakeUser.password)
        await runner.handleAlertWithMessage('This user already exist.')
        await runner.clickOnElement(signUpModal.signUpButton)
        
      });
      test("Verify mandatory field validation when signup fields are emptyTS_SGN_04", async ({
        runner,
        homePage,
        signUpModal,
        fakeUser
      }) => {
        await runner.verifyElementIsVisible(`css=#signin2`);
        // this to be updated when the locator is set in homePage.ts
        await runner.clickOnElement(`css=#signin2`);
        await runner.verifyContainText(signUpModal.signUpModalLabel,'Sign up')
        await runner.fillInputBox(signUpModal.usernameTextField,'')
        await runner.fillInputBox(signUpModal.passwordTextField,'')
        await runner.handleAlertWithMessage('Please fill out Username and Password.')
        await runner.clickOnElement(signUpModal.signUpButton)
        
      });
      test("Verify that closing the signup modal works as expected TS_SGN_05", async ({
        runner,
        homePage,
        signUpModal,
        envData
      }) => {
        await runner.verifyElementIsVisible(`css=#signin2`);
        // this to be updated when the locator is set in homePage.ts
        await runner.clickOnElement(`css=#signin2`);
        await runner.verifyContainText(signUpModal.signUpModalLabel,'Sign up')
        await runner.clickOnElement(signUpModal.closeButton)
        await runner.verifyUrlContains(envData.baseUrl)
        await runner.verifyElementIsVisible(homePage.homePageLogo);
        
      });
      test.fail("Verify that the password field must contain more than 6 characters during user registration TS_SGN_06", async ({
        runner,
        homePage,
        signUpModal,
        envData,fakeUser
      }) => {
        await runner.verifyElementIsVisible(`css=#signin2`);
        // this to be updated when the locator is set in homePage.ts
        await runner.clickOnElement(`css=#signin2`);
        await runner.verifyContainText(signUpModal.signUpModalLabel,'Sign up')
        await runner.fillInputBox(signUpModal.usernameTextField,fakeUser.username)
        await runner.fillInputBox(signUpModal.passwordTextField,"ash")
        await runner.validateMinLengthAfterSubmit(signUpModal.passwordTextField,signUpModal.signUpButton,4)

        
      });





    });
  }
}

const signUpModalTest = new SignupModal();
signUpModalTest.runTest();
