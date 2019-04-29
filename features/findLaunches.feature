Feature: Search Rockets
  Background:
   Given The page has loaded

  Scenario: Display launches
    When I select "falcon9"
    And I type "2016" inside the input
    When I click the submit button
    Then I should see a list of launches for that rocket

  Scenario: Display message if there are no launches
    When I select "falcon9"
    And I type "1888" inside the input
    When I click the submit button
    Then I see an error message
