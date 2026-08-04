const { expect } = require("@playwright/test");

class DashboardPage {
  /**
   * @param {import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;

    /* =====================================================
       DASHBOARD
    ===================================================== */

    this.dashboardHeading = page.getByRole("heading", {
      name: /dashboard|welcome|agent dashboard/i,
    });

    /* =====================================================
       SIDEBAR MENU
    ===================================================== */

    this.listingsMenuButton = page.getByRole("button", {
      name: "Listings",
      exact: true,
    });

    this.listingsPageHeading = page.getByRole("heading", {
      name: "Listings",
      exact: true,
    });

    this.listingsSearchInput = page.getByPlaceholder(
      "Search by address, title...",
      {
        exact: true,
      }
    );

    /* =====================================================
       CREATE LISTING BUTTONS
    ===================================================== */

    this.createFirstListingButton = page.getByRole("button", {
      name: "Create Your First Listing",
      exact: true,
    });

    this.createNewListingButton = page.getByRole("button", {
      name: "Create New Listing",
      exact: true,
    });

    this.createListingButton = page.getByRole("button", {
      name: /create.*listing|add.*listing/i,
    });

    /* =====================================================
       LISTING CONTENT
    ===================================================== */

    this.listingCards = page.locator(
      [
        "article",
        '[data-testid*="listing" i]',
        '[data-testid*="property" i]',
        '[class*="listing-card" i]',
        '[class*="property-card" i]',
        '[class*="listingCard" i]',
        '[class*="propertyCard" i]',
      ].join(", ")
    );

    this.noListingsMessage = page.getByText("No listings yet", {
      exact: true,
    });

    this.totalListingsText = page.getByText("Total Listings", {
      exact: true,
    });

