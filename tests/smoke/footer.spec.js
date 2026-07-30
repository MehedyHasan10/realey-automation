const { test } = require('@playwright/test');

const HomePage = require('../../pages/HomePage');
const Footer = require('../../pages/Footer');
const { stepWithScreenshot } = require('../../utils/step');

test.describe('Footer Tests', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await page.waitForLoadState('domcontentloaded');
  });

  test(
    'Verify footer main information',
    async ({ page }, testInfo) => {
      const footer = new Footer(page);

      await stepWithScreenshot(
        page,
        testInfo,
        'Scroll to footer',
        async () => {
          await footer.scrollToFooter();
        },
      );

      await stepWithScreenshot(
        page,
        testInfo,
        'Verify footer and Let’s Talk heading',
        async () => {
          await footer.verifyFooterVisible();
        },
      );

      await stepWithScreenshot(
        page,
        testInfo,
        'Verify Realey footer logo',
        async () => {
          await footer.verifyLogoVisible();
        },
      );

      await stepWithScreenshot(
        page,
        testInfo,
        'Verify footer description',
        async () => {
          await footer.verifyDescriptionVisible();
        },
      );
    },
  );

  test(
    'Verify footer email subscription',
    async ({ page }, testInfo) => {
      const footer = new Footer(page);

      const testEmail =
        `qa.footer.${Date.now()}@example.com`;

      await stepWithScreenshot(
        page,
        testInfo,
        'Scroll to footer',
        async () => {
          await footer.scrollToFooter();
        },
      );

      await stepWithScreenshot(
        page,
        testInfo,
        'Verify email input and submit button',
        async () => {
          await footer.verifyEmailSubscriptionElements();
        },
      );

      await stepWithScreenshot(
        page,
        testInfo,
        'Enter valid email address',
        async () => {
          await footer.enterEmail(testEmail);
        },
      );

      await stepWithScreenshot(
        page,
        testInfo,
        'Submit email subscription',
        async () => {
          await footer.submitEmail();
        },
      );

      await stepWithScreenshot(
        page,
        testInfo,
        'Verify email submitted successfully message',
        async () => {
          await footer.verifySubscriptionResult();
        },
      );
    },
  );

  test(
    'Verify footer Quick Links',
    async ({ page }, testInfo) => {
      const footer = new Footer(page);

      await stepWithScreenshot(
        page,
        testInfo,
        'Scroll to footer',
        async () => {
          await footer.scrollToFooter();
        },
      );

      await stepWithScreenshot(
        page,
        testInfo,
        'Verify Quick Links heading and all links',
        async () => {
          await footer.verifyQuickLinksSection();
        },
      );
    },
  );

  test(
    'Verify footer Fixed Price section',
    async ({ page }, testInfo) => {
      const footer = new Footer(page);

      await stepWithScreenshot(
        page,
        testInfo,
        'Scroll to footer',
        async () => {
          await footer.scrollToFooter();
        },
      );

      await stepWithScreenshot(
        page,
        testInfo,
        'Verify Fixed Price heading and links',
        async () => {
          await footer.verifyFixedPriceSection();
        },
      );
    },
  );

  test(
    'Verify footer Auctions section',
    async ({ page }, testInfo) => {
      const footer = new Footer(page);

      await stepWithScreenshot(
        page,
        testInfo,
        'Scroll to footer',
        async () => {
          await footer.scrollToFooter();
        },
      );

      await stepWithScreenshot(
        page,
        testInfo,
        'Verify Auctions heading and links',
        async () => {
          await footer.verifyAuctionsSection();
        },
      );
    },
  );
});