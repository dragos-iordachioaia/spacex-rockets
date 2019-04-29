import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import LaunchList from "./LaunchList";

describe("LaunchList component", () => {
  it("displays the launches", () => {
    const wrapper = shallow(
      <LaunchList
        launches={[
          {
            flight_number: 1
          },
          {
            flight_number: 2
          }
        ]}
      />
    );
    expect(wrapper.find("LaunchDetails").length).toEqual(2);
  });

  it("doesn't display the launches if there are none", () => {
    const wrapper = shallow(<LaunchList />);
    expect(wrapper.find("LaunchDetails").length).toEqual(0);
  });

  it("shows a message if the are no launches", () => {
    const wrapper = shallow(<LaunchList launches={[]} />);
    expect(wrapper.find(".no-launches-message").exists()).toBe(true);
    expect(wrapper.find("LaunchDetails").length).toEqual(0);
  });
});
