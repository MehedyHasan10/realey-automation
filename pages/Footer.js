const { expect } = require('@playwright/test');

class Footer {
  constructor(page) {
    this.page = page;

    // Main footer heading
    this.footerHeading = page.getByRole('heading', {
      name: /let['’]s talk/i,
    });

    // Footer main container
    this.footer = this.footerHeading.locator(
      'xpath=ancestor::div[contains(@class,"max-w-6xl")][1]',
    );

    // --------------------------------------------------
    // Footer main information
    // --------------------------------------------------

    this.logo = this.footer.getByRole('img', {
      name: 'Realey Logo',
      exact: true,
    });

    this.description = this.footer.getByText(
      /Realey is a platform dedicated to property buyers, sellers, and agents/i,
    );

    // --------------------------------------------------
    // Email subscription
    // --------------------------------------------------

    this.emailInput = this.footer.getByPlaceholder(
      'Enter your email',
      { exact: true },
    );

    // Email input এবং arrow button একই parent container-এর মধ্যে
    this.emailSection = this.emailInput.locator('xpath=parent::*');

    this.emailSubmitButton = this.emailSection
      .locator('button')
      .first();

    // Success toast
    this.subscriptionSuccessMessage = page
      .getByText(/Email submitted successfully/i)
      .first();

    // --------------------------------------------------
    // Quick Links
    // --------------------------------------------------

    this.quickLinksHeading = this.footer.getByRole('heading', {
      name: 'Quick Links',
      exact: true,
    });

    this.quickLinksSection = this.quickLinksHeading.locator(
      'xpath=parent::*',
    );

    this.quickHomeLink = this.quickLinksSection.getByRole('link', {
      name: 'Home',
      exact: true,
    });

    this.quickAboutLink = this.quickLinksSection.getByRole('link', {
      name: 'About',
      exact: true,
    });

    this.quickProcessLink = this.quickLinksSection.getByRole('link', {
      name: 'Process',
      exact: true,
    });

    this.quickTeamLink = this.quickLinksSection.getByRole('link', {
      name: 'Team',
      exact: true,
    });

    this.quickContactLink = this.quickLinksSection.getByRole('link', {
      name: 'Contact',
      exact: true,
    });

    // --------------------------------------------------
    // Fixed Price section
    // --------------------------------------------------

    this.fixedPriceHeading = this.footer.getByRole('heading', {
      name: 'Fixed Price',
      exact: true,
    });

    this.fixedPriceSection = this.fixedPriceHeading.locator(
      'xpath=parent::*',
    );

    this.fixedPriceListingsLink =
      this.fixedPriceSection.getByRole('link', {
        name: 'Listings',
        exact: true,
      });

    this.fixedPriceRecentlyAddedLink =
      this.fixedPriceSection.getByRole('link', {
        name: 'Recently Added',
        exact: true,
      });

    this.fixedPriceRecentlyEndedLink =
      this.fixedPriceSection.getByRole('link', {
        name: 'Recently Ended',
        exact: true,
      });

    // --------------------------------------------------
    // Auctions section
    // --------------------------------------------------

    this.auctionsHeading = this.footer.getByRole('heading', {
      name: 'Auctions',
      exact: true,
    });

    this.auctionsSection = this.auctionsHeading.locator(
      'xpath=parent::*',
    );

    this.auctionsListingsLink =
      this.auctionsSection.getByRole('link', {
        name: 'Listings',
        exact: true,
      });

    this.auctionsEndingSoonLink =
      this.auctionsSection.getByRole('link', {
        name: 'Ending Soon',
        exact: true,
      });

    this.auctionsStartingSoonLink =
      this.auctionsSection.getByRole('link', {
        name: 'Starting Soon',
        exact: true,
      });

    this.auctionsRecentlyAddedLink =
      this.auctionsSection.getByRole('link', {
        name: 'Recently Added',
        exact: true,
      });

    this.auctionsRecentlyEndedLink =
      this.auctionsSection.getByRole('link', {
        name: 'Recently Ended',
        exact: true,
      });
  }

  // --------------------------------------------------
  // Common actions
  // --------------------------------------------------

  async scrollToFooter() {
    await this.footerHeading.scrollIntoViewIfNeeded();
  }

  // --------------------------------------------------
  // Footer main verification
  // --------------------------------------------------

  async verifyFooterVisible() {
    await expect(
      this.footer,
      'Footer container is not visible',
    ).toBeVisible();

    await expect(
      this.footerHeading,
      'Let’s Talk heading is missing',
    ).toBeVisible();
  }

  async verifyLogoVisible() {
    await expect(
      this.logo,
      'Realey footer logo is missing',
    ).toBeVisible();

    await expect(this.logo).toHaveAttribute(
      'src',
      '/images/logo.png',
    );

    await expect(this.logo).toHaveAttribute(
      'alt',
      'Realey Logo',
    );
  }

  async verifyDescriptionVisible() {
    await expect(
      this.description,
      'Footer description is missing',
    ).toBeVisible();
  }

  // --------------------------------------------------
  // Email subscription
  // --------------------------------------------------

  async verifyEmailSubscriptionElements() {
    await expect(
      this.emailInput,
      'Email subscription input is missing',
    ).toBeVisible();

    await expect(this.emailInput).toHaveAttribute(
      'type',
      'email',
    );

    await expect(this.emailInput).toHaveAttribute(
      'placeholder',
      'Enter your email',
    );

    await expect(
      this.emailSubmitButton,
      'Email submit arrow button is missing',
    ).toBeVisible();

    await expect(
      this.emailSubmitButton,
      'Email submit arrow button is disabled',
    ).toBeEnabled();
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);

    await expect(
      this.emailInput,
      'Entered email value was not saved in the input',
    ).toHaveValue(email);
  }

