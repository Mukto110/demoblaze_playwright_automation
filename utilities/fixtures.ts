import { test as base, Page } from "@playwright/test";
import { Utils } from "./utils";
import { HomePage } from "../pageObjectModel/homePage.ts";
import { FakeUser } from "./fakeData.ts";
import { EnvData } from "./env.ts";

const test = base.extend<{
  runner: Utils;
  homePage: HomePage;
  fakeUser: FakeUser;
  envData: EnvData;
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

  homePage: async ({ page }: { page: Page }, use) => {
    const homePageInstance = new HomePage(page);
    await use(homePageInstance);
  },
});

export { test };
