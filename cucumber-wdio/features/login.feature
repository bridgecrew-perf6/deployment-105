Feature: Login
    As a user I want to be able to login
    so that I can buy products.

    Scenario: Clicking login button
        Given that I can see the login button
        When I click the login button at the navbar
        And I should be seen Login form
        When I fill in the form with "adam@gmail.com" and "12345678"
        And I click the login button in the form
        Then I should be logged in and see logout button
