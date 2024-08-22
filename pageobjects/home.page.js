const BasePage = require('./base.page');

class HomePage extends BasePage {
    get searchBox() { return $('#twotabsearchtextbox'); }
    get searchButton() { return $('#nav-search-submit-button'); }
    get mobilesLink() { return $('=Mobiles'); }

    // Open the homepage
    async open() {
        await super.open('https://www.amazon.in/');
    }

    // Search for a product
    async search(query) {
        await this.searchBox.setValue(query);
        await this.searchButton.click();
    }

    // Navigate to the Mobiles section
    async goToMobiles() {
        await this.mobilesLink.click();
    }

    // Clear the search box (added for completeness)
    async clearSearchBox() {
        await this.searchBox.clearValue();
    }
}

module.exports = new HomePage();

