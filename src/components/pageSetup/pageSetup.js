import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../../ducks/userInfo";
import axios from "axios";

export class pageSetup extends Component {
  constructor() {
    super();
    this.state = {
      img: "",
      name: "",
      bio: "",
      medium: ""
      // displayPage: [] // this edit correct?
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    axios.get("/auth/displayPage").then(res => {
      this.setState({
        displayPage: res.data
      });
    });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    // e.preventDefault();
    this.props.updateUser(
      this.state.img,
      this.state.name,
      this.state.bio,
      this.state.medium
    );
    this.props.history.push("/auth/displayPage");
  }
  render() {
    console.log(
      this.state.img,
      this.state.name,
      this.state.bio,
      this.state.medium
    );
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Profile Image"
            onChange={this.handleChange}
            value={this.state.img}
            name="img"
          />
          <input
            placeholder="Name"
            onChange={this.handleChange}
            value={this.state.name}
            name="name"
          />
          <textarea
            placeholder="Bio"
            onChange={this.handleChange}
            value={this.state.bio}
            name="bio"
          />
          <input
            placeholder="Medium"
            onChange={this.handleChange}
            value={this.state.medium}
            name="medium"
          />

          <button onClick={this.handleSubmit} type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
const mapStateProps = reduxState => reduxState;

export default connect(
  mapStateProps,
  { updateUser }
)(pageSetup);
