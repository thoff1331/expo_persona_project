import React, { Component } from "react";
import { Link } from "react-router-dom";
import Artists from "../discover/artists";
import Nav2 from "../home/nav2";
// import styles from "./discover.module.scss";
import styles from "./discover.module.scss";

import Axios from "axios";

export class discover extends Component {
  constructor() {
    super();
    this.state = {
      works: []
    };
    this.addLike = this.addLike.bind(this);
  }
  componentDidMount() {
    Axios.get("/auth/discover").then(res => {
      this.setState({
        works: res.data
      });
    });
  }
  addLike(id) {
    Axios.get(`/auth/addLike/${id}`).then(res => {
      console.log("hitt");
      this.setState({
        works: res.data
      });
      //  window.location.reload();
    });
  }

  render() {
    console.log(this.state.works);
    let mapped = this.state.works.map((val, index) => {
      return (
        <div className={styles.links} key={index}>
          <img src={val.img} />
          <h3> title: {val.title}</h3>
          <h3> artist: {val.artist}</h3>
          <h3> date: {val.date}</h3>
          <h3>Likes: {val.likes}</h3>
          <h1 onClick={e => this.addLike(val.portfolio_id)}>🔥</h1>
        </div>
      );
    });

    return (
      <div>
        <Nav2 />
        <div className={styles.bar}>
          <Link className={styles.linkto} to="/discover">
            <button className={styles.button}>Works</button>
          </Link>
          <Link className={styles.linkto} to="/auth/creatorsLogged">
            <button className={styles.button}>Artists</button>
          </Link>
        </div>
        {mapped}
      </div>
    );
  }
}

export default discover;
