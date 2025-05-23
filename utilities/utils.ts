import { expect, Page, Locator } from "@playwright/test";
import logger from "./logger";
// import { allure } from "allure-playwright";
import { ExpectedValueProvider } from "./valueProvider";
import { HomePage } from "../pageObjectModel/homePage";

export class Utils {
  private page: Page;
  private expected: ExpectedValueProvider;

  constructor(page: Page) {
    this.page = page;
    this.expected = new ExpectedValueProvider();
  }

  private async captureScreenshotOnFailure(testName: string): Promise<void> {
    try {
      const screenshot = await this.page.screenshot();
      //   allure.attachment(`${testName} Screenshot`, screenshot, "image/png");
      logger.error(`${testName} failed. Screenshot captured.`);
    } catch (error) {
      logger.error("Error capturing screenshot:", error);
    }
  }

  private logMessage(
    message: string,
    level: "info" | "error" | "warn" = "info"
  ): void {
    if (level === "info") {
      logger.info(message);
    } else {
      logger.error(message);
    }
  }

  async navigateTo(url: string): Promise<void> {
    try {
      await this.page.goto(url);
      this.logMessage(`Navigated to ${url}`);
    } catch (error) {
      const errorMsg = `Failed to navigate to ${url}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("navigateTo");
      throw new Error(errorMsg);
    }
  }

  async goBack(): Promise<void> {
    try {
      await this.page.goBack();
      this.logMessage(`Navigated back to previous page`);
    } catch (error) {
      const errorMsg = `Failed to navigate back to the previous page`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("goBack");
      throw new Error(errorMsg);
    }
  }


async verifyElementIsVisible(selector: string): Promise<void> {
  try {
    const element = this.page.locator(selector);
    const count = await element.count();
    if (count === 0) {
      throw new Error(`No elements found with identifier: ${selector}`);
    }

    await expect(element.first()).toBeVisible({ timeout: 5000 });
    this.logMessage(`✅ Verified element(s) with identifier ${selector} is visible`);
  } catch (error) {
    const errorMsg = `Failed to verify element(s) with identifier ${selector} is visible: ${error.message}`;
    this.logMessage(errorMsg, "error");
    await this.captureScreenshotOnFailure("verifyElementIsVisible");
    throw new Error(errorMsg);
  }
}



  async verifyElementIsNotVisible(identifier: string): Promise<void> {
    try {
      await expect.soft(this.page.locator(identifier)).not.toBeVisible();
      this.logMessage(
        `Verified element with identifier ${identifier} is not visible`
      );
    } catch (error) {
      const errorMsg = `Failed to verify element with identifier ${identifier} is not visible`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyElementIsNotVisible");
      throw new Error(errorMsg);
    }
  }

  async verifyElementIsHidden(identifier: string): Promise<void> {
    try {
      await expect.soft(this.page.locator(identifier)).toBeHidden();
      this.logMessage(
        `Verified element with identifier ${identifier} is hidden`
      );
    } catch (error) {
      const errorMsg = `Failed to verify element with identifier ${identifier} is hidden`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyElementIsHidden");
      throw new Error(errorMsg);
    }
  }

  async clickOnElement(identifier: string): Promise<void> {
    try {
      await this.page.isVisible(identifier);
      await this.page.locator(identifier).click();
      this.logMessage(`Clicked on element with identifier: ${identifier}`);
    } catch (error) {
      const errorMsg = `Failed to click on element with identifier: ${identifier}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("clickOnElement");
      throw new Error(errorMsg);
    }
  }

  async validateAndClick(
    identifier: string,
    expectedText: string
  ): Promise<void> {
    try {
      await this.page.locator(identifier).focus();
      await expect.soft(this.page.locator(identifier)).toBeVisible();
      const actualText = await this.page.locator(identifier).textContent();

      if (actualText && actualText.trim() === expectedText) {
        await this.page.locator(identifier).click();
        this.logMessage(
          `Validated and clicked on ${identifier} with expected text "${expectedText}"`
        );
      } else {
        const errorMsg = `Text mismatch on ${identifier}. Expected: "${expectedText}", Found: "${actualText}"`;
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure("validateAndClick");
        throw new Error(errorMsg);
      }
    } catch (error) {
      throw error;
    }
  }

  async verifyTitle(title: string): Promise<void> {
    try {
      await expect(this.page).toHaveTitle(title);
      this.logMessage(`Verified page title: "${title}"`);
    } catch (error) {
      const errorMsg = `Failed to verify title: "${title}"`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyTitle");
      throw new Error(errorMsg);
    }
  }

