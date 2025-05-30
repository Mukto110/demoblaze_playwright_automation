import { test } from "../utilities/fixtures";
import { ExpectedValueProvider } from "../utilities/valueProvider";
import homeData from "../testData/home.json";
import contactData from "../testData/contact.json";
import aboutData from "../testData/aboutUs.json";
import loginData from "../testData/login.json";
import signupData from "../testData/signup.json";
import cartData from "../testData/cart.json";

class HomePageTest extends ExpectedValueProvider {
  constructor() {
    super();
  }

  runTest() {
    test.describe("Home Page Functionality Test", () => {
      test.beforeEach(async ({ runner, envData, homePage }) => {
        await runner.navigateTo(envData.baseUrl);
        await runner.verifyUrlContains(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
        await runner.validateAttribute(
          homePage.homePageLogoImage,
          "src",
          homeData.homeLogoSrcValue
        );
        await runner.verifyContainText(
          homePage.homePageLogo,
          homeData.homeLogoText
        );
      });

      test("Verify homepage reloads on logo button click", async ({
        runner,
        envData,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.homePageLogo);
        await runner.clickOnElement(homePage.homePageLogo);
        await runner.wait(5, { waitForSelector: homePage.homePageLogo });
        await runner.verifyUrlContains(envData.baseUrl);
        await runner.verifyElementIsVisible(homePage.homePageLogo);
        await runner.validateAttribute(
          homePage.homePageLogoImage,
          "src",
          homeData.homeLogoSrcValue
        );
        await runner.verifyContainText(
          homePage.homePageLogo,
          homeData.homeLogoText
        );
      });

      test("Verify proper visibility of navigation bar items", async ({
        runner,
        homePage,
      }) => {
        await runner.validateVisibleNavItems(homePage.navItems, [
          homeData.navbar.home,
          homeData.navbar.contact,
          homeData.navbar.about,
          homeData.navbar.cart,
          homeData.navbar.login,
          homeData.navbar.signup,
        ]);
        await runner.verifyElementToHaveCSSProperty(
          [
            homePage.navbarHome,
            homePage.navbarContact,
            homePage.navbarAbout,
            homePage.navbarCart,
            homePage.navbarLogin,
            homePage.navbarSignup,
          ],
          "color",
          homeData.navItemsColorOnHover,
          true
        );
      });

      test("Verify navbar contact, about us, login and signup shows the correct modal", async ({
        runner,
        homePage,
        loginModal,
        signUpModal,
        contactModal,
        aboutModal,
      }) => {
        // contact modal
        await runner.wait(5, { waitForSelector: homePage.navbarContact });
        await runner.verifyElementIsVisible(homePage.navbarContact);
        await runner.verifyContainText(
          homePage.navbarContact,
          homeData.navbar.contact
        );
        await runner.verifyElementsAreEnabled(homePage.navbarContact);
        await runner.clickOnElement(homePage.navbarContact);
        await runner.verifyElementIsVisible(contactModal.header);
        await runner.verifyContainText(
          contactModal.header,
          contactData.contactModalHeader
        );
        await runner.clickOnElement(contactModal.closeButton);

        // about us modal
        await runner.verifyElementIsVisible(homePage.navbarAbout);
        await runner.verifyContainText(
          homePage.navbarAbout,
          homeData.navbar.about
        );
        await runner.verifyElementsAreEnabled(homePage.navbarAbout);
        await runner.clickOnElement(homePage.navbarAbout);
        await runner.verifyElementIsVisible(aboutModal.title);
        await runner.verifyContainText(
          aboutModal.title,
          aboutData.aboutUsTitle
        );
        await runner.clickOnElement(aboutModal.closeButton);

        // login modal
        await runner.verifyElementIsVisible(homePage.navbarLogin);
        await runner.verifyContainText(
          homePage.navbarLogin,
          homeData.navbar.login
        );
        await runner.verifyElementsAreEnabled(homePage.navbarLogin);
        await runner.clickOnElement(homePage.navbarLogin);
        await runner.verifyElementIsVisible(loginModal.loginModalHeader);
        await runner.verifyContainText(
          loginModal.loginModalHeader,
          loginData.headerText
        );
        await runner.clickOnElement(loginModal.closeButton);

        // signup modal
        await runner.verifyElementIsVisible(homePage.navbarSignup);
        await runner.verifyContainText(
          homePage.navbarSignup,
          homeData.navbar.signup
        );
        await runner.verifyElementsAreEnabled(homePage.navbarSignup);
        await runner.clickOnElement(homePage.navbarSignup);
        await runner.verifyElementIsVisible(signUpModal.signUpModalHeader);
        await runner.verifyContainText(
          signUpModal.signUpModalHeader,
          signupData.headerText
        );
        await runner.clickOnElement(signUpModal.closeButton);
      });

      test("Verify cart button in navbar navigates to cart page", async ({
        runner,
        envData,
        homePage,
        cartPage,
      }) => {
        await runner.wait(5, { waitForSelector: homePage.navbarCart });
        await runner.verifyElementIsVisible(homePage.navbarCart);
        await runner.verifyElementsAreEnabled(homePage.navbarCart);
        await runner.validateAndClick(
          homePage.navbarCart,
          homeData.navbar.cart
        );
        await runner.verifyUrlContains(envData.cartUrl);
        await runner.verifyElementIsVisible(cartPage.cartPageHeaderText);
        await runner.verifyContainText(
          cartPage.cartPageHeaderText,
          cartData.cartPageHeaderText
        );
      });

      test("Verify hero banner carousel is displayed, functional, and auto changes", async ({
        runner,
        homePage,
      }) => {
        await runner.wait(2, { waitForSelector: homePage.carousel });
        await runner.verifyElementIsVisible(homePage.carousel);
        await runner.validateAttributes(homePage.carouselImages, "src");
        await runner.verifyAllCarouselImagesAutoChange(
          homePage.activeCarouselImage,
          homePage.carouselImages
        );
      });

      test("Verify hero banner carousel next arrow button change displayed image", async ({
        runner,
        homePage,
      }) => {
        await runner.wait(2, { waitForSelector: homePage.carousel });
        await runner.verifyElementIsVisible(homePage.carouselNextButton);
        await runner.validateAttribute(
          homePage.carouselNextButton,
          "href",
          homeData.carousel.nextButtonAttributeValue
        );
        await runner.verifyCarouselNextArrowNavigation(
          homePage.activeCarouselImage,
          homePage.carouselImages,
          homePage.carouselNextButton
        );
      });

      test("Verify hero banner carousel previous arrow button change displayed image", async ({
        runner,
        homePage,
      }) => {
        await runner.wait(5, { waitForSelector: homePage.carousel });
        await runner.verifyElementIsVisible(homePage.carouselPreviousButton);
        await runner.validateAttribute(
          homePage.carouselPreviousButton,
          "href",
          homeData.carousel.previousButtonAttributeValue
        );
        await runner.verifyCarouselPreviousArrowNavigation(
          homePage.activeCarouselImage,
          homePage.carouselImages,
          homePage.carouselPreviousButton
        );
      });

      test("Verify filtering phone tab interactions", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.categoriesPhones);
        await runner.validateAttribute(
          homePage.categoriesPhones,
          "onclick",
          "byCat('phone')"
        );
        await runner.validateAndClick(
          homePage.categoriesPhones,
          homeData.categories.phones
        );
        await runner.wait(5, { waitForSelector: homePage.productImages });
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);
      });

      test("Verify filtering laptop tab interactions", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.categoriesLaptops);
        await runner.validateAttribute(
          homePage.categoriesLaptops,
          "onclick",
          "byCat('notebook')"
        );
        await runner.validateAndClick(
          homePage.categoriesLaptops,
          homeData.categories.laptops
        );
        await runner.wait(5, { waitForSelector: homePage.productImages });
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);
      });

      test("Verify filtering monitors tab interactions", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.categoriesMonitors);
        await runner.validateAttribute(
          homePage.categoriesMonitors,
          "onclick",
          "byCat('monitor')"
        );
        await runner.validateAndClick(
          homePage.categoriesMonitors,
          homeData.categories.monitors
        );
        await runner.wait(5, { waitForSelector: homePage.productContainer });
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);
      });

      test("Verify homepage reloads and resets filters on 'Home' navbar click", async ({
        runner,
        envData,
        homePage,
      }) => {
        await runner.wait(5, { waitForSelector: homePage.productImages });
        // verify homepage products
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);

        // click on laptops tab to show laptops products
        await runner.validateAndClick(
          homePage.categoriesLaptops,
          homeData.categories.laptops
        );
        await runner.wait(5, { waitForSelector: homePage.productImages });
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);

        // click on home button and reset filter
        await runner.validateAndClick(
          homePage.navbarHome,
          homeData.navbar.home
        );
        await runner.wait(5, { waitForSelector: homePage.productImages });
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyUrlContains(envData.homeButtonClickUrl);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);
      });

      test("Verify clicking 'Categories' reloads homepage, resets filter and shows all products", async ({
        runner,
        envData,
        homePage,
      }) => {
        await runner.wait(5, { waitForSelector: homePage.productImages });
        // verify homepage products
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);

        // click on laptops tab to show laptops products
        await runner.validateAndClick(
          homePage.categoriesLaptops,
          homeData.categories.laptops
        );
        await runner.wait(5, { waitForSelector: homePage.productContainer });
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);

        // click on categories header and reset filter
        await runner.validateAndClick(
          homePage.categoriesHeader,
          homeData.categories.header
        );
        await runner.verifyUrlContains(envData.baseUrl);
        await runner.wait(5, { waitForSelector: homePage.productImages });
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);
      });

      // test("Verify pagination controls with next and previous button", async ({
      //   runner,
      //   homePage,
      // }) => {
      //   // verifying homepage (pagination's first page's products)
      //   await runner.wait(5, { waitForSelector: homePage.productImages });
      //   await runner.verifyElementsIsExist(homePage.productImages, true);
      //   await runner.verifyElementsIsExist(homePage.productTitles);
      //   await runner.verifyElementsIsExist(homePage.productPrices);
      //   await runner.verifyElementsIsExist(homePage.productDescriptions);

      //   await runner.verifyElementIsVisible(homePage.paginationPreviousButton);
      //   await runner.verifyElementIsVisible(homePage.paginationNextButton);
      //   await runner.verifyContainText(
      //     homePage.paginationPreviousButton,
      //     homeData.pagination.previous
      //   );
      //   await runner.verifyContainText(
      //     homePage.paginationNextButton,
      //     homeData.pagination.next
      //   );
      //   await runner.wait(5, {
      //     waitForSelector: homePage.paginationNextButton,
      //   });
      //   await runner.verifyElementsAreEnabled(homePage.paginationNextButton);
      //   await runner.clickOnElement(homePage.paginationNextButton);

      //   // verifying next page (pagination's second page's products)
      //   await runner.wait(5, { waitForSelector: homePage.productImages });
      //   await runner.verifyElementsIsExist(homePage.productImages, true);
      //   await runner.verifyElementsIsExist(homePage.productTitles);
      //   await runner.verifyElementsIsExist(homePage.productPrices);
      //   await runner.verifyElementsIsExist(homePage.productDescriptions);

      //   await runner.wait(5, {
      //     waitForSelector: homePage.paginationPreviousButton,
      //   });
      //   await runner.verifyElementsAreEnabled(
      //     homePage.paginationPreviousButton
      //   );
      //   await runner.clickOnElement(homePage.paginationPreviousButton);
      //   // validating the first page's products (come back to the first page)
      //   await runner.wait(5, { waitForSelector: homePage.productImages });
      //   await runner.verifyElementsIsExist(homePage.productImages, true);
      //   await runner.verifyElementsIsExist(homePage.productTitles);
      //   await runner.verifyElementsIsExist(homePage.productPrices);
      //   await runner.verifyElementsIsExist(homePage.productDescriptions);
      // });

      test("Verify product content is valid on the first page of pagination", async ({
        runner,
        homePage,
      }) => {
        await runner.wait(5, { waitForSelector: homePage.productImages });
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);
      });

      test("Verify product content is valid on the second page of pagination", async ({
        runner,
        homePage,
      }) => {
        await runner.wait(5, {
          waitForSelector: homePage.paginationNextButton,
        });
        await runner.verifyElementIsVisible(homePage.paginationNextButton);
        await runner.verifyContainText(
          homePage.paginationNextButton,
          homeData.pagination.next
        );
        await runner.verifyElementsAreEnabled(homePage.paginationNextButton);
        await runner.clickOnElement(homePage.paginationNextButton);
        await runner.wait(5, { waitForSelector: homePage.productImages });
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);
      });

      test("Verify pagination returning to first page with previous button click shows correct products", async ({
        runner,
        homePage,
      }) => {
        // getting page one's product titles
        await runner.wait(5, { waitForSelector: homePage.productImages });
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);

        const pageOneProductTitles = await runner.getProductTitles(
          homePage.productTitles
        );

        // navigating to the next page of pagination
        await runner.wait(5, {
          waitForSelector: homePage.paginationNextButton,
        });
        await runner.verifyElementIsVisible(homePage.paginationNextButton);
        await runner.verifyElementsAreEnabled(homePage.paginationNextButton);
        await runner.clickOnElement(homePage.paginationNextButton);

        // Verifying next button click navigates to the second page
        await runner.wait(5, { waitForSelector: homePage.productImages });
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);

        // getting page two's product titles
        await runner.wait(5, { waitForSelector: homePage.productTitles });
        const pageTwoProductTitles = await runner.getProductTitles(
          homePage.productTitles
        );

        // second page titles should not match with first page titles
        await runner.verifyTitlesNoMatch(
          pageOneProductTitles,
          pageTwoProductTitles
        );

        // going back to the previous page and capture the again back page's products titles
        await runner.wait(5, {
          waitForSelector: homePage.paginationPreviousButton,
        });
        await runner.verifyElementIsVisible(homePage.paginationPreviousButton);
        await runner.verifyElementsAreEnabled(
          homePage.paginationPreviousButton
        );
        await runner.clickOnElement(homePage.paginationPreviousButton);

        // validating again visit first's page products
        await runner.wait(5, { waitForSelector: homePage.productImages });
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);

        await runner.wait(5, { waitForSelector: homePage.productTitles });
        const pageOneTitlesAgain = await runner.getProductTitles(
          homePage.productTitles
        );

        // now the products of pageOneTitles again should match with products of page one
        await runner.verifyTitlesMatch(
          pageOneProductTitles,
          pageOneTitlesAgain
        );
      });

      test("Verify clicking on a product image navigates to the correct product detail page on pagination first page", async ({
        runner,
        envData,
        homePage,
        productDetailPage,
      }) => {
        await runner.wait(5, { waitForSelector: homePage.productContainer });
        // verifications of homepage products
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);

        // Getting first random product
        const randomFirstProductCardDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productImages
          );
        await runner.verifyUrlContains(envData.productUrl);
        await runner.validateProductDetailsOnDetailPage(
          randomFirstProductCardDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );

        await runner.goBack();

        await runner.wait(5, { waitForSelector: homePage.productContainer });
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);

        // Getting second random product
        const randomSecondProductCardDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productImages
          );
        await runner.verifyUrlContains(envData.productUrl);
        await runner.validateProductDetailsOnDetailPage(
          randomSecondProductCardDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );
      });

      test("Verify clicking product title navigates to product detail page on pagination first page", async ({
        runner,
        envData,
        homePage,
        productDetailPage,
      }) => {
        await runner.wait(5, { waitForSelector: homePage.productContainer });
        // verifications of homepage products
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);

        // Getting first random product
        const randomFirstProductCardDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
          );
        await runner.verifyUrlContains(envData.productUrl);
        await runner.validateProductDetailsOnDetailPage(
          randomFirstProductCardDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );

        await runner.goBack();

        await runner.wait(5, { waitForSelector: homePage.productContainer });
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);

        // Getting second random product
        const randomSecondProductCardDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productImages
          );
        await runner.verifyUrlContains(envData.productUrl);
        await runner.validateProductDetailsOnDetailPage(
          randomSecondProductCardDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );
      });

      // BUG_HOME_01 -> Click product card on pagination second page is not working correctly
      test("Verify clicking on a product image navigates to the correct product detail page on pagination second page", async ({
        runner,
        envData,
        homePage,
        productDetailPage,
      }) => {
        await runner.wait(5, { waitForSelector: homePage.productContainer });
        // verifications of homepage products
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);

        await runner.wait(5, {
          waitForSelector: homePage.paginationNextButton,
        });
        // navigating to the second page of pagination
        await runner.verifyElementsAreEnabled(homePage.paginationNextButton);
        await runner.clickOnElement(homePage.paginationNextButton);

        await runner.wait(5, { waitForSelector: homePage.productImages });
        // verifications of homepage's pagination second page products
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);

        const randomFirstProductCardDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productImages
          );
        await runner.verifyUrlContains(envData.productUrl);
        await runner.validateProductDetailsOnDetailPage(
          randomFirstProductCardDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );

        await runner.goBack();
        // verifications of homepage products
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);

        // Getting second random product
        const randomSecondProductCardDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productImages
          );
        await runner.verifyUrlContains(envData.productUrl);
        await runner.validateProductDetailsOnDetailPage(
          randomSecondProductCardDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );
      });

      test("Verify clicking product title navigates to product detail page on pagination second page", async ({
        runner,
        envData,
        homePage,
        productDetailPage,
      }) => {
        await runner.wait(5, { waitForSelector: homePage.productContainer });
        // verifications of homepage products
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);

        await runner.wait(5, {
          waitForSelector: homePage.paginationNextButton,
        });
        // navigating to the second page of pagination
        await runner.verifyElementsAreEnabled(homePage.paginationNextButton);
        await runner.clickOnElement(homePage.paginationNextButton);

        await runner.wait(5, { waitForSelector: homePage.productImages });
        // verifications of homepage's pagination second page products
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);

        const randomFirstProductCardDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productTitles
          );
        await runner.verifyUrlContains(envData.productUrl);
        await runner.validateProductDetailsOnDetailPage(
          randomFirstProductCardDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );

        await runner.goBack();
        // verifications of homepage products
        await runner.wait(5, { waitForSelector: homePage.productImages });
        await runner.verifyElementsIsExist(homePage.productImages, true);
        await runner.verifyElementsIsExist(homePage.productTitles);
        await runner.verifyElementsIsExist(homePage.productPrices);
        await runner.verifyElementsIsExist(homePage.productDescriptions);

        // Getting second random product
        const randomSecondProductCardDetails =
          await runner.selectAndCaptureRandomProductDetailsAndClick(
            homePage.productContainer,
            homePage.productImages
          );
        await runner.verifyUrlContains(envData.productUrl);
        await runner.validateProductDetailsOnDetailPage(
          randomSecondProductCardDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );
        await runner.validateProductDetailsOnDetailPage(
          randomSecondProductCardDetails,
          productDetailPage.productTitle,
          productDetailPage.productPrice,
          productDetailPage.productImg
        );
      });

      test("Validate footer is present with footer header texts, logo and copyright text", async ({
        runner,
        homePage,
      }) => {
        await runner.verifyElementIsVisible(homePage.footer);
        await runner.verifyElementIsVisible(homePage.footerHeaderAboutUsText);
        await runner.verifyContainText(
          homePage.footerHeaderAboutUsText,
          homeData.footer.headers.aboutUs
        );
        await runner.verifyElementIsVisible(
          homePage.footerHeaderGetInTouchText
        );
        await runner.verifyContainText(
          homePage.footerHeaderGetInTouchText,
          homeData.footer.headers.getInTouch
        );
        await runner.verifyElementIsVisible(homePage.footerCopyrightText);
        await runner.verifyContainText(
          homePage.footerCopyrightText,
          homeData.footer.copyright
        );
      });
    });
  }
}

new HomePageTest().runTest();
