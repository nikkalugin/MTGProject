# Manabox MTG Mobile Automation Project

## 📱 Project Overview

This project is an automated testing framework for the **Manabox MTG mobile application**, built using **WebdriverIO (JavaScript) + Appium**.  
It covers **UI, functional, and API test scenarios**, follows modern automation best practices, and is fully integrated into a **CI/CD pipeline** with detailed reporting.

---

## 🛠️ Technology Stack

- **Language:** JavaScript (ES6+)
- **Test Framework:** WebdriverIO (WDIO)
- **Mobile Automation:** Appium
- **Design Pattern:** Page Object Model (POM)
- **Assertion Library:** WDIO Expect
- **Reporting:** Allure Reporter
- **CI/CD:** GitHub Actions
- **API Testing:** WDIO + Mocha / Axios
- **Version Control:** Git & GitHub

---

## 📂 Project Structure

```text
├── .github/
│   └── workflows/
│       └── main.yml                # GitHub Actions CI pipeline
├── allure-results/               # Allure raw results
├── allure-report/                # Generated Allure report
├── tests/
│   ├── api/
│   │   └── cards.test.js         # API test scenarios
│   ├── page-objects/
│   │   ├── forms/
│   │   │   ├── BinderForm.js
│   │   │   ├── CardForm.js
│   │   │   ├── DeleteForm.js
│   │   │   ├── ListForm.js
│   │   │   ├── RegisterForm.js
│   │   │   ├── ResetPasswordForm.js
│   │   │   └── SignInForm.js
│   │   └── screens/
│   │       ├── CollectionScreen.js
│   │       ├── FooterScreen.js
│   │       ├── HomeScreen.js
│   │       ├── ManaboxScreen.js
│   │       ├── SearchScreen.js
│   │       └── SettingsScreen.js
│   ├── specs/
│   │   ├── collection.e2e.js
│   │   ├── register.e2e.js
│   │   ├── search.e2e.js
│   │   └── signIn.e2e.js
│   └── helpers/
│       └── appStatesHelper.js
├── package.json
├── jsconfig.json
├── wdio.conf.js
└── README.md
```
---

## CI/CD Integration (GitHub Actions)

The CI pipeline automatically:

1. Installs dependencies
2. Executes UI & API tests
3. Generates Allure results
4. Publishes Allure reports as artifacts

✅ **Allure is fully integrated into CI/CD**  
✅ **Test reports are available for each pipeline run**

---

## Reporting (Allure)

All test executions generate detailed **Allure reports** including:

- test steps
- screenshots on failure
- execution time
- environment details

Reports are available:

- locally
- as CI artifacts

---

## Test Coverage Checklist

**Statuses**

- 🟢 Passed  
- 🔴 Failed  
- 🟡 Not Executed  

---

## Collection – Binder & List Forms

| Section    | Sub-section   | Description                                           | Result    |
| ---------- | ------------- | ----------------------------------------------------- | --------- |
| Collection | Binder Form   | Verify Binder Form is opened successfully             | 🟢 Passed |
| Collection | Binder Form   | Verify Binder Form is closed via Cancel button        | 🟢 Passed |
| Collection | Binder Form   | Verify Color Picker is opened                         | 🟢 Passed |
| Collection | Binder Form   | Verify Color Picker is closed                         | 🟢 Passed |
| Collection | Binder Form   | Verify Name field "Can't be empty" error is displayed | 🟢 Passed |
| Collection | Binder → List | Verify List Form is opened from Binder Form           | 🟢 Passed |
| Collection | List Form     | Verify List Form is opened successfully               | 🟢 Passed |
| Collection | List Form     | Verify List Form is closed via Cancel button          | 🟢 Passed |
| Collection | List Form     | Verify Color Picker is opened                         | 🟢 Passed |
| Collection | List Form     | Verify Color Picker is closed                         | 🟢 Passed |
| Collection | List Form     | Verify Name field "Can't be empty" error is displayed | 🟢 Passed |
| Collection | List → Binder | Verify Binder Form is opened from List Form           | 🟢 Passed |

