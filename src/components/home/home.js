import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";

export class home extends Component {
  render() {
    return (
      <div>
        <nav>
          <Link to="/">
            <header className="title">Expo</header>
          </Link>
        </nav>
        <section>
          <nav className="nav-bar">
            <ul>
              <Link to="/discover">
                <li>Discover</li>
              </Link>
              <Link to="/signup">
                <li>Sign Up</li>
              </Link>
            </ul>
          </nav>
        </section>
      </div>
    );
  }
}

export default home;
