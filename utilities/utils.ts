import { expect, Page, Locator } from "@playwright/test";
import logger from "./logger";
// import { allure } from "allure-playwright";
import { ExpectedValueProvider } from "./valueProvider";

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

  private logMessage(message: string, level: "info" | "error" = "info"): void {
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

  async verifyElementIsVisible(identifier: string): Promise<void> {
    try {
      await expect.soft(this.page.locator(identifier)).toBeVisible();
      this.logMessage(
        `Verified element with identifier ${identifier} is visible`
      );
    } catch (error) {
      const errorMsg = `Failed to verify element with identifier ${identifier} is visible`;
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

  async pause(): Promise<void> {
    try {
      await this.page.pause();
      this.logMessage("Paused the test execution for debugging.");
    } catch (error) {
      const errorMsg = "Failed to pause the test execution";
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("pause");
      throw new Error(errorMsg);
    }
  }

  async uploadFile(selector: string, filePath: string): Promise<void> {
    try {
      await this.page.locator(selector).setInputFiles(filePath);
      this.logMessage(`Uploaded file from path: ${filePath}`);
    } catch (error) {
      const errorMsg = `Failed to upload file at: ${filePath}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("uploadFile");
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
    attributeName: string
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

  async validateProductImage(imageLocator: string): Promise<void> {
    try {
      const imgSrc = await this.page.getAttribute(imageLocator, "src");
      const imagePattern = this.expected.getExpectedProductImagePattern();

      if (!imgSrc || !imagePattern.test(imgSrc)) {
        const errorMsg = `❌ Image src '${imgSrc}' failed regex validation`;
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure("validateProductImage");
        throw new Error(errorMsg);
      }

      this.logMessage(`✅ Image source '${imgSrc}' passed regex validation`);
    } catch (error) {
      const errorMsg = `Failed to validate product image: ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateProductImage");
      throw new Error(errorMsg);
    }
  }

  async validateProductTitle(titleLocator: string): Promise<void> {
    try {
      const titleText = await this.page.innerText(titleLocator);
      const titlePattern = this.expected.getExpectedProductTitlePattern();

      if (!titlePattern.test(titleText)) {
        const errorMsg = `❌ Title '${titleText}' failed regex validation`;
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure("validateProductTitle");
        throw new Error(errorMsg);
      }

      this.logMessage(`✅ Title '${titleText}' passed regex validation`);
    } catch (error) {
      const errorMsg = `Failed to validate product title: ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateProductTitle");
      throw new Error(errorMsg);
    }
  }

  async validateProductPrice(priceLocator: string): Promise<void> {
    try {
      const priceText = await this.page.innerText(priceLocator);
      const pricePattern = this.expected.getExpectedProductPricePattern();

      if (!pricePattern.test(priceText)) {
        const errorMsg = `❌ Price '${priceText}' failed regex validation`;
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure("validateProductPrice");
        throw new Error(errorMsg);
      }

      this.logMessage(`✅ Price '${priceText}' passed regex validation`);
    } catch (error) {
      const errorMsg = `Failed to validate product price: ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateProductPrice");
      throw new Error(errorMsg);
    }
  }

  async validateProductDescription(locator: string): Promise<void> {
    try {
      const text = (await this.page.innerText(locator)).trim();

      if (text.length === 0) {
        const errorMsg = "❌ Product description is empty";
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure("validateProductDescription");
        throw new Error(errorMsg);
      }

      this.logMessage("✅ Product description validated");
    } catch (error) {
      const errorMsg = `Failed to validate product description: ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateProductDescription");
      throw new Error(errorMsg);
    }
  }

  async validateAllProductCards(selectors: {
    container: string;
    title: string;
    price: string;
    image: string;
  }): Promise<void> {
    try {
      const cards = await this.getAllProductCards(selectors.container);

      for (let i = 0; i < cards.length; i++) {
        await this.validateProductImage(selectors.image);
        await this.validateProductTitle(selectors.title);
        await this.validateProductPrice(selectors.price);
        await this.validateProductDescription(selectors.container);

        this.logMessage(`✅ Product card ${i + 1} validated successfully`);
      }
    } catch (error) {
      const errorMsg = `Failed to validate product cards: ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateAllProductCards");
      throw new Error(errorMsg);
    }
  }
}
