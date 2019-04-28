import React, { Component } from "react";
import moment from "moment";

export default class LaunchDetails extends Component {
  render() {
    const { launch } = this.props;

    return (
      <>
        <li>{moment(launch.launch_date_utc).format("LL")}</li>
        <li>{launch.rocket.rocket_name}</li>
        <li>{launch.launch_site.site_name_long}</li>
        <li>{launch.details}</li>
      </>
    );
  }
}
