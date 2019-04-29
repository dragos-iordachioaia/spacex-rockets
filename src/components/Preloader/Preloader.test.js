import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import Preloader from "./Preloader";

describe("Preloader component", () => {
  it("renders ", () => {
    const wrapper = shallow(<Preloader />);
    expect(wrapper.find(".preloader").exists()).toBe(true);
  });
});
