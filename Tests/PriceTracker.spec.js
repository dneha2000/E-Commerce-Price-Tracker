import { test, expect } from '@playwright/test';
import fs from 'fs';
import * as path from 'path';
// Import your Page Object and Data file
import { AmazonPage } from '../Pages/AmazonPages';

// 1. Read and parse the JSON directly
const productData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/Products.js'), 'utf-8')
);

// Loop through the JSON data
for (const product of productData) {
  
  test(`Check price for ${product.testName}`, async ({ page }) => {
    // Instantiate the Page Object
    const amazon = new AmazonPage(page);
    
    // 1. Go to the URL
    await page.goto(product.url);
    
    // 2. Use the Page Object to search (passing data from JSON)
    await amazon.searchProduct(product.searchQuery);
    
    // 3. Use the Page Object to get the price
    const currentPrice = await amazon.getFirstProductPrice();
    console.log(`${product.testName} is currently ₹${currentPrice}`);
    
    // 4. Playwright Assertion
    expect(currentPrice).toBeLessThanOrEqual(product.maxPriceThreshold);
  });
}