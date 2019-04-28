import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import * as Api from "./Api/Api";
import App from "./App";

const reactDropdownSelector = node => {
  let className = node.prop("className");
  return className === "rocket-dropdown";
};

let wrapper;

describe("App component", () => {
  beforeEach(() => {
    wrapper = shallow(<App />);
    wrapper.setState({
      pending: false
    });
  });

  it("shows a preloader if the content is not ready to display", () => {
    wrapper.setState({
      pending: true
    });
    expect(wrapper.find(".preloader").exists()).toBe(true);
  });

  it("hides the preloader", async () => {
    const mockFetchRocketList = jest.fn().mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({
          data: [
            {
              id: "falcon1",
              name: "Falcon 1"
            }
          ]
        });
      })
    );
    const instance = wrapper.instance();
    instance.componentDidMount();
    await new Promise(resolve => {
      resolve();
    });
    console.log(wrapper.state());
    console.log(wrapper.props());
    expect(wrapper.find(".preloader").exists()).toBe(false);
  });

  it("shows the selector component", () => {
    expect(wrapper.findWhere(reactDropdownSelector).exists()).toBe(true);
  });

  it("selects a rocket", () => {
    wrapper
      .findWhere(reactDropdownSelector)
      .simulate("change", { value: "falcon1", label: "Falcon 1" });
    expect(wrapper.findWhere(reactDropdownSelector).prop("value")).toEqual({
      value: "falcon1",
      label: "Falcon 1"
    });
  });

  it("the year input works", () => {
    wrapper
      .find(".content .year")
      .simulate("change", { target: { value: "2006" } });
    expect(wrapper.find(".year").prop("value")).toEqual("2006");
  });

  it("submits the form and handles the response", async () => {
    const mockFetchLaunches = jest.fn().mockReturnValue(
      new Promise((resolve, reject) => {
        resolve({
          data: [
            {
              id: "falcon1",
              name: "Falcon 1"
            }
          ]
        });
      })
    );
    Api.fetchLaunchesList = mockFetchLaunches;
    wrapper
      .findWhere(reactDropdownSelector)
      .simulate("change", { value: "falcon1", label: "Falcon 1" });
    wrapper.find(".submit").simulate("click");
    await new Promise(resolve => resolve());

    expect(wrapper.find("LaunchList").prop("launches")).toEqual([
      {
        id: "falcon1",
        name: "Falcon 1"
      }
    ]);
  });
});
