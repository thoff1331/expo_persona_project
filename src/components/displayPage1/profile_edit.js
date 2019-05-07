import React, { Component } from "react";
import {Link} from "react-redux";
export class profile_edit extends Component {
  constructor() {
    super();
    this.state = {
      img: "",
      name: "",
      bio: "",
      medium: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    axios
      .put("/auth/displayPage/${expo_id}", {
        //is this id or expo_id?

        img: this.state.img,
        name: this.state.name,
        bio: this.state.bio,
        medium: this.state.medium
      })
      .then(res => {
        this.setState({
          displayPage: res.data
        });
      });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    let mappedProfile = this.state.displayPage.map((val, index) => {
      return (
        <div>
          <h1>img: {val.img}</h1>
          <h1>name: {val.name}</h1>
          <h1>bio: {val.bio}</h1>
          <h1>medium: {val.medium}</h1>
        </div>
      );
    });
    return <div className="user_info" />;
    {
      mappedProfile;
    }
    <button onClick={()=> this.setState({ showInput: true})}>Edit</button>;
    {this.state.showInput? (
        <form onSubmit={this.handleSubmit}
        autoComplete="off"
        ></form>
    )};
  }
}

export default profile_edit;
