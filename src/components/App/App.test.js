import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import * as Api from "../../Api/Api";
import App from "./App";

describe("App component", () => {
  let wrapper;
  const originalFetchRockets = Api.fetchRocketList;
  const originalFetchLaunches = Api.fetchLaunchesList;

  beforeEach(async () => {
    Api.fetchRocketList = originalFetchRockets;
    Api.fetchLaunchesList = originalFetchLaunches;
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
    Api.fetchRocketList = mockFetchRocketList;
    wrapper = shallow(<App />);
    await new Promise(resolve => resolve());
  });

  it("shows a preloader if the content is not ready to display", () => {
    wrapper.setState({
      pending: true
    });
    expect(wrapper.find("Preloader").exists()).toBe(true);
  });

  it("hides the preloader", async () => {
    expect(wrapper.find("Preloader").exists()).toBe(false);
  });

  it("handles the error on the '/rockets' call", async () => {
    const mockFetchRocketList = jest.fn().mockReturnValue(
      new Promise((resolve, reject) => {
        reject();
      })
    );
    Api.fetchRocketList = mockFetchRocketList;
    const instance = wrapper.instance();
    instance.componentDidMount();
    await new Promise(resolve => {
      resolve();
    });

    expect(wrapper.find(".rockets-error").exists()).toBe(true);
  });

  it("shows the rocket dropdown", async () => {
    const instance = wrapper.instance();
    instance.componentDidMount();

    expect(wrapper.find(".rocket-dropdown").exists()).toBe(true);
  });

  it("doesn't show the rocket dropdown if there aren't any options", () => {
    wrapper.setState({
      options: null
    });
    expect(wrapper.find(".rocket-dropdown").exists()).toBe(false);
  });

  it("selects a rocket", () => {
    wrapper
      .find(".rocket-dropdown")
      .simulate("change", { target: { value: "falcon1" } });
    expect(wrapper.find(".rocket-dropdown").prop("value")).toEqual("falcon1");
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
      .find(".rocket-dropdown")
      .simulate("change", { target: { value: "falcon1" } });
    wrapper
      .find(".content form")
      .simulate("submit", { preventDefault: jest.fn() });
    await new Promise(resolve => resolve());

    expect(wrapper.find("LaunchList").prop("launches")).toEqual([
      {
        id: "falcon1",
        name: "Falcon 1"
      }
    ]);
  });

  it("submits the form and handles the error", async () => {
    const mockFetchLaunches = jest.fn().mockReturnValue(
      new Promise((resolve, reject) => {
        reject();
      })
    );
    Api.fetchLaunchesList = mockFetchLaunches;
    wrapper
      .find(".rocket-dropdown")
      .simulate("change", { target: { value: "falcon1" } });
    wrapper
      .find(".content form")
      .simulate("submit", { preventDefault: jest.fn() });
    await new Promise(resolve => resolve());

    expect(wrapper.find(".launches-error").exists()).toBe(true);
  });
});
