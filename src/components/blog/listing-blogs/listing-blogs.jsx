import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./listing-blogs.css";
import {
  getDateString,
  sanitizeHtml,
  getBlogImageUrl,
} from "../../../actions/blogActions";
import { capitalize } from "../../../actions/utilActions";

export default class ListingBlogs extends Component {
  render() {
    const { blogs, title } = this.props;
    return (
      <div className="list-blogs sm-12">
        <h2 className="heading">{capitalize(title)}</h2>
        {!blogs.length ? "No blogs to show!" : ""}
        {blogs.map((blog) => (
          <div className="blog" key={blog._id}>
            <div className="thumb sm-12">
              <img
                src={
                  blog.image
                    ? getBlogImageUrl(blog.image.data)
                    : "/imgs/no-image.jpg"
                }
                alt=""
              />
            </div>
            <div className="info-card sm-12">
              <div className="card-container">
                <Link className="title" to={`/blog/${blog.slug}`}>
                  {blog.title}
                </Link>
                <Link className="date" to="">
                  {getDateString(blog.createdAt)}
                </Link>
                {blog.author.fname ? (
                  <Link
                    className="author"
                    to={`/profile/${blog.author.username}`}
                  >
                    BY {blog.author.fname} {blog.author.lname}
                  </Link>
                ) : (
                  ""
                )}
                <p className="paragraph">
                  {sanitizeHtml(blog.body.slice(0, 170))}
                  {blog.body.length > 230 ? "..." : ""}
                </p>
                <Link className="read-more" to={`/blog/${blog.slug}`}>
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