---

## Collection - Adding Records

| Section    | Sub-section    | Description                       | Result    |
| ---------- | -------------- | --------------------------------- | --------- |
| Collection | Binder Records | Add new Binder record             | 🟢 Passed |
| Collection | Binder Records | Verify Binder record is displayed | 🟢 Passed |
| Collection | List Records   | Add new List record               | 🟢 Passed |
| Collection | List Records   | Verify List record is displayed   | 🟢 Passed |

---

## Collection - Record Settings & Editing

| Section    | Sub-section     | Description                       | Result    |
| ---------- | --------------- | --------------------------------- | --------- |
| Collection | Record Settings | Open record settings              | 🟢 Passed |
| Collection | Delete Popup    | Open delete confirmation popup    | 🟢 Passed |
| Collection | Delete Popup    | Close delete popup                | 🟢 Passed |
| Collection | Edit Record     | Edit collection record name       | 🟢 Passed |
| Collection | Edit Record     | Verify edited record is displayed | 🟢 Passed |

---

## Authentication - Registration

| Section | Sub-section | Description                                   | Result    |
| ------- | ----------- | --------------------------------------------- | --------- |
| Auth    | Register    | Verify errors when all fields are empty       | 🟢 Passed |
| Auth    | Register    | Verify weak password errors                   | 🟢 Passed |
| Auth    | Register    | Verify empty email and repeat password errors | 🟢 Passed |
| Auth    | Register    | Open Sign In page from Register               | 🟢 Passed |

---

## Authentication - Sign In

| Section | Sub-section    | Description                          | Result    |
| ------- | -------------- | ------------------------------------ | --------- |
| Auth    | Sign In        | Verify empty fields errors           | 🟢 Passed |
| Auth    | Sign In        | Verify password can't be empty error | 🟢 Passed |
| Auth    | Sign In        | Verify email can't be empty error    | 🟢 Passed |
| Auth    | Sign In        | Verify wrong password error          | 🟢 Passed |
| Auth    | Reset Password | Open Reset Password popup            | 🟢 Passed |
| Auth    | Reset Password | Close Reset Password popup           | 🟢 Passed |

---

## Search - Functionality & Filters

| Section | Sub-section  | Description                        | Result    |
| ------- | ------------ | ---------------------------------- | --------- |
| Search  | Search Field | Verify card search works           | 🟢 Passed |
| Search  | Search Field | Verify search value persists       | 🟢 Passed |
| Search  | Filters      | Verify legality filters behavior   | 🟢 Passed |
| Search  | Filters      | Verify filters persist across tabs | 🟢 Passed |
| Search  | Filters      | Verify filter removal via Bin      | 🟢 Passed |
| Search  | Type Line    | Verify Type Line filter            | 🟢 Passed |
| Search  | Stats        | Verify Stats dropdown filter       | 🟢 Passed |

---

## Search - Cards, Sets & Navigation

| Section | Sub-section  | Description                 | Result    |
| ------- | ------------ | --------------------------- | --------- |
| Search  | Card Details | Verify card type            | 🟢 Passed |
| Search  | Card Details | Verify card legalities      | 🟢 Passed |
| Search  | Sets         | Verify Sets list            | 🟢 Passed |
| Search  | Sets         | Open Set and verify details | 🟢 Passed |
| Search  | Language     | Verify language selection   | 🟢 Passed |
| Search  | Navigation   | Navigate between cards      | 🟢 Passed |

---

## Summary

- **Total Automated Scenarios:** 50+
- **Total Automated API Scenarios:** 15
- **Platforms:** Android (self-hosted)
- **Execution:** Local & CI
- **Reporting Results:** Allure (https://nikkalugin.github.io/MTGProject/)
- **Architecture:** Page Object Model
- **CI/CD:** GitHub Actions

---

## How to Run Tests

```bash
npm run test:mobile
npm run test:api
npm run test:all
```
---

## 🐳 Docker

### Run API tests
docker compose up --build api-tests