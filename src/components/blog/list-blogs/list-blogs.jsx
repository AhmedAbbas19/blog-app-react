import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import "./list-blogs.css";
import ListingBlogs from "../listing-blogs/listing-blogs";
import { fetchCategories } from "../../../actions/catActions";
import { capitalize } from "../../../actions/utilActions";
import { connect } from "react-redux";
import { BACKEND_URL } from "../../../config";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";

class ListBlogs extends Component {
  state = {
    title: "",
    blogs: [],
    loaded: false,
  };
  componentDidMount() {
    this.props.fetchCategories();
    this.fetchMyBlogs();
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.fetchMyBlogs();
    }
  }

  fetchMyBlogs() {
    let { title } = queryString.parse(this.props.location.search);
    if (!title) {
      this.setState({ title: "No result to show", blogs: [], loaded: true });
    } else {
      let type = this.props.location.pathname;
      axios.get(`${BACKEND_URL}/blogs${type}?title=${title}`).then((res) => {
        const blogs = res.data;
        this.setState({ title, blogs, loaded: true });
      });
    }
  }

  render() {
    const { blogs, loaded, title } = this.state;
    const { categories } = this.props;
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
    if (!blogs.length) {
      return <Redirect to="/not-found" />;
    }
    return (
      <section className="categories-page">
        <div className="container">
          <ListingBlogs blogs={blogs} title={title} />
          <div className="sidebar sm-12">
            <h2 className="heading">Categories</h2>
            <List component="nav" aria-label="mailbox folders">
              {categories.map((cat) => (
                <Fragment>
                  <Link to={`/categories?title=${cat.title}`}>
                    <ListItem button key={cat._id}>
                      <ListItemText primary={capitalize(cat.title)} />
                    </ListItem>
                  </Link>
                  <Divider />
                </Fragment>
              ))}
            </List>
          </div>
        </div>
      </section>
    );
  }
}
function mapStateToProps(state) {
  return {
    categories: state.categories.items,
  };
}

export default connect(mapStateToProps, { fetchCategories })(ListBlogs);
