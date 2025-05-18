import { test as base, Page } from "@playwright/test";
import { Utils } from "./utils";
import { HomePage } from "../pageObjectModel/homePage.ts";
import { FakeUser } from "./fakeData.ts";
import { EnvData } from "./env.ts";
import { SignupModal } from "../pageObjectModel/signUpModal.ts";
import { LoginHelper } from "../utilities/authHelper.ts";
import { ProductDetailPage } from "../pageObjectModel/productDetailPage.ts";
import { LoginModal } from "../pageObjectModel/loginModal.ts";
import { CartPage } from "../pageObjectModel/cartPage.ts";

const test = base.extend<{
  runner: Utils;
  homePage: HomePage;
  fakeUser: FakeUser;
  envData: EnvData;
  signUpModal: SignupModal;
  loginHelper: LoginHelper;
  productDetailPage: ProductDetailPage;
  loginModal: LoginModal;
  cartPage: CartPage;
}>({
  page: async ({ page }, use) => {
    await page.waitForLoadState("load");
    await use(page);
    try {
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });
    } catch (err: any) {
      if (err.message.includes("Execution context was destroyed")) {
        console.warn("Skipped storage clearing due to navigation.");
      } else {
        throw err;
      }
    }
    await page.context().clearCookies();
  },

  runner: async ({ page }: { page: Page }, use) => {
    const utilsInstance = new Utils(page);
    await use(utilsInstance);
  },

  fakeUser: async ({ page }: { page: Page }, use) => {
    const fakeUserInstance = new FakeUser(page);
    await use(fakeUserInstance);
  },

  envData: async ({ page }: { page: Page }, use) => {
    const envDataInstance = new EnvData(page);
    await use(envDataInstance);
  },

  loginHelper: async ({ page }: { page: Page }, use) => {
    const loginHelperInstance = new LoginHelper(page);
    await use(loginHelperInstance);
  },

  homePage: async ({ page }: { page: Page }, use) => {
    const homePageInstance = new HomePage(page);
    await use(homePageInstance);
  },

  signUpModal: async ({ page }: { page: Page }, use) => {
    const signUpModalInstance = new SignupModal(page);
    await use(signUpModalInstance);
  },

  productDetailPage: async ({ page }: { page: Page }, use) => {
    const productDetailPageInstance = new ProductDetailPage(page);
    await use(productDetailPageInstance);
  },

  loginModal: async ({ page }: { page: Page }, use) => {
    const loginModalInstance = new LoginModal(page);
    await use(loginModalInstance);
  },

  cartPage: async ({ page }: { page: Page }, use) => {
    const cartPageInstance = new CartPage(page);
    await use(cartPageInstance);
  },
});

export { test };
