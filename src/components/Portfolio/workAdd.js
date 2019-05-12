import React, { Component } from "react";
import Home from "../home/home";
import { connect } from "react-redux";
import { addWork, deleteWork } from "../../ducks/portfoliolist";
import axios from "axios";
import styles from "./workAdd.module.scss";
import { displayPage } from "../displayPage1/displayPage";
import { Link } from "react-router-dom";
import { validate } from "@babel/types";

export class workAdd extends Component {
  constructor() {
    super();
    this.state = {
      img: "",
      title: "",
      artist: "",
      date: "",
      description: "",
      displayWork: [],
      showInput: true,
      editForm: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.editPortfolio = this.editPortfolio.bind(this);
  }
  handleSubmit(e) {
    this.props
      .addWork(
        this.state.img,
        this.state.title,
        this.state.artist,
        this.state.date,
        this.state.description
      )
      .then(res => {
        this.setState({
          displayWork: res.data,
          showInput: false
        });
      });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleClick(e) {
    if (!this.state.showInput) {
      this.setState({ showInput: true });
    } else {
      this.setState({ showInput: false });
    }
  }
  render() {
    return (
      <div>
        <Home />
        <p>Add WORK aND EDIT WORK</p>
        <div className={styles.workInputParent}>
          <div className={styles.workInput}>
            <label>Image</label>
            <input
              placeHolder="Image"
              onChange={this.handleChange}
              value={this.state.name}
              name="img"
            />
            <label>Title</label>
            <input
              placeholder="Title"
              onChange={this.handleChange}
              value={this.state.title}
              name="title"
            />
            <label>Artist</label>
            <input
              placeholder="Artist"
              onChange={this.handleChange}
              value={this.state.artist}
              name="artist"
            />
            <label>Date</label>
            <input
              placeholder="Date"
              onChange={this.handleChange}
              value={this.state.date}
              name="date"
            />
            <label>Description</label>
            <input
              placeholder="Description"
              onChange={this.handleChange}
              value={this.state.description}
              name="description"
            />
            <button onClick={this.handleClick} onClick={this.handleSubmit}>
              POST
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateProps = reduxState => {
  return {
    works: reduxState.portfoliolist.works
  };
};

export default connect(
  mapStateProps,
  { addWork }
)(workAdd);
