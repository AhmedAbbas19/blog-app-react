import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./single-blog.css";
import { connect } from "react-redux";
import { getDateString } from "../../../actions/blogActions";
import axios from "axios";

class SingleBlog extends Component {
  state = {
    blog: {},
    loaded: false,
  };
  componentDidMount() {
    const slug = this.props.match.params.slug;
    let blog = this.props.blogs.find((b) => b.slug === slug);
    if (!blog) {
      axios.get("http://localhost:4200/blogs/slug/" + slug).then((res) => {
        blog = res.data;
        this.setState({ blog, loaded: true });
      });
    } else {
      this.setState({ blog, loaded: true });
    }
  }

  render() {
    const { blog, loaded } = this.state;
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
    if (!blog) {
      return <Redirect to="/not-found" />;
    }
    return (
      <article className="single-blog">
        <div className="container-narrow">
          <div className="blog-header">
            <h2 className="blog-title">{blog.title}</h2>
            <div className="blog-author">
              <img
                src={blog.author.imageUrl || "/imgs/anonymous-user.png"}
                alt=""
                className="thumb"
              />
              <Link
                to={`/profile/${blog.author.username}`}
                className="author-name"
              >
                {blog.author.fname} {blog.author.lname}
              </Link>
              <span className="blog-date">
                ON {getDateString(blog.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="blog-img">
          <img src={blog.imageUrl} alt="" />
        </div>
        <div className="container-narrow">
          <div className="blog-body">
            <div dangerouslySetInnerHTML={{ __html: blog.body }} />
          </div>
          <div className="blog-tags">
            {blog.tags.length ? <h3>Tags</h3> : ``}
            <ul>
              {blog.tags.map((tag) => (
                <li key={tag}>
                  <Link to={`/tags?title=${tag}`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    );
  }
}

function mapStateToProps(state) {
  return {
    blogs: state.blogs.hotItems.concat(state.blogs.latestItems),
  };
}

export default connect(mapStateToProps)(SingleBlog);
