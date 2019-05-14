import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../ducks/auth";
import Home from "../home/home";
import styles from "../Signup/signup.module.scss";

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      button: false,
      redirect: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    this.props.signUp(
      this.state.username,
      this.state.email,
      this.state.password
    );
    this.setState({ button: true });
  };

  render() {
    if (this.state.button) {
      return <Redirect to="/auth/pageSetup" />;
    }
    return (
      <div className={styles.parent}>
        <div className={styles.bgRotate} />
        <Home />
        <div className={styles.div}>
          <form
            onSubmit={this.handleSubmit}
            autoComplete="off"
            className={styles.form}
          >
            <h1>-Sign Up-</h1>
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
                placeholder="EMAIL"
                onChange={this.handleChange}
                value={this.state.email}
                name="email"
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
            <Link to="/auth/displayPage" />
            <button className={styles.submit}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(
  mapStateToProps,
  { signUp }
)(Signup);