    this.activeListingsText = page.getByText("Active Listings", {
      exact: true,
    });
  }

  /* =====================================================
     DASHBOARD VERIFICATION
  ===================================================== */

  async waitForDashboard() {
    await this.page.waitForLoadState("domcontentloaded");

    await expect(
      this.page,
      "User should be redirected to the agent dashboard"
    ).toHaveURL(/dashboard\/agent|dashboard|agent/i, {
      timeout: 30_000,
    });

    const createFirstVisible =
      await this.createFirstListingButton
        .isVisible()
        .catch(() => false);

    const createNewVisible =
      await this.createNewListingButton
        .isVisible()
        .catch(() => false);

    const listingsMenuVisible =
      await this.listingsMenuButton
        .isVisible()
        .catch(() => false);

    const dashboardHeadingVisible =
      await this.dashboardHeading
        .first()
        .isVisible()
        .catch(() => false);

    if (
      !createFirstVisible &&
      !createNewVisible &&
      !listingsMenuVisible &&
      !dashboardHeadingVisible
    ) {
      throw new Error(
        [
          "Agent dashboard could not be confirmed.",
          `Current URL: ${this.page.url()}`,
        ].join("\n")
      );
    }
  }

  async waitForDashboardAfterPublish() {
    await this.page.waitForLoadState("domcontentloaded");

    await expect(
      this.page,
      "Agent dashboard should open after publishing the listing"
    ).toHaveURL(/dashboard\/agent|dashboard|agent/i, {
      timeout: 30_000,
    });

    await this.page.waitForTimeout(1_500);
  }

  /* =====================================================
     CREATE LISTING
  ===================================================== */

  async clickCreateListing() {
    const firstListingVisible =
      await this.createFirstListingButton
        .isVisible()
        .catch(() => false);

    if (firstListingVisible) {
      await expect(
        this.createFirstListingButton,
        "Create Your First Listing button should be visible"
      ).toBeVisible();

      await expect(
        this.createFirstListingButton,
        "Create Your First Listing button should be enabled"
      ).toBeEnabled();

      await this.createFirstListingButton.scrollIntoViewIfNeeded();
      await this.createFirstListingButton.click();

      return;
    }

    const createNewVisible =
      await this.createNewListingButton
        .isVisible()
        .catch(() => false);

    if (createNewVisible) {
      await expect(
        this.createNewListingButton,
        "Create New Listing button should be visible"
      ).toBeVisible();

      await expect(
        this.createNewListingButton,
        "Create New Listing button should be enabled"
      ).toBeEnabled();

      await this.createNewListingButton.scrollIntoViewIfNeeded();
      await this.createNewListingButton.click();

      return;
    }

    const fallbackButton = this.createListingButton.first();

    const fallbackVisible =
      await fallbackButton
        .isVisible()
        .catch(() => false);

    if (fallbackVisible) {
      await expect(
        fallbackButton,
        "Create Listing button should be enabled"
      ).toBeEnabled();

      await fallbackButton.scrollIntoViewIfNeeded();
      await fallbackButton.click();

      return;
    }

    throw new Error(
      [
        "Create Listing button was not found.",
        `Current URL: ${this.page.url()}`,
      ].join("\n")
    );
  }

  /* =====================================================
     OPEN LISTINGS MENU
  ===================================================== */

  async openListingsMenu() {
    await expect(
      this.listingsMenuButton,
      "Listings menu button should be visible"
    ).toBeVisible({
      timeout: 20_000,
    });

    await expect(
      this.listingsMenuButton,
      "Listings menu button should be enabled"
    ).toBeEnabled();

    await this.listingsMenuButton.scrollIntoViewIfNeeded();
    await this.listingsMenuButton.click();

    await expect(
      this.page,
      "Listings page should open after clicking Listings menu"
    ).toHaveURL(/dashboard\/agent\?tab=listings/i, {
      timeout: 20_000,
    });

    await expect(
      this.listingsPageHeading,
      "Listings page heading should be visible"
    ).toBeVisible({
      timeout: 20_000,
    });
  }

  /* =====================================================
     LISTING SEARCH
  ===================================================== */

  async searchListing(searchText) {
    if (!searchText) {
      throw new Error(
        "Search text is required to find the published listing."
      );
    }

    await expect(
      this.listingsSearchInput,
      "Listings search input should be visible"
    ).toBeVisible({
      timeout: 20_000,
    });

    await this.listingsSearchInput.fill(searchText);

    await expect(
      this.listingsSearchInput
    ).toHaveValue(searchText);

    await this.page.waitForTimeout(1_000);
  }

  /* =====================================================
     LOCATION-BASED LISTING LOCATORS
  ===================================================== */

  getListingByLocation(locationName) {
    if (!locationName) {
      throw new Error(
        "Property location is required to locate the listing."
      );
    }

    return this.page.getByText(locationName, {
      exact: true,
    });
  }

  getListingCardByLocation(locationName) {
    if (!locationName) {
      throw new Error(
        "Property location is required to locate the listing card."
      );
    }

    return this.listingCards
      .filter({
        hasText: locationName,
      })
      .first();
  }

  /* =====================================================
     PUBLISHED LISTING VERIFICATION
  ===================================================== */

  async verifyListingVisibleByLocation(locationName) {
    if (!locationName) {
      throw new Error(
        "Property location is required to verify the published listing."
      );
    }

    await this.searchListing(locationName);

    const exactLocation =
      this.getListingByLocation(locationName);

    const exactLocationVisible =
      await exactLocation
        .first()
        .isVisible()
        .catch(() => false);

    if (exactLocationVisible) {
      await expect(
        exactLocation.first(),
        `Published listing location "${locationName}" should be visible`
      ).toBeVisible({
        timeout: 20_000,
      });

      return;
    }

    const listingCard =
      this.getListingCardByLocation(locationName);

    const listingCardVisible =
      await listingCard
        .isVisible()
        .catch(() => false);

    if (listingCardVisible) {
      await expect(
        listingCard,
        `Published listing card for "${locationName}" should be visible`
      ).toBeVisible({
        timeout: 20_000,
      });

      return;
    }

    const noListingsVisible =
      await this.noListingsMessage
        .isVisible()
        .catch(() => false);

    throw new Error(
      [
        `Published listing "${locationName}" was not found in the Listings page.`,
        `No listings message visible: ${noListingsVisible}`,
        `Current URL: ${this.page.url()}`,
      ].join("\n")
    );
  }

  async verifyPublishedListingByLocation(locationName) {
    await this.waitForDashboardAfterPublish();
    await this.openListingsMenu();
    await this.verifyListingVisibleByLocation(locationName);
  }
}

module.exports = {
  DashboardPage,
};