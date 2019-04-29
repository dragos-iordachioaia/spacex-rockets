const { Given, When, Then } = require("cucumber");
const expect = require("chai").expect;

Given("The page has loaded", async function() {
  await this.page.goto("http://localhost:3000");
  await this.page.waitForSelector(".rocket-dropdown");
});

When("I select {string}", async function(rocketId) {
  await this.page.select(".rocket-dropdown", rocketId);
});

When("I type {string} inside the input", async function(year) {
  await this.page.focus("input.year");
  await this.page.keyboard.type(year);
});

When("I click the submit button", async function() {
  await this.page.click("button.submit");
});

Then("I should see a list of launches for that rocket", async function() {
  await this.page.waitForSelector(".launch-list");
});

Then("I see an error message", async function() {
  await this.page.waitForSelector(".no-launches-message");
});
