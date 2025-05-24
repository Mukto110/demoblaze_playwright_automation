import { expect, Page, Locator } from "@playwright/test";
import logger from "./logger";
// import { allure } from "allure-playwright";
import { ExpectedValueProvider } from "./valueProvider";
import { HomePage } from "../pageObjectModel/homePage";

interface ButtonClickOptions {
  /** Expected text content of the button. Optional, if you don't need to validate text. */
  expectedText?: string;
  /** Whether to wait for a page navigation after clicking. Defaults to true. */
  waitForNavigation?: boolean;
  /**
   * The expected URL after navigation. Can be a string (exact match) or RegExp (partial match).
   * Only used if waitForNavigation is true.
   */
  expectedURL?: string | RegExp;
  /**
   * A CSS selector for an element expected to appear/become visible on the page
   * after the button click (e.g., a success message, a new section).
   */
  waitForSelectorAfterClick?: string;
  /**
   * The state to wait for on the page after click. Default is 'load'.
   * Possible values: 'load', 'domcontentloaded', 'networkidle'.
   */
  waitForLoadState?: 'load' | 'domcontentloaded' | 'networkidle';
}

interface ProductDetails {
  index: number;
  title: string;
  price: string;
  imageSrc: string | null; // imageSrc can be null if attribute not found
}

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

 async acceptWebAlert(
    expectedAlertMessage: string | RegExp
  ): Promise<void> {
    // A default scenario name for logging and screenshots
    const scenarioNameForAlert = "WebAlertHandling";
    this.logMessage(`[INFO] Waiting for web alert to appear for scenario "${scenarioNameForAlert}".`);

    try {
      // Use Promise.all to wait for the dialog event AND accept it.
      // This prevents a race condition where the dialog might appear before waitForEvent is set up.
      const [dialog] = await Promise.all([
        this.page.waitForEvent('dialog', { timeout: 10000 }), // Wait for a dialog (alert, confirm, prompt)
        // No click action here, assuming the alert is triggered by a previous action
        // If the alert is triggered by a specific click *within this function*,
        // that click would be the second element in this Promise.all array.
      ]);

      if (dialog.type() !== 'alert') {
        throw new Error(`Expected an alert dialog, but received a dialog of type: ${dialog.type()}`);
      }

      const actualMessage = dialog.message();
      this.logMessage(`[INFO] Web alert appeared with message: "${actualMessage}"`);

      if (typeof expectedAlertMessage === 'string') {
        expect(actualMessage).toEqual(expectedAlertMessage);
        this.logMessage(`✅ Alert message matches expected exact string: "${expectedAlertMessage}"`);
      } else { // It's a RegExp
        expect(actualMessage).toMatch(expectedAlertMessage);
        this.logMessage(`✅ Alert message matches expected regex: "${expectedAlertMessage.source}"`);
      }

      await dialog.accept(); // Accept the alert
      this.logMessage(`✅ Web alert accepted successfully.`);

    } catch (error: any) {
      const errorMsg = `❌ Failed to handle web alert for scenario "${scenarioNameForAlert}": ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure(scenarioNameForAlert);
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


// -----------------------------------------------------------------------------------

async clickItemByIndex(
    clickableElementLocator: string,
    index: number
  ): Promise<void> {
    this.logMessage(`[INFO] Attempting to click item at index: ${index} using locator: ${clickableElementLocator}`);
    try {
      const clickableElement = this.page.locator(clickableElementLocator).nth(index);
      await Promise.all([
        this.page.waitForLoadState('load'), // Wait for navigation after click
        clickableElement.click(),
      ]);
      this.logMessage(`[INFO] Successfully clicked item at index: ${index}.`);
    } catch (error: any) {
      const errorMsg = `Failed to click item at index ${index}: ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure(`clickItemByIndex_${index}`);
      throw new Error(errorMsg);
    }
  }

async selectRandomItemAndClick(
    itemContainerLocator: string, // E.g., '.product-card', '.search-result-item' - used for total count
    clickableElementLocator: string // E.g., '.product-card-link', '.item-title' - used for the actual click
  ): Promise<number> {
    this.logMessage(`[INFO] Attempting to select a random item and click it.`);
    const totalItems = await this.page.locator(itemContainerLocator).count();
    if (totalItems === 0) {
      throw new Error(`No items found using locator: ${itemContainerLocator}. Cannot select random item.`);
    }

    const randomIndex = Math.floor(Math.random() * totalItems);
    this.logMessage(`[INFO] Randomly selected item at index: ${randomIndex}.`);

    // Reuse the atomic clickItemByIndex method
    await this.clickItemByIndex(clickableElementLocator, randomIndex);

    return randomIndex; // Return the index for external use (e.g., getting details after navigation)
  }

  
