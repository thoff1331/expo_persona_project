import React, { Component } from "react";
import { Link } from "react-router-dom";
import Artists from "../discover/artists";
import Nav2 from "../home/nav2";
import Home from "../home/home";
import styles from "./discover.module.scss";
import logo from "../pics/like.png";
import StripeBtn from "../Stripe.js";

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
        <div className={styles.kingDerek}>
          <div className={styles.derek} key={index}>
            <div className={styles.links}>
              <img src={val.img} />
              <div className={styles.info}>
                <h2> Title: {val.title}</h2>
                <h2> Artist: {val.artist}</h2>
                <h2> Date: {val.date}</h2>
                <h2 className={styles.emoji}>
                  Likes:
                  <h2 className={styles.circleButton}>{val.likes}</h2>
                </h2>
                <div className={styles.payButton}>
                  <StripeBtn />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <Home />
        {/* <h1>THIS IS WHERE THE WORKS WILL GO</h1> */}
        <div className={styles.creators}>
          <Link className={styles.linkto} to="/discover0">
            <button className={styles.button}>Works</button>
          </Link>
          <Link className={styles.linkto} to="/auth/creators">
            <button className={styles.button}>Artists</button>
          </Link>
        </div>
        <div className={styles.allMapped}>{mapped}</div>
      </div>
    );
  }
}

export default discover;
