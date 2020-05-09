import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import "./profile.css";
import axios from "axios";
import ListingBlogs from "../../blog/listing-blogs/listing-blogs";
import { getDateString } from "../../../actions/blogActions";

export class Profile extends Component {
  state = {
    user: {},
    loaded: false,
  };

  componentDidMount() {
    const username = this.props.match.params.username;
    axios.get(`http://localhost:4200/users/${username}`).then((res) => {
      const user = res.data;
      this.setState({ user, loaded: true });
    });
  }

  render() {
    const { user, loaded } = this.state;
    if (!loaded) {
      return (
        <div className="container text-center">
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      );
    }
    if (!user) {
      return <Redirect to="/not-found" />;
    }
    return (
      <Fragment>
        <div className="profile">
          <div className="thumb">
            <img src={user.imageUrl || "/imgs/anonymous-user.png"} alt="" />
          </div>
          <div className="info-card">
            <div className="card-container">
              <h2 className="title">
                {user.fname} {user.lname}
              </h2>
              <span className="date">
                Joined {getDateString(user.createdAt) || "Unknown"}
              </span>
              <p className="paragraph">{user.about}</p>
              <button className="btn-follow">Follow</button>
            </div>
          </div>
        </div>
        <div className="container">
          <ListingBlogs blogs={user.blogs} title={`${user.fname}'s blogs`} />
        </div>
      </Fragment>
    );
  }
}
