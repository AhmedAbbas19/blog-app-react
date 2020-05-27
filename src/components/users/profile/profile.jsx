import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import "./profile.css";
import axios from "axios";
import ListingBlogs from "../../blog/listing-blogs/listing-blogs";
import { getDateString } from "../../../actions/blogActions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../../config";
import { LinearProgress } from "@material-ui/core";

class Profile extends Component {
  state = {
    user: {},
    loaded: false,
  };

  componentDidMount() {
    const username = this.props.match.params.username;
    axios.get(`${BACKEND_URL}/users/${username}`).then((res) => {
      const user = res.data;
      if (
        this.props.auth.activeUser.followers.includes(user._id) ||
        this.props.auth.activeUser.username === username
      ) {
        this.setState({ user, loaded: true });
      } else {
        toast.error(`Follow ${user.fname} to see the profile`);
        this.props.history.push("/");
      }
    });
  }
  render() {
    const { user, loaded } = this.state;
    if (!loaded) {
      return <LinearProgress color="secondary" />;
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

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps, {})(Profile);
