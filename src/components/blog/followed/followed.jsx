import React, { Component } from "react";
import ListingBlogs from "../listing-blogs/listing-blogs";
import { fetchLatestBlogs } from "../../../actions/blogActions";
import { connect } from "react-redux";

class Followed extends Component {
  componentDidMount() {
    this.props.fetchLatestBlogs();
  }
  render() {
    const { blogs } = this.props;
    let filteredBlogs = [];
    const { activeUser } = this.props.auth;

    if (!blogs.length) {
      return (
        <div className="container text-center">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      );
    } else {
      filteredBlogs = blogs.filter((b) =>
        activeUser.followers.includes(b.author._id)
      );
    }
    return (
      <section className="categories-page">
        <div className="container">
          <ListingBlogs blogs={filteredBlogs} title="What followers say!" />
        </div>
      </section>
    );
  }
}
function mapStateToProps(state) {
  return {
    blogs: state.blogs.latestItems,
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { fetchLatestBlogs })(Followed);
