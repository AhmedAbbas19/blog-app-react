import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./latest-blogs.css";
import { connect } from "react-redux";
import { fetchLatestBlogs, sanitizeHtml } from "../../../actions/blogActions";

class LatestBlogs extends Component {
  componentDidMount() {
    this.props.fetchLatestBlogs(4, 110);
  }
  getDateString(blogDate) {
    let date = new Date(blogDate);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
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
                      {this.getDateString(blog.createdAt)}
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
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    blogs: state.blogs.latestItems,
  };
}
export default connect(mapStateToProps, { fetchLatestBlogs })(LatestBlogs);
