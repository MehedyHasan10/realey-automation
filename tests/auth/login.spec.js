// const { test, expect } = require('../../fixtures/baseTest');
// const { stepWithScreenshot } = require('../../utils/step');
// const HomePage = require('../../pages/HomePage');
// const LoginPage = require('../../pages/LoginPage');

// test.describe('Authentication', () => {
//   test.skip(
//     !process.env.BUYER_EMAIL || !process.env.BUYER_PASSWORD,
//     'Set BUYER_EMAIL and BUYER_PASSWORD in .env'
//   );

//   test('Buyer can log in', async ({ page }, testInfo) => {
//     const homePage = new HomePage(page);
//     const loginPage = new LoginPage(page);

//     await stepWithScreenshot(page, testInfo, 'Open homepage', async () => {
//       await homePage.open();
//     });

//     await stepWithScreenshot(page, testInfo, 'Open login page', async () => {
//       await homePage.loginLink.click();
//     });

//     await stepWithScreenshot(page, testInfo, 'Enter buyer credentials', async () => {
//       await loginPage.emailInput.fill(process.env.BUYER_EMAIL);
//       await loginPage.passwordInput.fill(process.env.BUYER_PASSWORD);
//     });

//     await stepWithScreenshot(page, testInfo, 'Submit login form', async () => {
//       await loginPage.submitButton.click();
//     });

//     await stepWithScreenshot(page, testInfo, 'Verify successful authentication', async () => {
//       await expect(page).not.toHaveURL(/login|sign-in/i);
//     });
//   });
// });
