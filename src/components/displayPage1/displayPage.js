import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { checkUser, updateUser } from "../../ducks/userInfo";
import axios from "axios";
import { tsConstructorType } from "@babel/types";

export class displayPage extends Component {
  constructor() {
    super();
    this.state = {
      displayPage: []
    };
  }
  componentDidMount() {
    this.props.updateUser();
    this.props.checkUser();
    //Make a new action that will update the values in redux
    //Import that function
    //Put it in the connect
    //Calling that function here
    // });
  }
  render() {
    console.log(this.state.displayPage);
    console.log(this.props.img);
    return (
      <div>
        <img src={this.state.img} />
        <label>
          <h1> {this.props.name}</h1>
        </label>
        <h3> {this.props.bio}</h3>
        <h3> {this.props.medium}</h3>
        <Link to="/">
          <button>Log Out</button>
        </Link>
      </div>
    );
  }
}

const mapStateProps = reduxState => {
  console.log(reduxState.userInfo);
  return {
    img: reduxState.userInfo.img,
    name: reduxState.userInfo.name,
    bio: reduxState.userInfo.bio,
    medium: reduxState.userInfo.medium
  };
};

export default connect(
  mapStateProps,
  { updateUser, checkUser }
)(displayPage);
