# FarmDigits E2E Automation (Playwright + TypeScript)

## Prerequisites
- Node.js 18+
- Browsers for Playwright: `npx playwright install`

## Environment
Create `.env` (copy from `env.example` if available):
```
BASE_URL=https://farmdigits.outscalers.com/
LOGIN_EMAIL=you@example.com
LOGIN_PASSWORD=yourPassword
```

## Commands
```
# Run tests
npm test
npm run test:headed
npm run test:chromium

# UI mode
npm run test:ui

# HTML report
npm run report

# Allure
npm run allure:generate
npm run allure:open
```

## Structure
```
.
├─ pages/
│  ├─ base.page.ts           # BasePage with shared helpers (factory-style foundation)
│  ├─ login.page.ts          # Login flow POM
│  ├─ sidebar.page.ts        # Sidebar navigation POM
│  └─ add-animal.page.ts     # Add Animal modal POM
│
├─ tests/
│  ├─ animal-add.spec.ts     # Add Animal scenarios (happy path, validation, cancel)
│  └─ login.spec.ts          # Login scenarios
│
├─ playwright.config.ts      # Config: baseURL, reporters, retries, tracing
├─ package.json              # Scripts for runs/reports
├─ README.md
└─ (optional) .env           # Environment variables
```

Notes
- The framework uses a BasePage with small, reusable helpers to keep POMs concise.
- Accessible-first locators (`getByRole`) are preferred for stability.
- Auth storage reuse and API seeding are not enabled by default in this repo snapshot.
- Visual snapshots can be added via `expect(page).toHaveScreenshot()` when needed.