  async fillInputBox(identifier: string, text: string): Promise<void> {
    try {
      await this.page.locator(identifier).fill(text);
      this.logMessage(`Filled input box (${identifier}) with text: "${text}"`);
    } catch (error) {
      const errorMsg = `Failed to fill input box (${identifier}) with text: "${text}"`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("fillInputBox");
      throw new Error(errorMsg);
    }
  }

  async verifyToHaveValue(
    identifier: string,
    inputFieldText: string
  ): Promise<void> {
    try {
      await expect
        .soft(this.page.locator(identifier))
        .toHaveValue(inputFieldText);
      this.logMessage(
        `Verified element (${identifier}) has value: "${inputFieldText}"`
      );
    } catch (error) {
      const errorMsg = `Failed to verify element (${identifier}) has value: "${inputFieldText}"`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyToHaveValue");
      throw new Error(errorMsg);
    }
  }

  async selectDropdownByValue(selector: string, value: string): Promise<void> {
    try {
      await this.page.selectOption(selector, { value });
      this.logMessage(`Selected dropdown (${selector}) value: "${value}"`);
    } catch (error) {
      const errorMsg = `Failed to select value "${value}" in dropdown: ${selector}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("selectDropdownByValue");
      throw new Error(errorMsg);
    }
  }

  async verifyContainText(
    identifier: string,
    expectedText: string
  ): Promise<void> {
    try {
      await expect
        .soft(this.page.locator(identifier))
        .toContainText(expectedText);
      this.logMessage(
        `Verified element with identifier ${identifier} contains text: "${expectedText}"`
      );
    } catch (error) {
      const errorMsg = `Failed to verify element with identifier ${identifier} contains text: "${expectedText}"`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyContainText");
      throw new Error(errorMsg);
    }
  }

  async wait(
    time: number,
    options: {
      waitForSelector?: string;
      waitForNetworkIdle?: boolean;
      waitForLoadState?: "load" | "domcontentloaded" | "networkidle";
    } = {}
  ): Promise<void> {
    const { waitForSelector, waitForNetworkIdle, waitForLoadState } = options;

    try {
      await this.page.waitForTimeout(time * 1000);

      if (waitForSelector) {
        await this.page.waitForSelector(waitForSelector, {
          state: "visible",
          timeout: time * 1000,
        });
        this.logMessage(`Waited for selector: ${waitForSelector}`);
      }

      if (waitForNetworkIdle) {
        await this.page.waitForLoadState("networkidle", {
          timeout: time * 1000,
        });
        this.logMessage("Waited for network idle");
      }

      if (waitForLoadState) {
        await this.page.waitForLoadState(waitForLoadState, {
          timeout: time * 1000,
        });
        this.logMessage(`Waited for page load state: ${waitForLoadState}`);
      }
    } catch (error) {
      const errorMsg = "Failed to wait for the specified conditions";
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("wait");
      throw new Error(errorMsg);
    }
  }

  async verifyUrlContains(text: string): Promise<void> {
    try {
      const currentUrl = this.page.url();
      expect(currentUrl).toContain(text);
      this.logMessage(`Verified URL contains text: "${text}"`);
    } catch (error) {
      const errorMsg = `Current URL does not contain expected text: "${text}"`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyUrlContains");
      throw new Error(errorMsg);
    }
  }

  async scrollToFooter(): Promise<void> {
    try {
      const footerElement = this.page.locator("#footer");
      await footerElement.scrollIntoViewIfNeeded();
      this.logMessage("Scrolled to the footer");
    } catch (error) {
      const errorMsg = "Failed to scroll to the footer";
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("scrollToFooter");
      throw new Error(errorMsg);
    }
  }

  async scrollToElement(selector: string): Promise<void> {
    try {
      const targetElement = this.page.locator(selector); // Use the passed selector
      await targetElement.scrollIntoViewIfNeeded();
      this.logMessage(`Scrolled to the element with selector: ${selector}`);
    } catch (error) {
      const errorMsg = `Failed to scroll to the element with selector: ${selector}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("scrollToElement");
      throw new Error(errorMsg);
    }
  }

