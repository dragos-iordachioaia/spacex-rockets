Feature: Search Rockets
  Scenario: Find launches
    When I select "falcon1"
    And I type "2006" inside the input
    When I click the submit button
    Then I should see a list of launches for that rocket
