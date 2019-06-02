import React, { Component } from "react";
import { connect } from "react-redux";
import { addWork, deleteWork } from "../../ducks/portfoliolist";
import axios from "axios";
import styles from "./portfolio.module.scss";
import { displayPage } from "../displayPage1/displayPage";
import { Link } from "react-router-dom";
import Home from "../home/home";

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
      showInput: false,
      editForm: false,
      file: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.editPortfolio = this.editPortfolio.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }
  editPortfolio() {
    axios
      .put("/api/portfolio", {
        img: this.state.img,

        title: this.state.title,
        artist: this.state.artist,
        date: this.state.date,
        description: this.state.description
      })
      .then(res => {
        this.setState({
          displayWork: res.data
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
  editWork = () => {
    this.setState({});
  };
  handleFileUpload(e) {
    this.setState({ file: e.target.files });
  }
  submitFile = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file[0]);
    axios
      .post("/auth/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        this.setState(
          {
            img: response.data.Location
          },
          () => this.editPortfolio()
        );
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const mapped = this.props.works.map((val, index) => {
      return (
        <div key={index} className={styles.background}>
          <div className={styles.works}>
            <img src={val.img} />
            <h1>Title: {val.title}</h1>
            <h1>Artist: {val.artist}</h1>
            <h1>Date: {val.date}</h1>
            <h1>Description: {val.description}</h1>
            <button onClick={() => this.props.deleteWork(val.portfolio_id)}>
              X
            </button>
          </div>
        </div>
      );
    });
    return (
      <div>
        <Home />
        <nav className={styles.addWork}>
          <Link className={styles.Link} to="/auth/displayPage">
            <h1 className={styles.navButtons}>PROFILE</h1>
          </Link>
          <Link className={styles.Link} to="/auth/portfolio/add">
            <h1 className={styles.navButtons}>ADD</h1>
          </Link>
        </nav>
        <div
          onSubmit={this.handleSubmit}
          autoComplete="off"
          className={styles.workForm}
        >
          <h1 className={styles.portfolio}>Portfolio</h1>
          <div className={styles.workInputParent}> </div>
        </div>

        {mapped}
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
  { deleteWork }
)(portfolio);
