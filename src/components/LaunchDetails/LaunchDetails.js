import React, { Component } from "react";
import moment from "moment";

export default class LaunchDetails extends Component {
  render() {
    const { launch } = this.props;

    return (
      <li>
        <p>{moment(launch.launch_date_utc).format("LL")}</p>
        <p>{launch.rocket.rocket_name}</p>
        <p>{launch.launch_site.site_name_long}</p>
        <p>{launch.details}</p>
      </li>
    );
  }
}
