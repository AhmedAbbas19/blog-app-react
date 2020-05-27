import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./hot-blogs.css";
import { connect } from "react-redux";
import {
  fetchHotBlogs,
  getDateString,
  getBlogImageUrl,
} from "../../../actions/blogActions";
import { capitalize } from "../../../actions/utilActions";
import { LinearProgress } from "@material-ui/core";

class HotBlogs extends Component {
  state = {
    blog: {
      title: "",
      image: "",
      category: "",
    },
  };
  componentDidMount() {
    this.props.fetchHotBlogs(0, 4);
  }
  render() {
    let [leftBlog, midBlog, rTopBlog, rBottomBlog] = this.props.blogs;
    if (!this.props.blogs.length) {
      return <LinearProgress color="secondary" />;
    }
    return (
      <section className="hot-blogs">
        <div
          className="blog left-blog sm-12"
          style={{
            backgroundImage: `url('${
              leftBlog.image
                ? getBlogImageUrl(leftBlog.image.data)
                : "/imgs/no-image.jpg"
            }')`,
          }}
        >
          <div className="layover"></div>
          <div className="info-card">
            {leftBlog.category ? (
              <Link
                className="category"
                to={`/categories?title=${leftBlog.category.title}`}
              >
                {capitalize(leftBlog.category.title)}
              </Link>
            ) : (
              <span className="category">Uncategorized</span>
            )}
            <Link className="title" to={`/blog/${leftBlog.slug}`}>
              {leftBlog.title}
            </Link>
            <Link
              className="author"
              to={`/profile/${leftBlog.author.username}`}
            >
              BY {leftBlog.author.fname} {leftBlog.author.lname}
            </Link>
            <Link className="date" to="">
              {getDateString(leftBlog.createdAt)}
            </Link>
          </div>
        </div>

        <div
          className="blog mid-blog sm-12"
          style={{
            backgroundImage: `url('${
              midBlog.image
                ? getBlogImageUrl(midBlog.image.data)
                : "/imgs/no-image.jpg"
            }')`,
          }}
        >
          <div className="layover"></div>
          <div className="info-card">
            {midBlog.category ? (
              <Link
                className="category"
                to={`/categories?title=${midBlog.category.title}`}
              >
                {capitalize(midBlog.category.title)}
              </Link>
            ) : (
              <span className="category">Uncategorized</span>
            )}
            <Link className="title" to={`/blog/${midBlog.slug}`}>
              {midBlog.title}
            </Link>
            <Link className="author" to={`/profile/${midBlog.author.username}`}>
              BY {midBlog.author.fname} {midBlog.author.lname}
            </Link>
            <Link className="date" to="">
              {getDateString(midBlog.createdAt)}
            </Link>
          </div>
        </div>

        <div className="right-blogs sm-12">
          <div
            className="blog right-top sm-12"
            style={{
              backgroundImage: `url('${
                rTopBlog.image
                  ? getBlogImageUrl(rTopBlog.image.data)
                  : "/imgs/no-image.jpg"
              }')`,
            }}
          >
            <div className="layover"></div>

            <div className="info-card">
              {rTopBlog.category ? (
                <Link
                  className="category"
                  to={`/categories?title=${rTopBlog.category.title}`}
                >
                  {capitalize(rTopBlog.category.title)}
                </Link>
              ) : (
                <span className="category">Uncategorized</span>
              )}
              <Link className="title" to={`/blog/${rTopBlog.slug}`}>
                {rTopBlog.title}
              </Link>
            </div>
          </div>
          <div
            className="blog right-bottom sm-12"
            style={{
              backgroundImage: `url('${
                rBottomBlog.image
                  ? getBlogImageUrl(rBottomBlog.image.data)
                  : "/imgs/no-image.jpg"
              }')`,
            }}
          >
            <div className="layover"></div>

            <div className="info-card">
              {rBottomBlog.category ? (
                <Link
                  className="category"
                  to={`/categories?title=${rBottomBlog.category.title}`}
                >
                  {capitalize(rBottomBlog.category.title)}
                </Link>
              ) : (
                <span className="category">Uncategorized</span>
              )}
              <Link className="title" to={`/blog/${rBottomBlog.slug}`}>
                {rBottomBlog.title}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    blogs: state.blogs.hotItems,
  };
}
export default connect(mapStateToProps, { fetchHotBlogs })(HotBlogs);
