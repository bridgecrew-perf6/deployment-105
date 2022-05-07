const { Given, When, Then } = require('@wdio/cucumber-framework');
const pauseTime = 0;

// browser.url - navigate to a page/url
// browser.pause - pause execution for a number of ms
// $ - grab an element
// element: click, setValue

Given('that I can see the product list', async () => {
  await browser.url('/');
});

When(/^I click on the buy button for "(.*)"$/, async (productName) => {
  // grab all divs that have the class productInList
  let products = [];
  // since it can take a short while before the products are displayed
  // the need to be fetched from the db first, wait for it to products on the page...
  while (products.length === 0) {
    products = await $$('.productInList');
    await browser.pause(10);
  }
  // create an empty variable called foundProduct
  let foundProduct;
  // loop through all products divs
  for (let product of products) {
    // if we find the text in the divs includes the product name
    if ((await product.getText()).includes(productName)) {
      // then save the productDiv in foundProduct
      foundProduct = product;
    }
  }
  // check that we found a product
  expect(foundProduct).toBeTruthy();
  // grab the buyButton
  let buyButton = await foundProduct.$('.buyButton');
  // scroll the buyButton into view
  await buyButton.scrollIntoView();
  // click the buyButton
  await buyButton.click();
});

Then(/^(\d*) item of "(.*)" should be added to the cart$/, async (quantity, productName) => {
  // get all the table cells in the first row of the table
  // that is the shoppingList/cart
  let tds = await $$('.shoppingCart tr:first-child td');
  // check that we have the expected content in the cart
  await expect(tds[0]).toHaveText(quantity);
  await expect(tds[1]).toHaveText(productName);
  // mostly for humans - scroll to the shopping cart
  await tds[0].scrollIntoView();
  // pause before ending the step
  await browser.pause(pauseTime);
});



/* Then(/^(\d*) item of "(.*)" should be shown details $/, async (productName) => {
  // get all the table cells in the first row of the table
  // that is the shoppingList/cart
  // check that we have the expected content in the cart
  await expect(tds[1]).toHaveText(productName);
  // mostly for humans - scroll to the shopping cart
  await tds[0].scrollIntoView();
  // pause before ending the step
  await browser.pause(pauseTime);
}); */
