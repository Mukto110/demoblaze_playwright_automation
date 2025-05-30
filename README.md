# 🧪 Demoblaze Automation Testing

A Playwright-powered test automation project for validating the functionality and UI of the [Demoblaze](https://demoblaze.com/) e-commerce web application.

---

## 🚀 Project Overview

| Attribute        | Detail                                                                 |
|------------------|------------------------------------------------------------------------|
| **Project Name** | Demoblaze Automation Testing                                           |
| **Website URL**  | [https://demoblaze.com/](https://demoblaze.com/)                       |
| **Objective**    | Ensure functional correctness and UI stability using Playwright tests  |
| **Testing Type** | Functional UI Testing                                                  |
| **Automation Tools** | ✅ Playwright (TypeScript)                                      |

---

## 👥 Team

| Name   | Role        |
|--------|-------------|
| Provat | QA Engineer |
| Mukto  | QA Engineer |

---


## 📂 Folder Structure
```plaintext
demoblaze-automation/
├── allure-results/
├── pageObjectModel/
│   ├── homePage.ts
│   ├── cartPage.ts
│   ├── aboutModal.ts
│   ├── contactModal.ts
│   ├── loginModal.ts
│   ├── signUpModal.ts
│   └── productDetailPage.ts
├── testData/
│   ├── home.json
│   ├── cart.json
│   ├── aboutUs.json
│   ├── contact.json
│   ├── login.json
│   └── signup.json
├── tests/
│   ├── home.spec.ts
│   ├── cart.spec.ts
│   ├── aboutUs.spec.ts
│   ├── contactForm.spec.ts
│   ├── login.spec.ts
│   └── signUp.spec.ts
├── utilities/
│   ├── authHelper.ts
│   ├── env.ts
│   ├── fakeData.ts
│   ├── fixtures.ts
│   ├── logger.ts
│   ├── utils.ts
│   └── valueProvider.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
---
```

## 🧪 Modules Covered

| Module              | Status     | Notes                    |
|---------------------|------------|--------------------------|
| Home Page           | ✅ Completed |                          |
| Login & Signup      | ✅ Completed |                          |
| Product Categories  | ✅ Completed |                          |
| Cart / Checkout     | ✅ Completed | Includes Place Order     |
| Contact Form        | ✅ Completed |                          |
| About Us            | ✅ Completed | Includes video content   |

---


## 🔧 Test Environment

| Area             | Details               |
|------------------|------------------------|
| **Base URL**     | `https://demoblaze.com/` |
| **Browser(s)**   | Chromium              |
| **Viewport**     | 1263 × 603 px (Desktop) |
| **Test Data**    | Dummy login/signup data |
| **Test Runner**  | Playwright Test Runner |
| **Reports**      | Allure, HTML           |

---



## ▶️ How to Run the Tests

```bash
# Install dependencies
npm install

# Run all tests
npm run test:chrome

# Generate Allure report
npm run allure:generate

# Open Allure report
npm run allure:open

# Run all tests & open Allure report
npm run test:allure

# Run a specific test file
npx playwright test tests/login.spec.ts

# Generate and open HTML report
npx playwright show-report
```




📝 Sample Test Data
Type	Sample
Username	provat1234
Password	12345678
Contact	fakerJs
Message	fakerJs




📊 Test Execution Summary
Metric	Value
Total Test Scenarios	To be filled
Automated Test Scenarios	To be filled
Pass Rate	To be filled
Execution Time	To be filled
Known Issues / Bugs	To be filled



///


📁 Reports & Artifacts

📌 Allure Report Path: /demoblaze-automation/allure-results/

🖼️ Screenshots on Failure: tests/screenshots/

📽️ Video Recordings (if enabled): tests/videos/





🧩 Lessons Learned & Improvements
 Add more edge cases for login validation

 Enhance selectors using data-testid for stability

 Improve test data generation

 Split test fixtures for better maintainability

 Use authHelper to reduce login/signup code duplication





✅ Final Status
Area	Status
Manual Test Scenarios	✅ Done
Automation Complete	✅ Done
Documentation	✅ Finalized
Ready for Handover	✅ Yes



🔜 Next Steps
 Final regression run

 Merge automation code into main

 Share documentation with QA and Dev teams


End of Document

---

Would you like me to save and send this as a `.md` file for your GitHub repo?


