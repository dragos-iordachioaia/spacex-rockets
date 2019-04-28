import React from "react";
import axios from "axios";

const rocketsURL = "https://api.spacexdata.com/v2/rockets";
const launchesURL = "https://api.spacexdata.com/v2/launches";

export function fetchRocketList() {
  return axios.get(rocketsURL);
}

export function fetchLaunchesList(year, rocketId) {
  return axios.get(`${launchesURL}/?launch_year=${year}&rocket_id=${rocketId}`);
}
