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
- `pages/` — Page Objects (`login.page.ts`, `sidebar.page.ts`, `add-animal.page.ts`, ...)
- `tests/` — Specs using POM (e.g., `animal-add.spec.ts`, `login.spec.ts`)
- `playwright.config.ts` — config (baseURL, retries, tracing, reporter)

## Conventions
- Prefer `getByRole` and accessible names
- Use Page Objects for flows
- Keep tests independent and idempotent