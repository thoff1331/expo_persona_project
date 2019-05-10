import React, { Component } from "react";
import { connect } from "react-redux";
import { addWork, deleteWork } from "../../ducks/portfoliolist";
import axios from "axios";
import styles from "./portfolio.module.scss";
import { displayPage } from "../displayPage1/displayPage";
import Home from "./../home/home";
import { Link } from "react-router-dom";

export class portfolio extends Component {
  constructor() {
    super();
    this.state = {
      img: "",
      title: "",
      artist: "",
      date: "",
      description: "",
      displayWork: [],
      showInput: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    axios.get("/api/portfolio").then(res => {
      this.setState({
        displayWork: res.data
      });
    });
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
    this.setState({
      img: "",
      title: "",
      artist: "",
      date: "",
      description: ""
    });
    this.handleClick();
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
    console.log(this.props);
    const mapped = this.props.works.map((val, index) => {
      return (
        <div className={styles.works}>
          <img src={val.img} />
          <h1>Title: {val.title}</h1>
          <h1>Artist: {val.artist}</h1>
          <h1>Date: {val.date}</h1>
          <h1>Description: {val.description}</h1>
          <button onClick={() => this.props.deleteWork(val.portfolio_id)}>
            X
          </button>
          <button onClick={this.handleClick}>Edit Work</button>
        </div>
      );
    });
    return (
      <div>
        <Home />
        <div
          onSubmit={this.handleSubmit}
          autoComplete="off"
          className={styles.workForm}
        >
          <Link to="/auth/displayPage">
            <button>Profile</button>
          </Link>
          <nav>
            <h1>Portfolio</h1>
          </nav>
          <label>Image</label>
          <input
            placeholder="Image"
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
          <button>POST</button>
          <div />
          {mapped}
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
  { addWork, deleteWork }
)(portfolio);
