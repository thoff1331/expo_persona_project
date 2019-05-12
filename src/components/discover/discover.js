import React, { Component } from "react";
import { Link } from "react-router-dom";
import Home from "../home/home";
import Axios from "axios";

export class discover extends Component {
  constructor() {
    super();
    this.state = {
      works: []
    };
  }
  componentDidMount() {
    Axios.get("/auth/discover").then(res => {
      this.setState({
        works: res.data
      });
    });
  }

  render() {
    let mapped = this.state.works.map((val, index) => {
      return (
        <div key={index}>
          <img src={val.img} />
          <h3> title: {val.title}</h3>
          <h3> artist: {val.artist}</h3>
          <h3> date: {val.date}</h3>
        </div>
      );
    });

    return (
      <div>
        <Home />
        <h1>THIS IS WHERE THE WORKS WILL GO</h1>
        {mapped}|
      </div>
    );
  }
}

export default discover;
