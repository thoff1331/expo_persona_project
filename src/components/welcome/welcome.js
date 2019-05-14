import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./../welcome/welcome.module.scss";
import Home from "../home/home";

export class welcome extends Component {
  render() {
    return (
      <div>
        <Home />
        <div className={styles.homediv}>
          <h1 className={styles.discover}>DISCOVER</h1>
          <h1 className={styles.share}>SHARE</h1>
          <h1 className={styles.create}>CREATE</h1>
          <h1 className={styles.change}>CHANGE</h1>
        </div>
      </div>
    );
  }
}

export default welcome;
