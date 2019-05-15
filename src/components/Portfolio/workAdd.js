import React, { Component } from "react";
import Nav2 from "../home/nav2";
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
    // this.handleFileUpload = this.handleFileUpload.bind(this);
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
  // handleFileUpload(e) {
  //   this.setState({ file: e.target.files });
  //   console.log(e.target);
  // }
  // submitFile = event => {
  //   event.preventDefault();
  //   console.log("hitt");
  //   const formData = new FormData();
  //   formData.append("file", this.state.file[0]);
  //   axios
  //     .post("/auth/picture", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data"
  //       }
  //     })
  //     .then(response => {
  //       console.log(response);
  //       this.setState(
  //         {
  //           img: response.data.Location
  //         },
  //         () => this.handleSubmit()
  //       );
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };
  render() {
    // console.log(response.data.Location);
    return (
      <div>
        <Nav2 />

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
            <Link to="/auth/portfolio">
              <button className={styles.post} onClick={this.handleSubmit}>
                POST
              </button>
            </Link>
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
