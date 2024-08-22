Feature: Search and add products to cart

  Scenario: Search and add products to cart
    Given I am on the Amazon homepage
    When I navigate to the Mobiles section
    And I search for "Mobilephone with 4GB internalstorage"
    And I add the lowest priced product to the cart
    And I clear the search box and search for "iPhone 13"
    And I sort results by "Price: Low to High"
    Then I should see the items in the cart

