import React, { Component } from "react";
import LaunchDetails from "../LaunchDetails/LaunchDetails";

export default class LaunchList extends Component {
  constructor(props) {
    super(props);
    this.displayLaunches = this.displayLaunches.bind(this);
  }

  displayLaunches() {
    if (!this.props.launches) {
      return null;
    }
    return this.props.launches.map((launch, index) => {
      return <LaunchDetails key={launch.flight_number} launch={launch} />;
    });
  }

  render() {
    return <ul>{this.displayLaunches()}</ul>;
  }
}
