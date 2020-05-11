import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./latest-blogs.css";
import { connect } from "react-redux";
import {
  fetchLatestBlogs,
  fetchMoreLatestBlogs,
  sanitizeHtml,
  moveStart,
  getDateString,
} from "../../../actions/blogActions";

class LatestBlogs extends Component {
  componentDidMount() {
    if (this.props.blogs.length === 0) {
      this.props.fetchLatestBlogs(this.props.start, this.props.size);
      this.props.moveStart(this.props.start, this.props.size);
    } else {
      this.props.fetchLatestBlogs(4, this.props.start - 4);
    }
  }
  loadMore = () => {
    this.props.fetchMoreLatestBlogs(this.props.start, this.props.size);
    this.props.moveStart(this.props.start, this.props.size);
  };

  render() {
    const { blogs } = this.props;
    if (!blogs.length) {
      return (
        <div className="container text-center">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      );
    }
    return (
      <section className="latest-blogs">
        <div className="container">
          <h2 className="heading">Latest Blogs</h2>
          <div className="latest-items">
            {blogs.map((blog) => (
              <div className="item" key={blog._id}>
                <div className="blog">
                  <div className="thumb">
                    <img src={blog.imageUrl || "/imgs/quote.jpg"} alt="" />
                  </div>
                  <div className="info-card">
                    <Link to={`/blog/${blog.slug}`} className="title">
                      {blog.title.slice(0, 42)}
                      {blog.title.length > 42 ? "..." : ""}
                    </Link>
                    <Link to="" className="date">
                      {getDateString(blog.createdAt)}
                    </Link>
                    <Link
                      to={`/profile/${blog.author.username}`}
                      className="author"
                    >
                      BY {blog.author.fname} {blog.author.lname}
                    </Link>
                    <p className="paragraph">
                      {sanitizeHtml(blog.body.slice(0, 230))}
                      {blog.body.length > 230 ? "..." : ""}
                    </p>
                    <Link to={`/blog/${blog.slug}`} className="read-more">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn" onClick={this.loadMore}>
            Load More
          </button>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    blogs: state.blogs.latestItems,
    start: state.blogs.start,
    size: state.blogs.size,
  };
}
export default connect(mapStateToProps, {
  fetchLatestBlogs,
  fetchMoreLatestBlogs,
  moveStart,
})(LatestBlogs);
