import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import "./single-blog.css";
import { connect } from "react-redux";
import {
  getDateString,
  deleteBlog,
  getBlogImageUrl,
} from "../../../actions/blogActions";
import axios from "axios";
import { toast } from "react-toastify";
import { followUser } from "../../../actions/userActions";
import { setAuthUser, authfollowers } from "../../../actions/authActions";
import { BACKEND_URL } from "../../../config";

class SingleBlog extends Component {
  state = {
    blog: {},
    loaded: false,
  };
  componentDidMount() {
    const slug = this.props.match.params.slug;
    let blog = this.props.blogs.find((b) => b.slug === slug);
    if (!blog) {
      axios.get(`${BACKEND_URL}/blogs/slug/${slug}`).then((res) => {
        blog = res.data;
        this.setState({ blog, loaded: true });
      });
    } else {
      this.setState({ blog, loaded: true });
    }
  }

  deleteMyBlog = (id) => {
    deleteBlog(id)
      .then((response) => {
        toast.success(response.data.message);
        this.props.history.push("/");
      })
      .catch((e) => {
        if (e.response) {
          toast.error(e.response.data.message);
        }
      });
  };

  followMe = (activeId, followerId, follow) => {
    followUser(activeId, followerId, follow)
      .then((res) => {
        toast.success(res.data.message);
        this.props.authfollowers(followerId, follow);
      })
      .catch((e) => {
        if (e.response) {
          console.log(e);
        }
      });
  };

  render() {
    const { blog, loaded } = this.state;
    const { auth } = this.props;

    if (!loaded) {
      return (
        <div className="container text-center">
          <div className="lds-ripple">
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
            <div className="blog-meta">
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
              <ul className="blog-control">
                {auth.activeUser && auth.activeUser._id === blog.author._id ? (
                  <Fragment>
                    <li className="icon-edit">
                      <Link className="link" to={`/edit-blog/${blog._id}`}>
                        <i className="far fa-edit"></i>
                      </Link>
                    </li>
                    <li className="icon-delete">
                      <span
                        className="link"
                        onClick={() => this.deleteMyBlog(blog._id)}
                      >
                        <i className="far fa-trash-alt"></i>
                      </span>
                    </li>
                  </Fragment>
                ) : auth.activeUser.followers ? (
                  auth.activeUser.followers.includes(blog.author._id) ? (
                    <button
                      className="btn btn-follow"
                      onClick={() =>
                        this.followMe(
                          auth.activeUser._id,
                          blog.author._id,
                          false
                        )
                      }
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="btn btn-follow"
                      onClick={() =>
                        this.followMe(
                          auth.activeUser._id,
                          blog.author._id,
                          true
                        )
                      }
                    >
                      Follow
                    </button>
                  )
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="blog-img">
          <img
            src={
              blog.image
                ? getBlogImageUrl(blog.image.data)
                : "/imgs/no-image.jpg"
            }
            alt=""
          />
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
    auth: state.auth,
  };
}

export default connect(mapStateToProps, {
  deleteBlog,
  followUser,
  setAuthUser,
  authfollowers,
})(SingleBlog);
