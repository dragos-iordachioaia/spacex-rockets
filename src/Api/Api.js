import axios from "axios";

const rocketsURL = "https://api.spacexdata.com/v2/rockets";
const launchesURL = "https://api.spacexdata.com/v2/launches";

export function fetchRocketList() {
  console.log("Rockets request");
  const timeBefore = Date.now();
  return axios.get(rocketsURL).finally(() => {
    const timeAfter = Date.now();
    const delta = timeAfter - timeBefore;
    console.log("Rockets response latency", delta, "ms");
  });
}

export function fetchLaunchesList(year, rocketId) {
  console.log("Launches request");
  const timeBefore = Date.now();
  return axios
    .get(`${launchesURL}/?launch_year=${year}&rocket_id=${rocketId}`)
    .finally(() => {
      const timeAfter = Date.now();
      const delta = timeAfter - timeBefore;
      console.log("Launches response latency", delta, "ms");
    });
}
