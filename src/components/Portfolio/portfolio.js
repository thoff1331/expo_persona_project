import React, { Component } from "react";
import { connect } from "react-redux";
import { addWork, deleteWork } from "../../ducks/portfoliolist";
import axios from "axios";
import styles from "./portfolio.module.scss";
import { displayPage } from "../displayPage1/displayPage";
import { Link } from "react-router-dom";
import Nav2 from "../home/nav2";

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
        console.log("hittem");
        this.setState({
          displayWork: res.data
        });
      });
  }

  // handleSubmit(e) {
  //   this.props
  //     .addWork(
  //       this.state.img,
  //       this.state.title,
  //       this.state.artist,
  //       this.state.date,
  //       this.state.description
  //     )
  //     .then(res => {
  //       this.setState({
  //         displayWork: res.data,
  //         showInput: false
  //       });
  //     });
  //  }

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
    console.log(e.target);
  }
  submitFile = event => {
    event.preventDefault();
    console.log("hitt");
    const formData = new FormData();
    formData.append("file", this.state.file[0]);
    axios
      .post("/auth/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(response);
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
    console.log(this.state.displayWork);
    const mapped = this.props.works.map((val, index) => {
      return (
        <div key={index}>
          <div className={styles.works}>
            <img className={styles.picture} src={val.img} />
            <h1>Title: {val.title}</h1>
            <h1>Artist: {val.artist}</h1>
            <h1>Date: {val.date}</h1>
            <h1>Description: {val.description}</h1>
            <button onClick={() => this.props.deleteWork(val.portfolio_id)}>
              X
            </button>
            <button onClick={this.editPortfolio(val.portfolio_id)}>
              Update
            </button>
            {/* <button onClick={this.editWork}>Edit Work</button> */}

            <form className={styles.editWork} onSubmit={this.submitFile}>
              <input
                name="img"
                onChange={this.handleFileUpload}
                // value={this.setState.img}
                autoComplete="off"
                placeholder="image"
                type="file"
              />
              <input
                name="title"
                onChange={this.handleChange}
                value={this.setState.title}
                autoComplete="off"
                placeholder="title"
              />
              <input
                name="artist"
                onChange={this.handleChange}
                value={this.setState.artist}
                autoComplete="off"
                placeholder="artist"
              />
              <input
                name="date"
                onChange={this.handleChange}
                value={this.setState.date}
                autoComplete="off"
                placeholder="date"
              />
              <input
                name="description"
                onChange={this.handleChange}
                value={this.setState.description}
                autoComplete="off"
                placeholder="description"
              />
            </form>
          </div>
        </div>
      );
    });
    return (
      <div>
        <Nav2 />
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
