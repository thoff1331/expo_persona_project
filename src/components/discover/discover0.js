import React, { Component } from "react";
import { Link } from "react-router-dom";
import Home from "../home/home";
import styles from "./discover.module.scss";
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
  addLike = id => {
    Axios.get(`/auth/addLike/${id}`).then(res => {
      this.setState({
        works: res.data
      });
    });
  };
  // pleaseLogIn = () => {
  //   if (!this.props.username) {
  //     alert("Please Log In");
  //   } else {
  //     this.addLike();
  //   }
  // };

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
                <h6 onClick={e => this.addLike(val.portfolio_id)}>🔥</h6>

                <h6 className={styles.circleButton}> {val.likes}</h6>

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
        <div className={styles.creators}>
          <Link className={styles.linkto} to="/discover0">
            <button className={styles.button}>Works</button>
          </Link>
          <Link className={styles.linkto} to="/auth/creators">
            <button className={styles.button}>Artists</button>
          </Link>
        </div>
        <Home />
        <div className={styles.allMapped}>{mapped}</div>
      </div>
    );
  }
}

export default discover;
