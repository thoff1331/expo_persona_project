import React, { Component } from "react";
import { connect } from "react-redux";
import { checkUser, updateUser } from "../../ducks/userInfo";
import { getWork } from "../../ducks/portfoliolist";
import axios from "axios";
import styles from "./displayPage.module.scss";
import Home from "../home/home";
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
  }

  componentDidMount() {
    axios.get("/auth/displayInfo").then(res => {
      this.setState({
        displayPage: res.data
      });
    });
    this.props.getWork();
  }
  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/auth/displayPage", {
        img: this.state.img,
        name: this.state.name,
        bio: this.state.bio,
        medium: this.state.medium
      })
      .then(res => {
        this.setState({
          displayPage: res.data,
          showInput: false
        });
      });
    this.setState({
      img: " ",
      name: "",
      bio: "",
      medium: ""
    });
    this.handleClick();
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleClick = e => {
    if (!this.state.showInput) {
      this.setState({ showInput: true });
    } else {
      this.setState({ showInput: false });
    }
  };

  render() {
    console.log(this.state);
    const mapped = this.state.displayPage.map((val, index) => {
      return (
        <div className={styles.mainProfile}>
          <div className={styles.profilePicDiv}>
            <img className={styles.profilePic} src={val.img} />
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.buttons}>
              <button className={styles.navButtons} onClick={this.handleClick}>
                Edit Profile
              </button>
              <Link className={styles.linkto} to="/auth/portfolio">
                <button className={styles.navButtons}>Portfolio</button>
              </Link>
              <Link className={styles.linkto} to="/auth/portfolio/add">
                <button className={styles.navButtons}>Add Work</button>
              </Link>{" "}
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
            <div onSubmit={this.handleSubmit} className={styles.editForm}>
              <img src={this.state.img} className={styles.picEdit} />
              <form className="edit-profile-form" onSubmit={this.submitFile}>
                <label>Profile Pic</label>
                <input
                  onChange={this.handleChange}
                  name="img"
                  value={this.state.img}
                  autoComplete="off"
                  placeholder="Image Url"
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
              </form>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateProps = reduxState => {
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
