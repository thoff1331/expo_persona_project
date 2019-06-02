import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Home from "../home/home";
import styles from "../contactForm/contactForm.module.scss";

export default class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    let data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      message: this.state.message
    };

    axios.post("/api/contact", data).then(this.setState({ button: true }));
  }

  render() {
    if (this.state.button) {
      return <Redirect to="/" />;
    }
    return (
      <div className="contact-container">
        <div className={styles.parent}>
          <Home />
          <div className={styles.contact}>
            <div className={styles.formform}>
              <form autocomplete="off" onSubmit={this.handleSubmit}>
                <h1>Contact Us</h1>
                <input
                  placeholder="First Name"
                  onChange={this.handleChange}
                  value={this.state.first_name}
                  name="first_name"
                />
                <input
                  placeholder="Last Name"
                  onChange={this.handleChange}
                  value={this.state.last_name}
                  name="last_name"
                />
                <input
                  placeholder="Email Address"
                  onChange={this.handleChange}
                  value={this.state.email}
                  name="email"
                />
                <textarea
                  placeholder="Message"
                  onChange={this.handleChange}
                  value={this.state.message}
                  name="message"
                />
                <button>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
