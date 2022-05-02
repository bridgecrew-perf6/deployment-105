const { Given, When, Then } = require('@wdio/cucumber-framework');
const pauseTime = 0;

// browser.url - navigate to a page/url
// browser.pause - pause execution for a number of ms
// $ - grab an element
// element: click, setValue

Given('that I can see the login button', async () => {
    await browser.url('/');
    await browser.pause(pauseTime)
});

When('I click the login button at the navbar', async () => {
    let grab_login_button = await $('.login');
    await grab_login_button.click();
    await browser.pause(pauseTime)
});
When('I should be seen Login form', async () => {
    let login_form = await $('.loginModal');
    await login_form.waitForDisplayed(pauseTime);
    await browser.pause(pauseTime)
});

When(/^I fill in the form with "(.*)" and "(.*)"$/, async (email, password) => {
    let email_login_box = await $('form[name="login"] input[name="email"]');
    let password_login_box = await $('form[name="login"] input[name="password"]');
    await email_login_box.setValue(email);
    await email_login_box.waitForDisplayed(pauseTime);
    await password_login_box.setValue(password);
    await password_login_box.waitForDisplayed(pauseTime);
    await browser.pause(pauseTime)
});
When('I click the login button in the form', async () => {
    let login_button = await $('form[name="login"] button[name="login"]');
    await login_button.waitForDisplayed(pauseTime);
    await login_button.click();
    await browser.pause(pauseTime)
    await browser.url('/');
});

Then('I should be logged in and see logout button', async () => {
    let logout_button = await $('.navButtons .logout');
    await logout_button.waitForDisplayed(pauseTime);
    await browser.pause(pauseTime)
    await browser.url('/');
});