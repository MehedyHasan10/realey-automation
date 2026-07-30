const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;

    this.body = page.locator('body');

    // Hero section
    this.heroHeading = page.getByRole('heading').first();
  }

  async open() {
    await this.page.goto('/', {
      waitUntil: 'domcontentloaded',
    });

    await expect(this.body).toBeVisible();
  }

  async verifyPageLoaded() {
    await expect(this.body).toBeVisible();
  }
}

module.exports = HomePage;