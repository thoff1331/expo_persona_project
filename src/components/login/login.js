import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../ducks/auth";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.username);
    console.log(this.state.password);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props
      .login(this.state.username, this.state.password)

      .then(res => {
        this.props.history.push("/auth/displayPage");
      })
      .catch(err => {
        console.log(err);
        alert("incorrect!!!");
      });
    this.setState({ username: "", password: "" });
  }

  render() {
    //this needs to be changed
    if (this.props.auth.username) {
      //this needs to be redirect somewhere else
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <label>
            <input
              placeholder="USERNAME"
              onChange={this.handleChange}
              value={this.state.username}
              name="username"
            />
          </label>

          <label>
            <input
              placeholder="PASSWORD"
              onChange={this.handleChange}
              value={this.state.password}
              name="password"
            />
          </label>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(
  mapStateToProps,
  { login }
)(Login);
