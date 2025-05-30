🧾 Project Overview

* Project Name: Demoblaze Automation Testing
* Website URL: https://demoblaze.com/
* Objective: To ensure the functional correctness and UI stability of the Demoblaze e-commerce web application through automated testing using Playwright.
* Testing Type: Functional UI Testing
* Automation Tools: 
    * [ ] Playwright (JS)
    * [ ] Playwright (TS)


👥 Team
Name    Role
Provat  QA Engineer
Mukto   QA Engineer


📂 Folder Structure ->
  demoblaze-automation/
  |── allure-results
  |── pageObjectModel/
  |   ├── homePage.ts
  |   ├── cartPage.ts
  |   ├── aboutModal.ts
  |   ├── contactModal.ts
  |   ├── loginModal.ts
  |   ├── signUpModal.ts
  |   ├── productDetailPage.ts
  |── testData
  |   ├── home.json
  |   ├── cart.json
  |   ├── aboutUs.json
  |   ├── contact.json
  |   ├── login.json
  |   ├── signup.json
  ├── tests/
  |   ├── home.spec.ts
  |   ├── cart.spec.ts
  |   ├── aboutUs.spec.ts
  |   ├── contactForm.spec.ts
  |   ├── login.spec.ts
  |   ├── signUp.spec.ts
  ├── utilities/
  |   ├── authHelper.ts
  |   ├── env.ts
  |   ├── fakeData.ts
  |   ├── fixtures.ts
  |   ├── logger.ts
  |   ├── utils.ts
  |   ├── valueProvider.ts
  ├── playwright.config.ts
  ├── package.json
  ├── package-lock.json
  ├── .gitignore
  └── README.md



🧪 Modules Covered
Module                Status            Notes

Home Page             ✅ Completed
Login & Signup        ✅ Completed
Product Categories    ✅ Completed
Cart / Checkout       ✅ Completed      Place Order included
Contact Form          ✅ Completed
About Us              ✅ Completed      Included the video content



🔧 Test Environment
Area             Details
Base URL         https://demoblaze.com/
Browser(s)       Chromium
Viewport Width   Desktop: 1263px
Viewport Height  Desktop: 603px
Data Used        Dummy login/signup data
Test Runner      Playwright Test Runner
Report           Allure, HTML



▶️ How to Run the Tests

# Install dependencies
npm install

# Run all tests
npm run test:chrome

# To generate allure report
npm run allure:generate

# To open allure report
npm run allure:open

# To run test chrome, generate allure and open allure report
npm run test:allure

# Run specific file
npx playwright test tests/login/login.spec.ts (example)

# Generate HTML report
npx playwright show-report



📝 Test Data (Example)
Type             Sample
Username         "provat1234"
Password         "12345678"
Contact Email    fakerJs
Message          fakerJs



📊 Test Execution Summary

Metric                            Value

Total Test Scenarios              ___
Automated Test Scenarios          ___
Pass Rate                         ___%
Execution Time                    ___ mins
Known Issues / Bugs               ___



📁 Reports & Artifacts

* 📌 Report Path: /demoblaze_playwright_automation/allure-results
* 🖼️ Screenshots on failure: tests/screenshots/
* 📽️ Video recording (if enabled): tests/videos/


🧩 Lessons Learned & Improvements

* [ ] Add more edge cases for Login validation
* [ ] Enhance selectors using data-testid for stability
* [ ] Improve test data generation
* [ ] Split test fixtures for better maintenance
* [] Using auth helper to reduce code repetition of login and signup


✅ Final Status

Area                          Status

Manual Test Scenarios         ✅ Done

Automation Complete           ✅ Done

Documentation                 ✅ Finalized

Ready for Handover            ✅ Yes 



✅ Next Steps

* [ ] Final regression run
* [ ] Merge the automation code into the main
* [ ] Share documentation with QA and Dev teams


🔚 End of Document