  async submitEmail() {
    await expect(
      this.emailSubmitButton,
      'Email submit button is not visible',
    ).toBeVisible();

    await expect(
      this.emailSubmitButton,
      'Email submit button is disabled',
    ).toBeEnabled();

    await this.emailSubmitButton.click();
  }

  async verifySubscriptionResult() {
    await expect(
      this.subscriptionSuccessMessage,
      'Email success toast was not displayed',
    ).toBeVisible({
      timeout: 10_000,
    });

    await expect(
      this.subscriptionSuccessMessage,
    ).toContainText('Email submitted successfully');
  }

  // --------------------------------------------------
  // Quick Links
  // --------------------------------------------------

  async verifyQuickLinksSection() {
    await expect.soft(
      this.quickLinksHeading,
      'Quick Links heading is missing',
    ).toBeVisible();

    await expect.soft(
      this.quickHomeLink,
      'Home quick link is missing',
    ).toBeVisible();

    await expect.soft(
      this.quickAboutLink,
      'About quick link is missing',
    ).toBeVisible();

    await expect.soft(
      this.quickProcessLink,
      'Process quick link is missing',
    ).toBeVisible();

    await expect.soft(
      this.quickTeamLink,
      'Team quick link is missing',
    ).toBeVisible();

    await expect.soft(
      this.quickContactLink,
      'Contact quick link is missing',
    ).toBeVisible();
  }

  // --------------------------------------------------
  // Fixed Price
  // --------------------------------------------------

  async verifyFixedPriceSection() {
    await expect.soft(
      this.fixedPriceHeading,
      'Fixed Price heading is missing',
    ).toBeVisible();

    await expect.soft(
      this.fixedPriceListingsLink,
      'Fixed Price Listings link is missing',
    ).toBeVisible();

    await expect.soft(
      this.fixedPriceRecentlyAddedLink,
      'Fixed Price Recently Added link is missing',
    ).toBeVisible();

    await expect.soft(
      this.fixedPriceRecentlyEndedLink,
      'Fixed Price Recently Ended link is missing',
    ).toBeVisible();
  }

  // --------------------------------------------------
  // Auctions
  // --------------------------------------------------

  async verifyAuctionsSection() {
    await expect.soft(
      this.auctionsHeading,
      'Auctions heading is missing',
    ).toBeVisible();

    await expect.soft(
      this.auctionsListingsLink,
      'Auctions Listings link is missing',
    ).toBeVisible();

    await expect.soft(
      this.auctionsEndingSoonLink,
      'Auctions Ending Soon link is missing',
    ).toBeVisible();

    await expect.soft(
      this.auctionsStartingSoonLink,
      'Auctions Starting Soon link is missing',
    ).toBeVisible();

    await expect.soft(
      this.auctionsRecentlyAddedLink,
      'Auctions Recently Added link is missing',
    ).toBeVisible();

    await expect.soft(
      this.auctionsRecentlyEndedLink,
      'Auctions Recently Ended link is missing',
    ).toBeVisible();
  }

  // --------------------------------------------------
  // Full footer verification
  // --------------------------------------------------

  async verifyAllFooterElements() {
    await this.verifyFooterVisible();
    await this.verifyLogoVisible();
    await this.verifyDescriptionVisible();
    await this.verifyEmailSubscriptionElements();
    await this.verifyQuickLinksSection();
    await this.verifyFixedPriceSection();
    await this.verifyAuctionsSection();
  }
}

module.exports = Footer;