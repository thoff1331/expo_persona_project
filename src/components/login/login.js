import React, { Component } from "react";
import { Link } from "react-router-dom";

export class login extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <header className="title">Expo</header>
        </Link>
        <h1>Signup</h1>
        <h1>Login</h1>
      </div>
    );
  }
}

export default login;