async validateAndClickButton(
    buttonLocator: string,
    buttonNameForLogging: string,
    options?: ButtonClickOptions
  ): Promise<void> {
    const opts: ButtonClickOptions = {
      waitForNavigation: true, // Default to waiting for navigation
      waitForLoadState: 'load', // Default load state
      ...options,
    };

    this.logMessage(`[INFO] Validating and attempting to click "${buttonNameForLogging}".`);
    try {
      const button = this.page.locator(buttonLocator);

      // --- Pre-Click Validations (Industry Standard) ---
      await expect(button).toBeVisible({ timeout: 10000 });
      this.logMessage(`✅ "${buttonNameForLogging}" is visible.`);

      await expect(button).toBeEnabled({ timeout: 5000 });
      this.logMessage(`✅ "${buttonNameForLogging}" is enabled.`);

      if (opts.expectedText) {
        await expect(button).toHaveText(opts.expectedText, { timeout: 5000 });
        this.logMessage(`✅ "${buttonNameForLogging}" has expected text: "${opts.expectedText}".`);
      }

      // --- Perform Click and Post-Click Waits ---
      const clickActions: Promise<any>[] = [button.click()];

      if (opts.waitForNavigation) {
        if (opts.expectedURL) {
          // If expectedURL is provided, use waitForURL, which implies navigation
          clickActions.unshift(this.page.waitForURL(opts.expectedURL, { waitUntil: opts.waitForLoadState }));
          this.logMessage(`[INFO] Waiting for URL to match: ${opts.expectedURL instanceof RegExp ? opts.expectedURL.source : opts.expectedURL}.`);
        } else {
          // Otherwise, just wait for general page load state
          clickActions.unshift(this.page.waitForLoadState(opts.waitForLoadState));
          this.logMessage(`[INFO] Waiting for page load state: '${opts.waitForLoadState}'.`);
        }
      }

      if (opts.waitForSelectorAfterClick) {
        clickActions.push(
          this.page.locator(opts.waitForSelectorAfterClick).waitFor({ state: 'visible', timeout: 15000 })
        );
        this.logMessage(`[INFO] Waiting for selector "${opts.waitForSelectorAfterClick}" to be visible after click.`);
      }

      await Promise.all(clickActions);
      this.logMessage(`[INFO] Successfully clicked "${buttonNameForLogging}".`);

      // --- Post-Click Assertions (Basic, within the function) ---
      if (opts.waitForNavigation && opts.expectedURL) {
        // After Promise.all, assert the final URL is correct.
        // This is a robust check that navigation truly completed to the desired URL.
        await expect(this.page).toHaveURL(opts.expectedURL, { timeout: 5000 });
        this.logMessage(`✅ Navigated to expected URL: ${this.page.url()}.`);
      }

    } catch (error: any) {
      const errorMsg = `❌ Failed to validate or click "${buttonNameForLogging}": ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure(`Fail_${buttonNameForLogging.replace(/\s/g, '_')}`);
      throw new Error(errorMsg);
    }
  }
  async validatingProductUrl(): Promise<void> {
    // The specific regex for DemoBlaze product pages
    const expectedProductURLRegex = /^https:\/\/demoblaze\.com\/prod\.html\?idp_=\d+$/;
    const urlDescription = "DemoBlaze Product Page URL";
    // A default scenario name is used for logging/screenshots since no parameter is provided
    const scenarioNameForLogging = "ProductURLValidation";

    const actualURL = this.page.url(); // Get the current page's URL automatically

    this.logMessage(`[INFO] Validating ${urlDescription}: "${actualURL}" for scenario "${scenarioNameForLogging}".`);

    try {
      if (!expectedProductURLRegex.test(actualURL)) {
        throw new Error(`URL did not match expected regex.`);
      }
      this.logMessage(`✅ ${urlDescription} validated successfully: "${actualURL}" matches regex.`);
    } catch (error: any) {
      const errorMsg = `❌ ${urlDescription} validation failed for scenario "${scenarioNameForLogging}": Expected URL to match ${expectedProductURLRegex.source}, but got "${actualURL}". Error: ${error.message}`;
      this.logMessage(errorMsg, "error");
      // Use the default scenario name for the screenshot
      await this.captureScreenshotOnFailure(scenarioNameForLogging);
      throw new Error(errorMsg);
    }
  }
 public async getImageSrcByIndex(
    imageLocator: string,
    index: number
  ): Promise<string | null> {
    const element = this.page.locator(imageLocator).nth(index);
    return await element.getAttribute('src');
  }
  public async getItemDetailsByIndex(
    itemTextLocator: string,
    itemNumericValueLocator: string,
    index: number
  ): Promise<{ text: string; numericValue: string }> {
    const text = await this.page.locator(itemTextLocator).nth(index).innerText();
    const numericValue = await this.page.locator(itemNumericValueLocator).nth(index).innerText();
    return { text: text.trim(), numericValue: numericValue.trim() };
  }

public async selectAndCaptureRandomProductDetailsAndClick(
    itemContainerLocator: string,
    clickableElementLocator: string,
    productTitleLocator: string,
    productPriceLocator: string,
    productImageLocator: string
  ): Promise<ProductDetails> {
    const totalItems = await this.page.locator(itemContainerLocator).count();
    if (totalItems === 0) {
      throw new Error(`No items found using locator: ${itemContainerLocator}. Cannot select random product.`);
    }

    const randomIndex = Math.floor(Math.random() * totalItems);
    this.logMessage(`[INFO] Randomly selected product at index: ${randomIndex}.`);

    // --- Capture details BEFORE the click ---
    const title = await this.page.locator(productTitleLocator).nth(randomIndex).innerText();
    const price = await this.page.locator(productPriceLocator).nth(randomIndex).innerText();
    const imageSrc = await this.getImageSrcByIndex(productImageLocator, randomIndex);

    this.logMessage(`[INFO] Captured details for product at index ${randomIndex} (Home Page):`);
    this.logMessage(`  Title: "${title}"`);
    this.logMessage(`  Price: "${price}"`);
    this.logMessage(`  Image Src: "${imageSrc}"`);

    // --- Perform the click using the existing helper ---
    await this.clickItemByIndex(clickableElementLocator, randomIndex);

    return { index: randomIndex, title, price, imageSrc };
  }
async validateProductDetailsOnDetailPage(
    expectedProductDetails: { title: string; price: string; imageSrc: string | null },
    titleLocator: string,
    priceLocator: string,
    imageContainerLocator: string
  ): Promise<void> {
    const scenarioName = "Product Details Page Validation";
    this.logMessage(`[INFO] Starting product details validation for: "${expectedProductDetails.title}" on detail page.`);

    try {
      // 1. Validate Title
      const titleElement = this.page.locator(titleLocator);
      await expect(titleElement).toBeVisible({ timeout: 10000 });
      await expect(titleElement).toHaveText(expectedProductDetails.title);
      this.logMessage(`✅ Title matches: "${expectedProductDetails.title}"`);

      // 2. Validate Price
      const priceElement = this.page.locator(priceLocator);
      await expect(priceElement).toBeVisible();

      const actualPriceText = await priceElement.innerText();

      // --- MODIFICATION STARTS HERE ---
      // A more robust regex to remove '$', whitespace, and the "(includes tax)" or "*includes tax" part
      const cleanPriceRegex = /\s*[\$\(\*]\s*includes tax\)?\s*|[\$\*\s]/g; // Matches '$', '*', '(', 'includes tax', ')', and extra spaces
      const normalizedActualPrice = actualPriceText.replace(cleanPriceRegex, '').trim();
      const normalizedExpectedPrice = expectedProductDetails.price.replace(cleanPriceRegex, '').trim();
      // --- MODIFICATION ENDS HERE ---

      expect(normalizedActualPrice).toEqual(normalizedExpectedPrice);
      this.logMessage(`✅ Price matches: "${normalizedExpectedPrice}" (Actual: "${actualPriceText}")`);

      // 3. Validate Image
      const imageContainerElement = this.page.locator(imageContainerLocator);
      this.logMessage(`[DEBUG] Attempting to find image container with locator: "${imageContainerLocator}"`);
      await expect(imageContainerElement).toBeVisible({ timeout: 10000 });
      this.logMessage(`[DEBUG] Image container found and visible: "${imageContainerLocator}"`);

      const imageElement = imageContainerElement.locator('img').or(imageContainerElement);
      this.logMessage(`[DEBUG] Attempting to find <img> tag within container.`);
      await expect(imageElement).toBeVisible({ timeout: 10000 });
      this.logMessage(`[DEBUG] <img> tag found and visible.`);

      const actualImageSrc = await imageElement.getAttribute('src');
      this.logMessage(`[DEBUG] Actual image src attribute: "${actualImageSrc}"`);

      const expectedFileName = expectedProductDetails.imageSrc ?
        expectedProductDetails.imageSrc.split('/').pop() : '';
      this.logMessage(`[DEBUG] Expected image file name: "${expectedFileName}"`);

      expect(actualImageSrc).toContain(expectedFileName);
      this.logMessage(`✅ Image matches (contains "${expectedFileName}"): "${actualImageSrc}"`);

      this.logMessage(`✅ All product details validated successfully for "${expectedProductDetails.title}".`);
    } catch (error: any) {
      const errorMsg = `❌ Product details validation failed for "${expectedProductDetails.title}": ${error.message}`;
      this.logMessage(errorMsg, 'error');
      await this.captureScreenshotOnFailure(scenarioName);
      throw new Error(errorMsg);
    }
  }

 async validateProductsInCart(
    expectedProducts: ProductDetails[],
    cartRowLocator: string,
    titleInRowLocator: string,
    priceInRowLocator: string,
    imageContainerInRowLocator: string,
    totalPriceElementLocator: string
    // Removed scenarioName parameter here
  ): Promise<void> {
    // Note: The logMessage and captureScreenshotOnFailure calls below
    // will no longer have the specific scenarioName context from here.
    // If you want scenario-specific screenshots, you'll need to call
    // captureScreenshotOnFailure from the test's try/catch block.
    this.logMessage(`[INFO] Starting cart validation.`); // Less specific log

    try {
      await this.page.waitForLoadState('domcontentloaded');
      await expect(this.page.locator(cartRowLocator).first()).toBeVisible({ timeout: 10000 });

      const cartRows = await this.page.locator(cartRowLocator).all();
      expect(cartRows.length).toEqual(expectedProducts.length);
      this.logMessage(`✅ Cart contains ${cartRows.length} items, matching expected count.`);

      let calculatedTotalPrice = 0;

      for (const expectedProduct of expectedProducts) {
        this.logMessage(`[INFO] Validating expected product: "${expectedProduct.title}" in cart.`);
        let foundProductInCart = false;

        for (const row of cartRows) {
          const actualTitleElement = row.locator(titleInRowLocator);
          const actualTitle = await actualTitleElement.innerText();

          if (actualTitle.trim() === expectedProduct.title.trim()) {
            foundProductInCart = true;
            this.logMessage(`[INFO] Found row for "${expectedProduct.title}".`);

            const actualPriceElement = row.locator(priceInRowLocator);
            const actualPriceText = await actualPriceElement.innerText();
            const normalizedActualPrice = actualPriceText.replace(/\s*\$\s*/g, '').trim();
            const normalizedExpectedPrice = expectedProduct.price.replace(/\s*\$\s*/g, '').trim();

            expect(normalizedActualPrice).toEqual(normalizedExpectedPrice);
            this.logMessage(`✅ Price matches for "${expectedProduct.title}": "${normalizedExpectedPrice}" (Actual: "${actualPriceText}")`);

            calculatedTotalPrice += parseFloat(normalizedActualPrice);

            const imageContainerElement = row.locator(imageContainerInRowLocator);
            const imageElement = imageContainerElement.locator('img');
            await expect(imageElement).toBeVisible();

            const actualImageSrc = await imageElement.getAttribute('src');
            const expectedFileName = expectedProduct.imageSrc ?
              expectedProduct.imageSrc.split('/').pop() : '';

            expect(actualImageSrc).toContain(expectedFileName);
            this.logMessage(`✅ Image matches for "${expectedProduct.title}" (contains "${expectedFileName}"): "${actualImageSrc}"`);

            break;
          }
        }

        if (!foundProductInCart) {
          throw new Error(`Product "${expectedProduct.title}" was not found in the cart.`);
        }
      }

      const totalPriceElement = this.page.locator(totalPriceElementLocator);
      await expect(totalPriceElement).toBeVisible();
      const actualTotalPriceText = await totalPriceElement.innerText();
      const actualTotalPrice = parseFloat(actualTotalPriceText.replace(/\s*\$\s*/g, '').trim());

      expect(actualTotalPrice).toEqual(calculatedTotalPrice);
      this.logMessage(`✅ Total cart price matches: $${calculatedTotalPrice} (Actual: $${actualTotalPrice})`);

      this.logMessage(`✅ All products in cart validated successfully.`); // Less specific log
    } catch (error: any) {
      const errorMsg = `❌ Cart validation failed: ${error.message}`;
      this.logMessage(errorMsg, 'error');
      // If captureScreenshotOnFailure needs a name, you might pass a default or timestamp
      // or ensure it's called from the test's outer try/catch
      await this.captureScreenshotOnFailure('CartValidationFailure'); // Example: Use a default name
      throw new Error(errorMsg);
    }
  }
  async waitUntilSeconds(seconds: number): Promise<void> {
    try {
      const milliseconds = seconds * 1000;
      await this.page.waitForTimeout(milliseconds);
      this.logMessage(`Waited for ${seconds} second(s)`);
    } catch (error) {
      const errorMsg = `Failed to wait for ${seconds} second(s)`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("waitUntilSeconds");
      throw new Error(errorMsg);
    }
  }
 async deleteProductFromCartByIndex(
    productIndexToDelete: number,
    cartRowLocator: string
  ): Promise<string> {
    const defaultTitleInRowLocator = 'td:nth-child(2)'; // Common DemoBlaze title column
    const defaultDeleteButtonInRowLocator = 'td:nth-child(4) a'; // Common DemoBlaze delete button column

    this.logMessage(`[INFO] Attempting to delete product at index ${productIndexToDelete} from the cart.`);
    let deletedProductTitle = 'Unknown Product'; // Initialize for error logging

    try {
      // 1. Get the specific cart row by index
      const targetCartRow = this.page.locator(cartRowLocator).nth(productIndexToDelete);
      await expect(targetCartRow).toBeVisible({ timeout: 10000 });
      this.logMessage(`[INFO] Cart row at index ${productIndexToDelete} found and visible.`);

      // 2. Get the title of the product about to be deleted (THIS IS KEY)
      const titleElement = targetCartRow.locator(defaultTitleInRowLocator);
      await expect(titleElement).toBeVisible();
      deletedProductTitle = await titleElement.innerText();
      this.logMessage(`[INFO] Product to be deleted: "${deletedProductTitle}" at index ${productIndexToDelete}.`);

      // 3. Locate and click the delete button for the target product
      const deleteButton = targetCartRow.locator(defaultDeleteButtonInRowLocator);
      await expect(deleteButton).toBeVisible();
      this.logMessage(`[INFO] Clicking delete button for "${deletedProductTitle}".`);

      await Promise.all([
        this.page.waitForResponse(response => response.url().includes('deleteitem') && response.status() === 200),
        deleteButton.click(),
      ]);

      this.logMessage(`✅ Successfully clicked delete for "${deletedProductTitle}".`);

      // --- CRUCIAL CHANGE: Validate the product is gone by its content ---
      // Instead of checking if the old row position is not visible,
      // we check if ANY element with the DELETED PRODUCT'S TITLE is visible in the cart.
      const deletedProductTitleLocator = this.page.locator(cartRowLocator)
                                             .locator(defaultTitleInRowLocator, { hasText: deletedProductTitle });

      await expect(deletedProductTitleLocator).not.toBeVisible({ timeout: 5000 });
      this.logMessage(`✅ Verified product with title "${deletedProductTitle}" is no longer visible anywhere in the cart.`);
      // --- END CRUCIAL CHANGE ---

      this.logMessage(`✅ Product "${deletedProductTitle}" successfully deleted from cart.`);
      return deletedProductTitle; // Return the title of the deleted product
    } catch (error: any) {
      const errorMsg = `❌ Failed to delete product at index ${productIndexToDelete} (likely "${deletedProductTitle}") from cart: ${error.message}`;
      this.logMessage(errorMsg, 'error');
      await this.captureScreenshotOnFailure(`DeleteProductByIndex_Failure`);
      throw new Error(errorMsg);
    }
  }










}
