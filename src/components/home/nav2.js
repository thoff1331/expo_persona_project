import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.scss";
import { connect } from "react-redux";
import { logout } from "../../ducks/auth";
import Axios from "axios";
import logo from "./../../components/pics/logo.png";
export class home extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true
    };
    this.logout = this.logout.bind(this);
  }
  logout() {
    this.props.logout().then(res => {
      this.setState({
        loggedIn: false
      });
    });
  }

  //   Axios.get("/auth/logout").then(res => {
  //     this.setState({
  //       loggedIn: false
  //     });
  //   });
  // }
  render() {
    console.log(this.state.loggedIn);
    return (
      <div className={styles.title}>
        <div className={styles.logo}>
          <Link to="/">
            <img className={styles.logo} src={logo} />
          </Link>
        </div>
        <nav className={styles.navbarMain}>
          <ul className={styles.navList}>
            <Link to="/discover">
              <li>Discover</li>
            </Link>

            <Link to="/auth/displayPage">
              <li className={styles.title}>My Profile</li>
            </Link>
            <Link to="/auth/portfolio">
              <li className={styles.title}>My Works</li>
            </Link>
            <Link to="/auth/portfolio/add">
              <li>ADD</li>
            </Link>
            <Link to="/">
              <li onClick={this.logout}>Log Out</li>
              {/* edit look of this li */}
            </Link>
          </ul>
        </nav>
      </div>
    );
  }
}
const mapStateProps = reduxState => reduxState;
export default connect(
  mapStateProps,
  { logout }
)(home);
