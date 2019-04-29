import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import LaunchDetails from "./LaunchDetails";

describe("LaunchDetails component", () => {
  it("displays the right information", () => {
    const wrapper = shallow(
      <LaunchDetails
        launch={{
          launch_date_unix: 1143239400,
          details: "Engine failure at 33 seconds and loss of vehicle",
          rocket: {
            rocket_name: "Falcon 1"
          },
          launch_site: {
            site_name_long: "Kwajalein Atoll Omelek Island"
          }
        }}
      />
    );
    expect(wrapper.find(".launch-date").text()).toEqual("April 29, 2019");
    expect(wrapper.find(".launch-details").text()).toEqual(
      "Engine failure at 33 seconds and loss of vehicle"
    );
    expect(wrapper.find(".rocket-name").text()).toEqual("Falcon 1");
    expect(wrapper.find(".launch-site").text()).toEqual(
      "Kwajalein Atoll Omelek Island"
    );
  });
});
