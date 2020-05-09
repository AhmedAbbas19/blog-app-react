import React, { Component } from "react";
import queryString from "query-string";
import ListingBlogs from "../blog/listing-blogs/listing-blogs";
import axios from "axios";

export default class SearchResult extends Component {
  state = {
    blogs: [],
    title: "",
    loaded: false,
  };
  componentDidMount() {
    this.fetchMyBlogs();
  }

  fetchMyBlogs = async () => {
    try {
      let { keyword } = queryString.parse(this.props.location.search);
      let { type } = queryString.parse(this.props.location.search);
      const { data } = await axios.get(
        `http://localhost:4200/blogs/search?keyword=${keyword}&type=${type}`
      );
      this.setState({
        blogs: data,
        title: `${data.length} Search results for "${keyword}"`,
        loaded: true,
      });
    } catch (e) {
      this.setState({
        title: "Make sure you entered a valid keyword!",
        loaded: true,
      });
    }
  };

  render() {
    const { blogs, title, loaded } = this.state;
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
    return (
      <section className="search-result">
        <div className="container">
          <ListingBlogs blogs={blogs} title={title} />
        </div>
      </section>
    );
  }
}
