const BasePage = require('./base.page');

class CartPage extends BasePage {
    get cartItems() { return $$('#sc-active-cart .sc-list-item-content'); }

    // Open the cart page
    async openCart() {
        await browser.url('https://www.amazon.in/gp/cart/view.html');
    }

    // Get the number of items in the cart
    async getCartItems() {
        const items = await this.cartItems; // Wait for cart items to be resolved
        return items; // Return the array of cart items
    }
}

module.exports = new CartPage();

