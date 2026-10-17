import { type Locator, type Page } from '@playwright/test';

export class AmazonPage {
  // 1. Declare the variables
  readonly page: Page;
  readonly searchBox: Locator;
  readonly priceLabel: Locator;

  // 2. The constructor links the page and defines the locators
  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.getByPlaceholder('Search Amazon.in');
    //this.priceLabel = page.locator('.s-price-instructions-style .a-price-whole').first();
    this.priceLabel = page.locator('.celwidget .a-price-whole').first();
    
  }

  // 3. Action method: Searching
  async searchProduct(productName: string) {
    await this.searchBox.fill(productName);
    await this.searchBox.press('Enter');
  }

  // 4. Action method: Getting the price
  async getFirstProductPrice(): Promise<number> {
    const priceText = await this.priceLabel.innerText();
    // Remove commas (e.g., "1,20,000" -> "120000") and convert to a number
    return parseInt(priceText.replace(/,/g, '')); 
  }
}