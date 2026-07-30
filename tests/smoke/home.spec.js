const { test, expect } = require('../../fixtures/baseTest');
const { stepWithScreenshot } = require('../../utils/step');

const HomePage = require('../../pages/HomePage');

test(
  'Public navigation links can be inspected',
  async ({ page }, testInfo) => {
    const homePage = new HomePage(page);

    await stepWithScreenshot(
      page,
      testInfo,
      'Open homepage',
      async () => {
        await homePage.open();

        await expect(
          page,
          'Homepage URL is incorrect',
        ).toHaveURL(/https:\/\/uat\.realey\.au\/?/);
      },
    );

    await stepWithScreenshot(
      page,
      testInfo,
      'Verify homepage is loaded',
      async () => {
        await homePage.verifyPageLoaded();
      },
    );

    await stepWithScreenshot(
      page,
      testInfo,
      'Collect visible public navigation links',
      async () => {
        const links = page.locator('a:visible');

        const totalLinks = await links.count();

        expect(
          totalLinks,
          'No visible anchor links were found on the homepage',
        ).toBeGreaterThan(0);

        const linkDetails = await links.evaluateAll((elements) =>
          elements.slice(0, 50).map((element, index) => ({
            index: index + 1,
            text: (element.textContent || '')
              .replace(/\s+/g, ' ')
              .trim(),
            href: element.href,
            target: element.getAttribute('target'),
            ariaLabel: element.getAttribute('aria-label'),
          })),
        );

        await testInfo.attach('Visible navigation links', {
          body: Buffer.from(
            JSON.stringify(
              {
                totalVisibleLinks: totalLinks,
                links: linkDetails,
              },
              null,
              2,
            ),
          ),
          contentType: 'application/json',
        });
      },
    );
  },
);