  async mouseHover(identifier: string): Promise<void> {
    try {
      await this.page.locator(identifier).hover();
      this.logMessage(`Hovered over element with identifier: ${identifier}`);
    } catch (error) {
      const errorMsg = `Failed to hover over element with identifier: ${identifier}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("mouseHover");
      throw new Error(errorMsg);
    }
  }

  async isElementVisible(identifier: string): Promise<boolean> {
    try {
      return await this.page.locator(identifier).isVisible();
    } catch {
      return false;
    }
  }

  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.waitForTimeout(1000);
  }

  async waitForDownload(
    clickAction: () => Promise<void>,
    downloadPath?: string
  ) {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      clickAction(),
    ]);

    const suggestedFilename = download.suggestedFilename();
    const savePath = downloadPath || `downloads/${suggestedFilename}`;

    await download.saveAs(savePath);
    console.log(`✅ File downloaded successfully: ${savePath}`);
    return savePath;
  }

  async handleAlertWithMessage(expectedMessage: string): Promise<void> {
    try {
      this.page.once("dialog", async (dialog) => {
        const message = dialog.message();
        expect(message).toBe(expectedMessage);
        await dialog.accept();
        this.logMessage(`Alert with message "${message}" accepted.`);
      });
    } catch (error) {
      const errorMsg = `Failed to handle alert with expected message: "${expectedMessage}"`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("handleAlertWithMessage");
      throw new Error(errorMsg);
    }
  }

  async validateMinLengthAfterSubmit(
    inputSelector: string,
    submitSelector: string,
    minLength: number
  ): Promise<void> {
    try {
      // Click the submit button
      await this.page.locator(submitSelector).click();
      this.logMessage(`Clicked submit button: ${submitSelector}`);

      // Wait briefly for validation logic to run (DOM update, message, etc.)
      await this.page.waitForTimeout(500);

      // Get the value of the input field
      const inputField = this.page.locator(inputSelector);
      await expect(inputField).toBeVisible();

      const value = await inputField.inputValue();

      if (value.length <= minLength) {
        throw new Error(
          `Expected input to have less than ${minLength} characters for validation error, but got ${value.length}.`
        );
      }

      this.logMessage(
        `Validation triggered successfully: input has ${value.length} characters (expected less than ${minLength}).`
      );
    } catch (error) {
      const errorMsg = `Min-length validation failed after submit: ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateMinLengthAfterSubmit");
      throw new Error(errorMsg);
    }
  }

