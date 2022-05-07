const { Given, When, Then } = require('@wdio/cucumber-framework');
const pauseTime = 0;

// browser.url - navigate to a page/url
// browser.pause - pause execution for a number of ms
// $ - grab an element
// element: click, setValue


Then('I click the logout button', async () => {
    let logout_button = await browser.$('.navButtons .logout');
    await logout_button.click();
    await browser.url('/');
});

Then('I should be logged out and should see the login button', async () => {
    let login_button = await $('.navButtons .login');
    await login_button.waitForDisplayed(pauseTime);
});