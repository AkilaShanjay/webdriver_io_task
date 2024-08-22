const { Given, When, Then } = require('@cucumber/cucumber');
const HomePage = require('../../pageobjects/home.page');
const SearchPage = require('../../pageobjects/search.page');
const CartPage = require('../../pageobjects/cart.page');

Given('I am on the Amazon homepage', async () => {
    await HomePage.open();
});

When('I navigate to the Mobiles section', async () => {
    await HomePage.goToMobiles();
});

When('I search for {string}', async (query) => {
    await HomePage.search(query);
});

When('I add the lowest priced product to the cart', async () => {
      await SearchPage.findLowestPricedProduct();
      await SearchPage.clickLowestPricedProduct();
   // await SearchPage.clickFirstProduct();
 });

When('I clear the search box and search for {string}', async (query) => {
    await HomePage.searchBox.clearValue();
    await HomePage.search(query);
});

When('I sort results by {string}', async (sortOption) => {
    await SearchPage.sortResults(sortOption);
    await SearchPage.clickFirstProduct();
    await SearchPage.addtocartiphone();
});

Then('I should see the items in the cart', async () => {
    await CartPage.openCart();
    const items = await CartPage.getCartItems();
    expect(items.length).toBeGreaterThan(0);
});