  async scrollToTop() {
    await this.page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  async verifyNotEqual(actual: any, expected: any, message?: string) {
    expect(
      actual,
      message || `Expected values to be different but got the same: ${actual}`
    ).not.toBe(expected);
  }

  async verifyEqual(actual: any, expected: any, message?: string) {
    expect(
      actual,
      message || `Expected ${actual} to be equal to ${expected}`
    ).toBe(expected);
  }

  async getAttributeFromLocator(
    locator: string,
    attributeName: string | "src" | "href"
  ): Promise<string | null> {
    const value = await this.page.locator(locator).getAttribute(attributeName);
    if (value === null) {
      throw new Error(
        `Attribute '${attributeName}' not found for locator: ${locator}`
      );
    }
    return value;
  }
  async getText(selector: string): Promise<string> {
    try {
      const locator = this.page.locator(selector);
      await expect(locator).toBeVisible();
      const text = await locator.first().innerText();
      this.logMessage(`Text of '${selector}' is "${text.trim()}"`);
      return text.trim();
    } catch (err: any) {
      const msg = `Failed to get text from '${selector}': ${err.message}`;
      this.logMessage(msg, "error");
      await this.captureScreenshotOnFailure("getText");
      throw new Error(msg);
    }
  }

  async getAllTexts(selector: string): Promise<string[]> {
    try {
      const elements = await this.page.$$(selector);
      const texts = await Promise.all(
        elements.map(async (el) => {
          return (await el.textContent())?.trim() || "";
        })
      );
      return texts;
    } catch (error) {
      this.logMessage(
        `Failed to get texts from selector: ${selector}`,
        "error"
      );
      await this.captureScreenshotOnFailure("getAllTexts");
      throw error;
    }
  }

  async typeText(selector: string, text: string): Promise<void> {
    try {
      const locator = this.page.locator(selector);
      await expect(locator).toBeVisible(); // ensure visible
      await locator.fill(""); // clear existing value
      await locator.type(text); // type the text
      this.logMessage(`Typed "${text}" into '${selector}'`);
    } catch (err: any) {
      const msg = `Failed to type into '${selector}': ${err.message}`;
      this.logMessage(msg, "error");
      await this.captureScreenshotOnFailure("typeText");
      throw new Error(msg);
    }
  }

  async verifyInputValue(
    selector: string,
    expected: string,
    message?: string
  ): Promise<void> {
    try {
      const locator = this.page.locator(selector);
      await expect(locator).toBeVisible();
      const actual = await locator.inputValue();
      expect(
        actual,
        message ||
          `Expected value of '${selector}' to be "${expected}" but got "${actual}"`
      ).toBe(expected);

      this.logMessage(
        `Verified input '${selector}' value equals "${expected}"`
      );
    } catch (err: any) {
      const msg =
        message ||
        `Failed to verify input value for '${selector}': ${err.message}`;
      this.logMessage(msg, "error");
      await this.captureScreenshotOnFailure("verifyInputValue");
      throw new Error(msg);
    }
  }

  async verifyElementIsDisabled(
    selector: string,
    message?: string
  ): Promise<void> {
    try {
      const locator = this.page.locator(selector);
      await expect(locator).toBeVisible();

      // Playwright has a built‑in matcher for disabled state
      await expect
        .soft(
          locator,
          message || `Expected element '${selector}' to be disabled`
        )
        .toBeDisabled();

      this.logMessage(`Verified element '${selector}' is disabled`);
    } catch (err: any) {
      const msg =
        message ||
        `Failed to verify element '${selector}' is disabled: ${err.message}`;
      this.logMessage(msg, "error");
      await this.captureScreenshotOnFailure("verifyElementIsDisabled");
      throw new Error(msg);
    }
  }

  async getVideoCurrentTime(selector: string): Promise<number> {
    return this.page.evaluate((sel) => {
      const v = document.querySelector(sel) as HTMLVideoElement | null;
      return v ? Math.floor(v.currentTime) : 0;
    }, selector);
  }
  async refreshPage(): Promise<void> {
    try {
      await this.page.reload();
      this.logMessage("✅ Page refreshed successfully.");
    } catch (error) {
      const errorMsg = "❌ Failed to refresh the page.";
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("refreshPage");
      throw new Error(errorMsg);
    }
  }

  async clearSessionData(): Promise<void> {
    try {
      // ✅ Clear only sessionStorage
      await this.page.evaluate(() => {
        sessionStorage.clear();
      });

      // ✅ Clear cookies
      await this.page.context().clearCookies();

      this.logMessage(
        "✅ Cleared sessionStorage and cookies. localStorage preserved."
      );
    } catch (error) {
      const errorMsg = "❌ Failed to clear sessionStorage and cookies.";
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("clearSessionData");
      throw new Error(errorMsg);
    }
  }

  async clickAndVerifyAlertMessage(
    triggerSelector: string,
    expectedAlertMessage: string
  ): Promise<void> {
    try {
      this.page.once("dialog", async (dialog) => {
        const actualMessage = dialog.message();

        if (actualMessage !== expectedAlertMessage) {
          const errorMsg = `Alert message mismatch: expected "${expectedAlertMessage}", but got "${actualMessage}"`;
          this.logMessage(errorMsg, "error");
          await this.captureScreenshotOnFailure("clickAndVerifyAlertMessage");
          throw new Error(errorMsg);
        }

        this.logMessage(`Verified alert message: "${actualMessage}"`);
        await dialog.accept();
        this.logMessage("Alert accepted.");
      });

      await this.page.locator(triggerSelector).click();
      this.logMessage(`Clicked on element: ${triggerSelector}`);
    } catch (error) {
      const errorMsg = `Failed to handle alert for ${triggerSelector}: ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("clickAndVerifyAlertMessage");
      throw new Error(errorMsg);
    }
  }

  async verifyGreaterThan(
    actual: number,
    expectedMin: number,
    message?: string
  ): Promise<void> {
    try {
      expect(
        actual,
        message || `Expected ${actual} to be greater than ${expectedMin}`
      ).toBeGreaterThan(expectedMin);

      this.logMessage(`Verified ${actual} > ${expectedMin}`);
    } catch (err: any) {
      const msg =
        message ||
        `Failed greater‑than verification: ${actual} is not > ${expectedMin}`;
      this.logMessage(msg, "error");
      await this.captureScreenshotOnFailure("verifyGreaterThan");
      throw new Error(msg);
    }
  }

  async getAllProductCards(selector: string): Promise<Locator[]> {
    try {
      const cardsLocator = this.page.locator(selector);
      const count = await cardsLocator.count();

      const cards: Locator[] = [];
      for (let i = 0; i < count; i++) {
        cards.push(cardsLocator.nth(i));
      }

      this.logMessage(`✅ Found ${count} product cards`);
      return cards;
    } catch (error) {
      const errorMsg = `❌ Failed to get product cards for selector '${selector}': ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("getAllProductCards");
      throw new Error(errorMsg);
    }
  }

  async validateProductContainers(locator: string): Promise<void> {
    try {
      await this.page.waitForSelector(locator, { timeout: 10000 });

      const containers = this.page.locator(locator);
      const count = await containers.count();
      this.logMessage(`✅ Found ${count} product cards`);

      if (count === 0) {
        const errorMsg = "❌ No product containers found.";
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure("validateProductContainers");
        throw new Error(errorMsg);
      }

      for (let i = 0; i < count; i++) {
        await expect(containers.nth(i)).toBeVisible();
      }
    } catch (error: any) {
      const errorMsg = `Failed to validate product containers: ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateProductContainers");
      throw new Error(errorMsg);
    }
  }

  async validateProductTitles(selector: string): Promise<void> {
    try {
      const titles = this.page.locator(selector);
      const count = await titles.count();

      for (let i = 0; i < count; i++) {
        const title = await titles.nth(i).innerText();
        const pattern = this.expected.getExpectedProductTitlePattern();
        if (!pattern.test(title)) {
          throw new Error(
            `❌ Title at index ${i} failed validation: "${title}"`
          );
        }
        this.logMessage(`✅ Title ${i + 1} passed: "${title}"`);
      }
    } catch (error: any) {
      const errorMsg = `Failed to validate product titles: ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateProductTitles");
      throw new Error(errorMsg);
    }
  }

  async validateProductPrices(selector: string): Promise<void> {
    try {
      const prices = this.page.locator(selector);
      const count = await prices.count();

      for (let i = 0; i < count; i++) {
        const price = await prices.nth(i).innerText();
        const pattern = this.expected.getExpectedProductPricePattern();
        if (!pattern.test(price)) {
          throw new Error(
            `❌ Price at index ${i} failed validation: "${price}"`
          );
        }
        this.logMessage(`✅ Price ${i + 1} passed: "${price}"`);
      }
    } catch (error: any) {
      const errorMsg = `Failed to validate product prices: ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateProductPrices");
      throw new Error(errorMsg);
    }
  }

  async validateProductImages(selector: string): Promise<void> {
    try {
      const images = this.page.locator(selector);
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const src = await images.nth(i).getAttribute("src");
        const pattern = this.expected.getExpectedProductImagePattern();
        if (!src || !pattern.test(src)) {
          throw new Error(`❌ Image at index ${i} failed validation: "${src}"`);
        }
        this.logMessage(`✅ Image ${i + 1} passed: "${src}"`);
      }
    } catch (error: any) {
      const errorMsg = `Failed to validate product images: ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateProductImages");
      throw new Error(errorMsg);
    }
  }

  async validateProductDescriptions(selector: string): Promise<void> {
    try {
      const containers = this.page.locator(selector);
      const count = await containers.count();

      for (let i = 0; i < count; i++) {
        const text = (await containers.nth(i).innerText()).trim();
        if (!text) {
          throw new Error(`❌ Description at index ${i} is empty.`);
        }
        this.logMessage(`✅ Description ${i + 1} is present.`);
      }
    } catch (error: any) {
      const errorMsg = `Failed to validate product descriptions: ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateProductDescriptions");
      throw new Error(errorMsg);
    }
  }

  async verifyCarouselIsAutoChanging(
    carouselLocator: string,
    activeImageLocator: string,
    waitTimeInSeconds: number = 7
  ): Promise<void> {
    try {
      await this.verifyElementIsVisible(carouselLocator);

      const firstImageSrc = await this.getAttributeFromLocator(
        activeImageLocator,
        "src"
      );

      await this.wait(waitTimeInSeconds);

      const secondImageSrc = await this.getAttributeFromLocator(
        activeImageLocator,
        "src"
      );

      await this.verifyNotEqual(
        firstImageSrc,
        secondImageSrc,
        "Carousel image did not auto-change."
      );

      this.logMessage(
        "✅ Carousel auto-change functionality verified successfully."
      );
    } catch (error: any) {
      const errorMsg = `❌ Failed to verify carousel auto-change: ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyCarouselIsAutoChanging");
      throw new Error(errorMsg);
    }
  }

  async verifyCarouselArrowNavigation(
    carouselLocator: string,
    activeImageLocator: string,
    nextButtonLocator: string,
    prevButtonLocator: string
  ): Promise<void> {
    try {
      await this.verifyElementIsVisible(carouselLocator);

      const firstImage = await this.getAttributeFromLocator(
        activeImageLocator,
        "src"
      );

      await this.clickOnElement(nextButtonLocator);
      await this.wait(1);
      const secondImage = await this.getAttributeFromLocator(
        activeImageLocator,
        "src"
      );
      await this.verifyNotEqual(secondImage, firstImage);

      await this.clickOnElement(nextButtonLocator);
      await this.wait(1);
      const thirdImage = await this.getAttributeFromLocator(
        activeImageLocator,
        "src"
      );
      await this.verifyNotEqual(thirdImage, secondImage);

      await this.clickOnElement(prevButtonLocator);
      await this.wait(1);
      const backToSecond = await this.getAttributeFromLocator(
        activeImageLocator,
        "src"
      );
      await this.verifyEqual(backToSecond, secondImage);

      await this.clickOnElement(prevButtonLocator);
      await this.wait(1);
      const backToFirst = await this.getAttributeFromLocator(
        activeImageLocator,
        "src"
      );
      await this.verifyEqual(backToFirst, firstImage);

      this.logMessage("✅ Carousel arrow navigation verified successfully.");
    } catch (error: any) {
      const errorMsg = `❌ Failed to verify carousel navigation: ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyCarouselArrowNavigation");
      throw new Error(errorMsg);
    }
  }

  async verifyProductTitlesMatch(
    selector: string,
    pattern: RegExp
  ): Promise<void> {
    try {
      const titleElements = this.page.locator(selector);
      const count = await titleElements.count();

      if (count === 0) {
        const errorMsg = `❌ No product titles found for selector: ${selector}`;
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure("verifyProductTitlesMatch");
        throw new Error(errorMsg);
      }

      for (let i = 0; i < count; i++) {
        const title = (await titleElements.nth(i).innerText()).trim();
        if (!pattern.test(title)) {
          const errorMsg = `❌ Title "${title}" at index ${i} did not match expected pattern`;
          this.logMessage(errorMsg, "error");
          await this.captureScreenshotOnFailure("verifyProductTitlesMatch");
          throw new Error(errorMsg);
        }
      }

      this.logMessage(
        `✅ All ${count} product titles matched the expected pattern`
      );
    } catch (error: any) {
      const finalMsg = `Failed to verify product titles match: ${error.message}`;
      this.logMessage(finalMsg, "error");
      await this.captureScreenshotOnFailure("verifyProductTitlesMatch");
      throw new Error(finalMsg);
    }
  }

  async waitForProductChangeAfterPagination(
    nextButtonSelector: string,
    productTitleSelector: string,
    timeout = 5000
  ): Promise<void> {
    try {
      const initialText = await this.page
        .locator(productTitleSelector)
        .first()
        .innerText();
      this.logMessage(`Initial product title: "${initialText}"`, "info");

      await this.clickOnElement(nextButtonSelector);
      this.logMessage("Clicked on pagination next button", "info");

      const endTime = Date.now() + timeout;
      while (Date.now() < endTime) {
        const currentText = await this.page
          .locator(productTitleSelector)
          .first()
          .innerText();

        if (currentText.trim() !== initialText.trim()) {
          this.logMessage(
            `Product title changed successfully to: "${currentText}"`,
            "info"
          );
          return;
        }

        await this.page.waitForTimeout(100);
      }

      const errorMsg = `❌ Product title did not change within ${timeout}ms after clicking pagination button`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("pagination_title_change_timeout");
      throw new Error(errorMsg);
    } catch (error) {
      this.logMessage(
        `❌ Error in waitForProductChangeAfterPagination: ${error}`,
        "error"
      );
      await this.captureScreenshotOnFailure("pagination_error");
      throw error;
    }
  }

  async verifyPaginationReturn(homePage: HomePage): Promise<void> {
    try {
      const firstProductPage1 = await this.getText(
        homePage.firstProductCardTitle
      );
      const secondProductPage1 = await this.getText(
        homePage.secondProductCardTitle
      );
      this.logMessage(
        `📄 Captured Page 1 product titles: "${firstProductPage1}", "${secondProductPage1}"`,
        "info"
      );

      await this.clickOnElement(homePage.paginationNextButton);
      await this.wait(1);

      const page2ProductTitles = await this.getAllTexts(homePage.productTitle);
      const foundFirst = page2ProductTitles.includes(firstProductPage1);
      const foundSecond = page2ProductTitles.includes(secondProductPage1);

      if (foundFirst || foundSecond) {
        this.logMessage(
          `⚠️ Page 2 incorrectly contains ${
            foundFirst && foundSecond
              ? "first and second"
              : foundFirst
              ? "first"
              : "second"
          } product(s) from Page 1.`,
          "warn"
        );
      } else {
        this.logMessage(
          "✅ Page 2 does not contain products from Page 1.",
          "info"
        );
      }

      await this.clickOnElement(homePage.paginationPreviousButton);
      await this.wait(1);

      const page1TitlesAgain = await this.getAllTexts(homePage.productTitle);
      const firstBack = page1TitlesAgain.includes(firstProductPage1);
      const secondBack = page1TitlesAgain.includes(secondProductPage1);

      if (!firstBack || !secondBack) {
        this.logMessage(
          `⚠️ Pagination Bug: After returning to Page 1, ${
            !firstBack && !secondBack ? "both" : !firstBack ? "first" : "second"
          } product(s) are missing.\nExpected: "${firstProductPage1}", "${secondProductPage1}"\nActual: ${JSON.stringify(
            page1TitlesAgain
          )}`,
          "warn"
        );
      } else {
        this.logMessage("✅ Pagination return validation passed.", "info");
      }
    } catch (error) {
      this.logMessage(`❌ Error in verifyPaginationReturn: ${error}`, "error");
      await this.captureScreenshotOnFailure("pagination_return_error");
      throw error;
    }
  }

async addAndVerifyCartProducts(
  productCardsLocator: string,
  productTitlesLocator: string,
  productPricesLocator: string,
  addToCartButtonLocator: string,
  homeButtonLocator: string,
  cartNavLocator: string,
  cartProductRowsLocator: string,
  cartNameCellSelector: string,
  cartPriceCellSelector: string,
  count: number
): Promise<void> {
  const addedProducts: { name: string; price: string }[] = [];

  try {
    const cards = this.page.locator(productCardsLocator);
    const titles = this.page.locator(productTitlesLocator);
    const prices = this.page.locator(productPricesLocator);

    const total = await cards.count();
    if (total === 0) throw new Error("No product cards found.");

    // 👇 Helper for unique random indices
    const getUniqueRandomIndices = (count: number, max: number): number[] => {
      const indices = new Set<number>();
      while (indices.size < Math.min(count, max)) {
        indices.add(Math.floor(Math.random() * max));
      }
      return [...indices];
    };

    const indices = getUniqueRandomIndices(count, total);
    const homeButton = this.page.locator(homeButtonLocator);

    for (let i = 0; i < indices.length; i++) {
      const index = indices[i];
      const name = await titles.nth(index).innerText();
      const price = await prices.nth(index).innerText();

      console.info(`[INFO] Navigating to: ${name} | Price: ${price}`);
      await cards.nth(index).click();

      const addToCartButton = this.page.locator(addToCartButtonLocator);
      await addToCartButton.waitFor({ state: 'visible', timeout: 5000 });

      this.page.once('dialog', async (dialog) => {
        console.info(`[INFO] Alert accepted for: ${name}`);
        await dialog.accept();
      });

      await addToCartButton.click();
      await this.page.waitForTimeout(1000);

      addedProducts.push({ name, price });

      if (i < indices.length - 1) {
        await Promise.all([
          this.page.waitForLoadState('load'),
          homeButton.click(),
        ]);
        await cards.first().waitFor({ state: 'visible', timeout: 10000 });
      }
    }

    // ✅ Step 2: Go to cart
    await this.page.locator(cartNavLocator).click();
    await this.page.waitForLoadState('load');

    // ✅ Step 3: Verify cart products
    const cartRows = this.page.locator(cartProductRowsLocator);
    await expect(cartRows.first()).toBeVisible({ timeout: 10000 });

    const cartRowCount = await cartRows.count();
    const actualCartItems: { name: string; price: string }[] = [];

    for (let i = 0; i < cartRowCount; i++) {
      const row = cartRows.nth(i);
      const name = await row.locator(cartNameCellSelector).innerText();
      const price = await row.locator(cartPriceCellSelector).innerText();
      actualCartItems.push({ name: name.trim(), price: price.trim() });
    }

// Assuming you have 'addedProducts' which is the array of products you tried to add
const normalizedAdded = addedProducts.map(item => ({
  name: item.name,
  price: item.price.replace('$', '')  // remove $ sign for consistency
}));

const normalizedCart = actualCartItems.map(item => ({
  name: item.name,
  price: item.price.replace('$', '')  // remove $ sign for consistency
}));

const sortedAdded = [...normalizedAdded].sort((a, b) => a.name.localeCompare(b.name));
const sortedCart = [...normalizedCart].sort((a, b) => a.name.localeCompare(b.name));

expect(sortedCart).toEqual(sortedAdded);

    console.info("[✅] Cart contents match expected products.");
  } catch (error) {
    console.error("[❌] addAndVerifyCartProducts failed:", error);
    await this.page.screenshot({ path: 'verify_cart_error.png' });
    throw error;
  }
}

async addVerifyReloadAndVerifyCartPersistence(
    numberOfProductsToAdd: number,
    productCardsLocator: string,
    productTitlesLocator: string,
    productPricesLocator: string,
    addToCartButtonLocator: string,
    homeButtonLocator: string,
    cartNavLocator: string, // Still needed for initial navigation to cart
    cartProductRowsLocator: string,
    cartNameCellSelector: string,
    cartPriceCellSelector: string
  ): Promise<void> {
    const addedProducts: { name: string; price: string }[] = [];

    try {

      const productCards = this.page.locator(productCardsLocator);
      const productTitles = this.page.locator(productTitlesLocator);
      const productPrices = this.page.locator(productPricesLocator);

      const totalProductCards = await productCards.count();
      if (totalProductCards === 0)
        throw new Error("No product cards found on the home page.");

      // Helper for unique random indices
      const getUniqueRandomIndices = (count: number, max: number): number[] => {
        const indices = new Set<number>();
        while (indices.size < Math.min(count, max)) {
          indices.add(Math.floor(Math.random() * max));
        }
        return [...indices];
      };

      const indicesToAdd = getUniqueRandomIndices(
        numberOfProductsToAdd,
        totalProductCards
      );
      const homeButton = this.page.locator(homeButtonLocator);
      const addToCartButton = this.page.locator(addToCartButtonLocator);

      this.logMessage(
        `Attempting to add ${indicesToAdd.length} products to cart...`
      );
      for (let i = 0; i < indicesToAdd.length; i++) {
        const index = indicesToAdd[i];
        const name = await productTitles.nth(index).innerText();
        const price = await productPrices.nth(index).innerText();

        this.logMessage(`[INFO] Adding product: ${name} | Price: ${price}`);
        await productCards.nth(index).click();

        await addToCartButton.waitFor({ state: "visible", timeout: 5000 });

        this.page.once("dialog", async (dialog) => {
          this.logMessage(`[INFO] Alert accepted for: ${name}`);
          await dialog.accept();
        });

        await addToCartButton.click();
        await this.page.waitForTimeout(1000); // Consider more robust wait

        addedProducts.push({ name, price });

        if (i < indicesToAdd.length - 1) {
          await Promise.all([
            this.page.waitForLoadState("load"),
            homeButton.click(),
          ]);
          await productCards.first().waitFor({ state: "visible", timeout: 10000 });
        }
      }
      this.logMessage(`Successfully added ${addedProducts.length} products to cart.`);

      // Step 2: Go to cart and verify products (Initial Verification)
      this.logMessage("Navigating to cart for initial verification...");
      await this.page.locator(cartNavLocator).click(); // Initial navigation to cart
      await this.page.waitForLoadState("load");

      await this.verifyCartContents(addedProducts, cartProductRowsLocator, cartNameCellSelector, cartPriceCellSelector);
      this.logMessage("✅ Initial cart contents verified successfully.");

      // Step 3: Reload the page (while on the cart page)
      this.logMessage("Reloading the cart page to test persistence...");
      await this.page.reload();
      await this.page.waitForLoadState("load"); // Ensure page is loaded after reload
      this.logMessage("Cart page reloaded.");

      // Step 4: Verify products again (Persistence Verification)
      // No need to navigate to cart again, as we reloaded while on it.
      this.logMessage("Verifying cart contents after reload...");
      await this.verifyCartContents(addedProducts, cartProductRowsLocator, cartNameCellSelector, cartPriceCellSelector);
      this.logMessage(
        "✅ Cart contents persist after page reload and match expected products."
      );
    } catch (error) {
      const errorMsg = `❌ Test 'addVerifyReloadAndVerifyCartPersistence' failed: ${(error as Error).message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure(
        "addVerifyReloadAndVerifyCartPersistence"
      );
      throw new Error(errorMsg); // Re-throw to fail the test
    }
  }

private async verifyCartContents(
    expectedItems: { name: string; price: string }[],
    cartProductRowsLocator: string,
    cartNameCellSelector: string,
    cartPriceCellSelector: string
  ): Promise<void> {
    const cartRows = this.page.locator(cartProductRowsLocator);
    await expect(cartRows.first()).toBeVisible({ timeout: 10000 });

    const cartRowCount = await cartRows.count();
    const actualCartItems: { name: string; price: string }[] = [];

    for (let i = 0; i < cartRowCount; i++) {
      const row = cartRows.nth(i);
      const name = await row.locator(cartNameCellSelector).innerText();
      const price = await row.locator(cartPriceCellSelector).innerText();
      actualCartItems.push({ name: name.trim(), price: price.trim() });
    }

    // Normalize and sort for robust comparison
    const normalizedExpected = expectedItems.map((item) => ({
      name: item.name,
      price: item.price.replace("$", ""),
    }));

    const normalizedActualCart = actualCartItems.map((item) => ({
      name: item.name,
      price: item.price.replace("$", ""),
    }));

    const sortedExpected = [...normalizedExpected].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const sortedActualCart = [...normalizedActualCart].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    expect(sortedActualCart).toEqual(sortedExpected);
  }













}
