import React, { Component } from "react";
import { Link } from "react-router-dom";
import Home from "../home/home";

import Axios from "axios";

export class artists extends Component {
  constructor() {
    super();
    this.state = {
      creators: []
    };
  }
  componentDidMount() {
    Axios.get("/auth/creators").then(res => {
      this.setState({
        creators: res.data
      });
    });
  }
  render() {
    console.log(this.state.creators);
    let mapped = this.state.creators.map((val, index) => {
      return (
        <div key={index}>
          <img src={val.img} />
          <h3>Artist: {val.name}</h3>
          <h3>Practice: {val.medium}</h3>
          {/* <h3>Bio: {val.bio}</h3> */}
        </div>
      );
    });
    return (
      <div>
        <Home />
        <p> List of Artists</p>
        <Link to="/discover">
          <h1>Works</h1>
        </Link>
        {mapped}
      </div>
    );
  }
}

export default artists;
