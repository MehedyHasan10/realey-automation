const { test } = require('@playwright/test');

const HomePage = require('../../pages/HomePage');
const Header = require('../../pages/Header');
const { stepWithScreenshot } = require('../../utils/step');

test.describe('Header Tests', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await page.waitForLoadState('domcontentloaded');
  });

  test(
    'Verify header container and logo',
    async ({ page }, testInfo) => {
      const header = new Header(page);

      await stepWithScreenshot(
        page,
        testInfo,
        'Verify header is visible',
        async () => {
          await header.verifyHeaderVisible();
        },
      );

      await stepWithScreenshot(
        page,
        testInfo,
        'Verify Realey logo is visible',
        async () => {
          await header.verifyLogoVisible();
        },
      );
    },
  );

  test(
    'Verify all header navigation buttons',
    async ({ page }, testInfo) => {
      const header = new Header(page);

      await stepWithScreenshot(
        page,
        testInfo,
        'Verify Home About Listings Search Pricing and Connect buttons',
        async () => {
          await header.verifyNavigationButtonsVisible();
        },
      );
    },
  );

  test(
    'Verify Login and Get Started buttons',
    async ({ page }, testInfo) => {
      const header = new Header(page);

      await stepWithScreenshot(
        page,
        testInfo,
        'Verify Login and Get Started buttons',
        async () => {
          await header.verifyActionButtonsVisible();
        },
      );
    },
  );
});