const BasePage = require('./base.page');

class SearchPage extends BasePage {
    
          get sortDropdown() { return $('#s-result-sort-select'); }

          get firstProduct() {
            // Locator for the first product in the search results
            return $('div.s-main-slot div[data-component-type="s-search-result"] h2 a');
        }
        get iphoneAddToCartButton() {
            return $('(//input[@id="add-to-cart-button"])[2]');
        }
        get productPrices() {
            return $$('span.a-price-whole'); // Selector for the price elements
        }
    
        get productLinks() {
            return $$('div.s-main-slot div[data-component-type="s-search-result"] h2 a'); // Selector for the product links
        }
    
        async findLowestPricedProduct() {
            const priceElements = await this.productPrices;
            const prices = [];
            const priceToLinkMap = {};
    
            // Extract prices and associate them with product links
            for (let i = 0; i < priceElements.length; i++) {
                const priceElement = priceElements[i];
                const priceText = await priceElement.getText();
                const price = parseFloat(priceText.replace(/[^0-9.]/g, '')); // Remove non-numeric characters
    
                prices.push(price);
                priceToLinkMap[price] = this.productLinks[i]; // Map price to its corresponding product link
            }
    
            // Find the minimum price
            const minPrice = Math.min(...prices);
            console.log('Lowest price found:', minPrice);
    
            // Return the link to the lowest-priced product
            return priceToLinkMap[minPrice];
        }
    
        async clickLowestPricedProduct() {
            // Find the lowest-priced product link
            const lowestPricedProductLink = await this.findLowestPricedProduct();
    
            if (lowestPricedProductLink) {
                // Wait for the link to be displayed and click it
                await lowestPricedProductLink.waitForDisplayed({ timeout: 10000 });
                await lowestPricedProductLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
                await lowestPricedProductLink.click();
                console.log('Clicked the lowest-priced product.');
            
            } else {
                throw new Error('Lowest-priced product link not found.');
            }
        }
    // Sort results by 'Price: Low to High'
    async sortResults(sortOption) {
        await this.sortDropdown.selectByVisibleText(sortOption);
    }
    async clickFirstProduct() {
        // Wait for the first product to be displayed
        await this.firstProduct.waitForDisplayed({ timeout: 10000 });
        // Click on the first product
        await this.firstProduct.click();
    }
    async addtocartiphone(){
     // Try to scroll to and click the second 'Add to Cart' button
        const addToCartButton = await $('(//input[@id="add-to-cart-button"])[2]');
        await addToCartButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await addToCartButton.click();
    
    
    }
}


module.exports = new SearchPage();
