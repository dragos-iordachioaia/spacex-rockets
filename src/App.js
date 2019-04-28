import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";

import * as Api from "./Api/Api";
import LaunchList from "./components/LaunchList/LaunchList";

const rocketsURL = "https://api.spacexdata.com/v2/rockets";
const launchesURL = "https://api.spacexdata.com/v2/launches";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: true,
      options: null,
      selectedOption: null,
      yearLaunch: "",
      launches: null,
      errorRockets: null,
      errorLaunches: null
    };
    this.displayContent = this.displayContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    Api.fetchRocketList().then(
      response => {
        this.setState({
          pending: false,
          options: response.data.map(rocket => {
            return {
              value: rocket.id,
              label: rocket.name
            };
          })
        });
      },
      error => {
        this.setState({
          errorRockets: true
        });
      }
    );
  }

  handleChange(selectedOption) {
    this.setState({
      selectedOption
    });
  }

  onInputChange(e) {
    this.setState({
      yearLaunch: e.target.value
    });
  }

  onSubmit() {
    Api.fetchLaunchesList(
      this.state.yearLaunch,
      this.state.selectedOption.value
    ).then(
      response => {
        this.setState({
          launches: response.data
        });
      },
      error => {
        this.setState({
          errorLaunches: true
        });
      }
    );
  }

  displayContent() {
    if (this.state.pending) {
      return <p className="preloader">Loading...</p>;
    }

    const { selectedOption } = this.state;
    if (this.state.errorRockets === true) {
      return (
        <p>Sorry, we've encountered an error while fetching the rocket list</p>
      );
    }
    return (
      <div className="content">
        <Select
          className="rocket-dropdown"
          value={selectedOption}
          options={this.state.options}
          onChange={this.handleChange}
        />
        <input
          className="year"
          value={this.state.yearLaunch}
          onChange={this.onInputChange}
        />
        <button className="submit" onClick={this.onSubmit}>
          Submit
        </button>
        <LaunchList launches={this.state.launches} />
      </div>
    );
  }

  render() {
    return <div className="App"> {this.displayContent()}</div>;
  }
}
