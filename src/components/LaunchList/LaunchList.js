import React, { Component } from "react";
import LaunchDetails from "../LaunchDetails/LaunchDetails";

import "./LaunchList.scss";

export default class LaunchList extends Component {
  constructor(props) {
    super(props);
    this.displayLaunches = this.displayLaunches.bind(this);
  }

  displayLaunches() {
    return this.props.launches.map((launch, index) => {
      return <LaunchDetails key={launch.flight_number} launch={launch} />;
    });
  }

  render() {
    if (!this.props.launches) {
      return null;
    }
    return <ul className="launch-list">{this.displayLaunches()}</ul>;
  }
}
