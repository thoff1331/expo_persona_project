import React, { Component } from "react";
import { Link } from "react-router-dom";

export class discover extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <header className="title">Expo</header>
        </Link>
        <h1>THIS IS WHERE THE WORKS WILL GO</h1>
      </div>
    );
  }
}

export default discover;
