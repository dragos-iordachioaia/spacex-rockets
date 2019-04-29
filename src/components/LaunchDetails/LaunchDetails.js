import React, { Component } from "react";
import moment from "moment";

export default class LaunchDetails extends Component {
  render() {
    const { launch } = this.props;

    return (
      <li>
        <p className="launch-date">
          {moment(launch.launch_date_utc).format("LL")}
        </p>
        <p className="rocket-name">{launch.rocket.rocket_name}</p>
        <p className="launch-site">{launch.launch_site.site_name_long}</p>
        <p className="launch-details">{launch.details}</p>
      </li>
    );
  }
}
