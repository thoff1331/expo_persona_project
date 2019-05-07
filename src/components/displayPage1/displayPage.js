import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { checkUser, updateUser } from "../../ducks/userInfo";
import { logout } from "../../ducks/auth";
import axios from "axios";
import { tsConstructorType } from "@babel/types";

export class displayPage extends Component {
  constructor() {
    super();
    this.state = {
      displayPage: []
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount(id) {
    axios.get(`auth/displayInfo/${this.props.match.params.id}`).then(res => {
      console.log(res.data);
      this.setState({
        displayPage: res.data
      });
    });
  }
  logout() {
    console.log("hitt");
    this.props.logout();
  }
  render() {
    console.log(this.state.displayPage);
    // console.log(this.props.img);
    const mapped = this.state.displayPage.map((val, index) => {
      return (
        <div>
          <img src={val.img} />
          <h1>{val.name}</h1>
          <h1>{val.medium}</h1>
          <h1>{val.bio}</h1>
        </div>
      );
    });
    return (
      <div>
        <img src={this.state.img} />
        <label>
          <h1> {this.props.name}</h1>
        </label>
        <h3> {this.props.bio}</h3>
        <h3> {this.props.medium}</h3>
        <Link to="/">
          <button>Profile</button>
          <button onClick={this.logout}>Log Out</button>
        </Link>
        {mapped}
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
  { updateUser, checkUser, logout }
)(displayPage);
