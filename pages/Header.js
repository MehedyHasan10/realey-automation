const { expect } = require('@playwright/test');

class Header {
  constructor(page) {
    this.page = page;

    // Main desktop header container
    this.header = page
      .locator('div.mx-auto.flex.items-center.justify-between.max-w-6xl')
      .first();

    // Logo
    this.logo = this.header.getByRole('img', {
      name: 'Realey',
      exact: true,
    });

    // Desktop navigation container
    this.desktopNavigation = this.header.locator('nav');

    // Navigation buttons
    this.homeButton = this.desktopNavigation.getByRole('button', {
      name: 'Home',
      exact: true,
    });

    this.aboutButton = this.desktopNavigation.getByRole('button', {
      name: 'About',
      exact: true,
    });

    this.listingsButton = this.desktopNavigation.getByRole('button', {
      name: 'Listings',
      exact: true,
    });

    this.searchButton = this.desktopNavigation.getByRole('button', {
      name: 'Search',
      exact: true,
    });

    this.pricingButton = this.desktopNavigation.getByRole('button', {
      name: 'Pricing',
      exact: true,
    });

    this.connectButton = this.desktopNavigation.getByRole('button', {
      name: 'Connect',
      exact: true,
    });

    // Desktop action area
    this.desktopActionArea = this.header
      .locator('div.hidden.lg\\:block')
      .last();

    this.loginButton = this.desktopActionArea.getByRole('button', {
      name: 'Login',
      exact: true,
    });

    this.getStartedButton = this.desktopActionArea.getByRole('button', {
      name: 'Get Started',
      exact: true,
    });
  }

  async verifyHeaderVisible() {
    await expect(
      this.header,
      'Main header container is missing',
    ).toBeVisible();
  }

  async verifyLogoVisible() {
    await expect(
      this.logo,
      'Realey header logo is missing',
    ).toBeVisible();

    await expect(
      this.logo,
      'Realey logo source is incorrect',
    ).toHaveAttribute('src', '/images/logo.png');

    await expect(
      this.logo,
      'Realey logo alt text is incorrect',
    ).toHaveAttribute('alt', 'Realey');
  }

  async verifyNavigationButtonsVisible() {
    await expect(
      this.desktopNavigation,
      'Desktop navigation container is missing',
    ).toBeVisible();

    await expect.soft(
      this.homeButton,
      'Home navigation button is missing',
    ).toBeVisible();

    await expect.soft(
      this.aboutButton,
      'About navigation button is missing',
    ).toBeVisible();

    await expect.soft(
      this.listingsButton,
      'Listings navigation button is missing',
    ).toBeVisible();

    await expect.soft(
      this.searchButton,
      'Search navigation button is missing',
    ).toBeVisible();

    await expect.soft(
      this.pricingButton,
      'Pricing navigation button is missing',
    ).toBeVisible();

    await expect.soft(
      this.connectButton,
      'Connect navigation button is missing',
    ).toBeVisible();
  }

  async verifyActionButtonsVisible() {
    await expect.soft(
      this.loginButton,
      'Login button is missing',
    ).toBeVisible();

    await expect.soft(
      this.getStartedButton,
      'Get Started button is missing',
    ).toBeVisible();
  }

  async verifyAllHeaderElements() {
    await this.verifyHeaderVisible();
    await this.verifyLogoVisible();
    await this.verifyNavigationButtonsVisible();
    await this.verifyActionButtonsVisible();
  }

  async clickLogo() {
    await this.logo.click();
  }

  async clickHome() {
    await this.homeButton.click();
  }

  async clickAbout() {
    await this.aboutButton.click();
  }

  async clickListings() {
    await this.listingsButton.click();
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async clickPricing() {
    await this.pricingButton.click();
  }

  async clickConnect() {
    await this.connectButton.click();
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async clickGetStarted() {
    await this.getStartedButton.click();
  }
}

module.exports = Header;