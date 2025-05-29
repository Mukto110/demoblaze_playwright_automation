import { test as base, Page } from "@playwright/test";
import { Utils } from "./utils";
import { HomePage } from "../pageObjectModel/homePage.ts";
import { FakeUser } from "./fakeData.ts";
import { EnvData } from "./env.ts";
import { SignUpModal } from "../pageObjectModel/signUpModal.ts";
import { LoginHelper, SignupHelper } from "../utilities/authHelper.ts";
import { ProductDetailPage } from "../pageObjectModel/productDetailPage.ts";
import { LoginModal } from "../pageObjectModel/loginModal.ts";
import { CartPage } from "../pageObjectModel/cartPage.ts";
import { ContactModal } from "../pageObjectModel/contactModal.ts";
import { AboutModal } from "../pageObjectModel/aboutModal.ts";

const test = base.extend<{
  runner: Utils;
  homePage: HomePage;
  fakeUser: FakeUser;
  envData: EnvData;
  signUpModal: SignUpModal;
  loginHelper: LoginHelper;
  signUpHelper: SignupHelper;
  productDetailPage: ProductDetailPage;
  loginModal: LoginModal;
  cartPage: CartPage;
  contactModal: ContactModal;
  aboutModal: AboutModal;
}>({
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

  signUpHelper: async ({ page }: { page: Page }, use) => {
    const signUpHelperInstance = new SignupHelper(page);
    await use(signUpHelperInstance);
  },

  homePage: async ({ page }: { page: Page }, use) => {
    const homePageInstance = new HomePage(page);
    await use(homePageInstance);
  },

  signUpModal: async ({ page }: { page: Page }, use) => {
    const SignUpModalInstance = new SignUpModal(page);
    await use(SignUpModalInstance);
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

  contactModal: async ({ page }: { page: Page }, use) => {
    const contactModalInstance = new ContactModal(page);
    await use(contactModalInstance);
  },

  aboutModal: async ({ page }: { page: Page }, use) => {
    const aboutModalInstance = new AboutModal(page);
    await use(aboutModalInstance);
  },
});

export { test };
