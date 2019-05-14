import React, { Component } from "react";
import { Link } from "react-router-dom";
import Artists from "../discover/artists";
import Nav2 from "../home/nav2";
import Home from "../home/home";
import styles from "./discover.module.scss";

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
        <div className={styles.links} key={index}>
          <img src={val.img} />
          <div className={styles.info}>
            <h3> title: {val.title}</h3>
            <h3> artist: {val.artist}</h3>
            <h3> date: {val.date}</h3>
            <h3>Likes: {val.likes}</h3>
          </div>
        </div>
      );
    });

    return (
      <div>
        <Home />
        {/* <h1>THIS IS WHERE THE WORKS WILL GO</h1> */}
        <div className={styles.creators}>
          <Link to="/discover0">
            <h1>Works</h1>
          </Link>
          <Link to="/auth/creators">
            <h1>Artists</h1>
          </Link>
        </div>
        {mapped}
      </div>
    );
  }
}

export default discover;
