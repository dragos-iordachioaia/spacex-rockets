import React, { Component } from "react";
import moment from "moment";

import "./LaunchDetails.scss";

export default class LaunchDetails extends Component {
  render() {
    const { launch } = this.props;

    return (
      <li className="launch-item">
        <p className="launch-date">
          <b>Launch Date: </b> {moment(launch.launch_date_utc).format("LL")}
        </p>
        <p className="rocket-name">
          <b>Rocket name: </b>
          {launch.rocket.rocket_name}
        </p>
        <p className="launch-site">
          <b>Launch Site: </b>
          {launch.launch_site.site_name_long}
        </p>
        <p className="launch-details">
          <b>Details: </b>
          {launch.details}
        </p>
      </li>
    );
  }
}
