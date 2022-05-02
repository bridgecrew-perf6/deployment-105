const { Given, When, Then } = require('@wdio/cucumber-framework');
const pauseTime = 0;

// browser.url - navigate to a page/url
// browser.pause - pause execution for a number of ms
// $ - grab an element
// element: click, setValue

Given('I am on the home page with product list', async () => {
    await browser.url('/');
    //await $('div#i101.productInList').click();
});

When(/^I click on the product title "(.*)"$/, async (text) => {
    let singleProduct = await $('#i101 h3');
    await singleProduct.click();
});

Then(/^I see page with product "(.*)" details$/, async (text) => {
    // get all the table cells in the first row of the table
    // that is the shoppingList/cart
    await $('.backButton').waitForExist();
    expect(await $('#i101')).toHaveTextContaining(text);
    await browser.pause(pauseTime);
});
