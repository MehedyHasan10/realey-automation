const { test } = require('../../fixtures/baseTest');

/**
 * Full business-flow placeholder:
 * 1. Agent logs in.
 * 2. Agent creates and publishes a property listing.
 * 3. Buyer logs in.
 * 4. Buyer submits an offer.
 * 5. Agent accepts the offer.
 * 6. Buyer completes the five settlement stages.
 *
 * Add stable data-testid attributes to the application where possible, then
 * implement each action with stepWithScreenshot() so every business step
 * appears with an image in Allure.
 */
test.describe('Property purchase and settlement', () => {
  test.skip(true, 'Requires approved UAT accounts and reusable test-property data');

  test('Agent publishes listing and buyer completes settlement', async () => {
    // Intentionally skipped starter scenario.
  });
});
