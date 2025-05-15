import { test as base, Page } from "@playwright/test";
import { Utils } from "./utils";
// import { RegisterPage } from "../pageObjectModel/registerPage";
import { HomePage } from "../pageObjectModel/homePage.ts";
// import { AccountCreatedPage } from "../pageObjectModel/accountCreatedPage";
// import { AccountDeletedPage } from "../pageObjectModel/accountDeletedPage";
// import { LoginPage } from "../pageObjectModel/loginPage";
// import { ContactUsPage } from "../pageObjectModel/contactUsPage";
// import { TestCasePage } from "../pageObjectModel/testCasePage";
// import { ProductsPage } from "../pageObjectModel/productsPage";
// import { ProductDetailPage } from "../pageObjectModel/productDetailPage";
// import { CartPage } from "../pageObjectModel/cartPage";
// import { CheckoutPage } from "../pageObjectModel/checkoutPage";
// import { PaymentPage } from "../pageObjectModel/paymentPage";
// import { CategoryPage } from "../pageObjectModel/categoryPage";
// import { BrandPage } from "../pageObjectModel/brandPage";
// import { OrderPlacePage } from "../pageObjectModel/orderPlacePage";

const test = base.extend<{
  runner: Utils;
//   registerPage: RegisterPage;
  homePage: HomePage;
//   accountCreatedPage: AccountCreatedPage;
//   accountDeletedPage: AccountDeletedPage;
//   loginPage: LoginPage;
//   contactUsPage: ContactUsPage;
//   testCasePage: TestCasePage;
//   productsPage: ProductsPage;
//   productDetailPage: ProductDetailPage;
//   cartPage: CartPage;
//   checkoutPage: CheckoutPage;
//   paymentPage: PaymentPage;
//   categoryPage: CategoryPage;
//   brandPage: BrandPage;
//   orderPlacePage: OrderPlacePage;
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

  homePage: async ({ page }: { page: Page }, use) => {
    const homePageInstance = new HomePage(page);
    await use(homePageInstance);
  },

//   registerPage: async ({ page }: { page: Page }, use) => {
//     const registerPageInstance = new RegisterPage(page);
//     await use(registerPageInstance);
//   },

//   accountCreatedPage: async ({ page }: { page: Page }, use) => {
//     const accountCreatedPageInstance = new AccountCreatedPage(page);
//     await use(accountCreatedPageInstance);
//   },

//   accountDeletedPage: async ({ page }: { page: Page }, use) => {
//     const accountDeletedPageInstance = new AccountDeletedPage(page);
//     await use(accountDeletedPageInstance);
//   },

//   loginPage: async ({ page }: { page: Page }, use) => {
//     const loginPageInstance = new LoginPage(page);
//     await use(loginPageInstance);
//   },

//   contactUsPage: async ({ page }: { page: Page }, use) => {
//     const contactUsPageInstance = new ContactUsPage(page);
//     await use(contactUsPageInstance);
//   },

//   testCasePage: async ({ page }: { page: Page }, use) => {
//     const testCasePageInstance = new TestCasePage(page);
//     await use(testCasePageInstance);
//   },

//   productsPage: async ({ page }: { page: Page }, use) => {
//     const productsPageInstance = new ProductsPage(page);
//     await use(productsPageInstance);
//   },

//   productDetailPage: async ({ page }: { page: Page }, use) => {
//     const productDetailPageInstance = new ProductDetailPage(page);
//     await use(productDetailPageInstance);
//   },

//   cartPage: async ({ page }: { page: Page }, use) => {
//     const cartPageInstance = new CartPage(page);
//     await use(cartPageInstance);
//   },

//   checkoutPage: async ({ page }: { page: Page }, use) => {
//     const checkoutPageInstance = new CheckoutPage(page);
//     await use(checkoutPageInstance);
//   },

//   paymentPage: async ({ page }: { page: Page }, use) => {
//     const paymentPageInstance = new PaymentPage(page);
//     await use(paymentPageInstance);
//   },

//   categoryPage: async ({ page }: { page: Page }, use) => {
//     const categoryPageInstance = new CategoryPage(page);
//     await use(categoryPageInstance);
//   },

//   brandPage: async ({ page }: { page: Page }, use) => {
//     const brandPageInstance = new BrandPage(page);
//     await use(brandPageInstance);
//   },

//   orderPlacePage: async ({ page }: { page: Page }, use) => {
//     const orderPlacePageInstance = new OrderPlacePage(page);
//     await use(orderPlacePageInstance);
//   },
});

export { test };
