import React, { Component } from "react";

import * as Api from "./Api/Api";
import LaunchList from "./components/LaunchList/LaunchList";

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
      errorLaunches: null,
      loadingLaunches: false
    };
    this.displayContent = this.displayContent.bind(this);
    this.displayLaunchList = this.displayLaunchList.bind(this);
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
          pending: false,
          errorRockets: true
        });
      }
    );
  }

  handleChange(e) {
    this.setState({
      selectedOption: e.target.value
    });
  }

  onInputChange(e) {
    this.setState({
      yearLaunch: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({
      loadingLaunches: true
    });
    Api.fetchLaunchesList(
      this.state.yearLaunch,
      this.state.selectedOption
    ).then(
      response => {
        this.setState({
          launches: response.data,
          loadingLaunches: false
        });
      },
      error => {
        this.setState({
          errorLaunches: true,
          loadingLaunches: false
        });
      }
    );
  }

  displayLaunchList() {
    if (this.state.loadingLaunches) {
      return <p>Loading...</p>;
    }

    if (this.state.errorLaunches) {
      return (
        <p className="launches-error">
          Sorry, we've encountered an error while fetching the launch list
        </p>
      );
    }

    return <LaunchList launches={this.state.launches} />;
  }

  displayRocketList() {
    if (!this.state.options) {
      return null;
    }

    let options = this.state.options.map(option => {
      return (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      );
    });

    return (
      <select
        className="rocket-dropdown"
        value={this.state.selectedOption}
        onChange={this.handleChange}
      >
        {options}
      </select>
    );
  }

  displayContent() {
    if (this.state.pending) {
      return <p className="preloader">Loading...</p>;
    }

    const { selectedOption } = this.state;
    if (this.state.errorRockets) {
      return (
        <p className="rockets-error">
          Sorry, we've encountered an error while fetching the rocket list
        </p>
      );
    }
    return (
      <div className="content">
        <form onSubmit={this.onSubmit}>
          {this.displayRocketList()}
          <input
            className="year"
            value={this.state.yearLaunch}
            onChange={this.onInputChange}
          />
          <button className="submit">Submit</button>
        </form>
        {this.displayLaunchList()}
      </div>
    );
  }

  render() {
    return <div className="App"> {this.displayContent()}</div>;
  }
}
