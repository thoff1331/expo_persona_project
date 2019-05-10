import React, { Component } from "react";
import { connect } from "react-redux";
import { checkUser, updateUser } from "../../ducks/userInfo";
import { getWork } from "../../ducks/portfoliolist";
import axios from "axios";
import { tsConstructorType } from "@babel/types";
import styles from "./displayPage.module.scss";
import Home from "../home/home";
import Portfolio from "../Portfolio/portfolio";
import { Link } from "react-router-dom";

export class displayPage extends Component {
  constructor() {
    super();
    this.state = {
      img: "",
      name: "",
      bio: "",
      medium: "",
      displayPage: [],
      showInput: false
    };
    // this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("/auth/displayInfo").then(res => {
      console.log(res.data);
      this.setState({
        displayPage: res.data
      });
    });
    this.props.getWork();
  }
  handleSubmit(e) {
    console.log("hello");
    e.preventDefault();
    axios
      .post("/auth/displayPage", {
        //is this id or expo_id?

        img: this.state.img,
        name: this.state.name,
        bio: this.state.bio,
        medium: this.state.medium
      })
      .then(res => {
        console.log("hitt");
        this.setState({
          displayPage: res.data,
          showInput: false
        });
      });
    this.setState({
      img: "",
      name: "",
      bio: "",
      medium: ""
    });
    this.handleClick();
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleClick(e) {
    if (!this.state.showInput) {
      this.setState({ showInput: true });
    } else {
      this.setState({ showInput: false });
    }
  }
  render() {
    console.log(this.state.displayPage);
    // console.log(this.props.img);
    const mapped = this.state.displayPage.map((val, index) => {
      return (
        <div className={styles.mainProfile}>
          <img className={styles.profilePic} src={val.img} />
          <div className={styles.profileInfo}>
            <div className={styles.buttons}>
              <button className={styles.navButtons} onClick={this.handleClick}>
                Edit Profile
              </button>
              <Link to="/auth/portfolio">
                <button className={styles.navButtons}>Portfolio</button>
              </Link>
            </div>
            <h1>Artist:</h1>
            <p className={styles.name}>{val.name}</p>
            <h1>Practice:</h1>
            <p className={styles.name}>{val.medium}</p>
            <h1>Bio:</h1>
            <p className={styles.name}>{val.bio}</p>
          </div>
        </div>
      );
    });
    return (
      <div>
        <Home />
        <div>
          {mapped}
          {this.state.showInput ? (
            <div
              onSubmit={this.handleSubmit}
              className={styles.editForm}
              autoComplete="off"
            >
              <img src={this.state.img} className={styles.picEdit} />
              <label>Profile Pic</label>
              <input
                onChange={this.handleChange}
                name="img"
                value={this.state.img}
                autoComplete="off"
              />
              <label>Name</label>
              <input
                onChange={this.handleChange}
                name="name"
                value={this.state.name}
                autoComplete="off"
              />
              <label>Medium</label>
              <input
                onChange={this.handleChange}
                name="medium"
                value={this.state.medium}
                autoComplete="off"
              />
              <label>Bio</label>
              <textarea
                onChange={this.handleChange}
                name="bio"
                value={this.state.bio}
                autoComplete="off"
              />
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
          ) : null}
          {/* <Portfolio /> */}
        </div>
      </div>
    );
  }
}

const mapStateProps = reduxState => {
  // console.log(reduxState.userInfo);
  return {
    img: reduxState.userInfo.img,
    name: reduxState.userInfo.name,
    bio: reduxState.userInfo.bio,
    medium: reduxState.userInfo.medium
  };
};

export default connect(
  mapStateProps,
  { updateUser, checkUser, getWork }
)(displayPage);
