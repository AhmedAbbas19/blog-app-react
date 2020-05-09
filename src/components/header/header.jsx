import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./header.css";

export default class Header extends Component {
  state = {
    type: "",
    searchIsOpen: false,
  };
  searchInput = () => {
    this.setState({ searchIsOpen: !this.state.searchIsOpen });
  };
  chaneFilter = (type) => {
    this.setState({ type });
  };
  render() {
    const { type } = this.state;
    return (
      <header>
        <div className="add-blog">
          <Link to="add-blog">
            <i className="fas fa-plus"></i>
          </Link>
        </div>
        {this.state.searchIsOpen ? (
          <div className="search-form">
            <i className="far fa-times-circle" onClick={this.searchInput}></i>
            <form action="/search" method="GET">
              <ul className="filters">
                <span>Search By</span>
                <li
                  className={`filter ${type === "user" ? "active" : ""}`}
                  onClick={() => this.chaneFilter("user")}
                >
                  User
                </li>
                <li
                  className={`filter ${type === "title" ? "active" : ""}`}
                  onClick={() => this.chaneFilter("title")}
                >
                  Title
                </li>
                <li
                  className={`filter ${type === "tag" ? "active" : ""}`}
                  onClick={() => this.chaneFilter("tag")}
                >
                  Tag
                </li>
              </ul>
              <input type="hidden" name="type" value={type} />
              <input
                type="text"
                name="keyword"
                placeholder="type then press enter..."
              />
            </form>
          </div>
        ) : (
          ""
        )}
        <div className="header__top">
          <div className="container">
            <ul className="social-icons">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-slack"></i>
              <i className="fab fa-linkedin"></i>
            </ul>
            <h1 className="title">
              <Link to="/">Aladdin</Link>
            </h1>
            <div className="header__right">
              <div className="nav-right">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <i className="fas fa-search" onClick={this.searchInput}></i>
              </div>
            </div>
          </div>
        </div>
        <nav>
          <div className="container">
            <ul className="navbar">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/add-blog">Add</Link>
              </li>
              <li>
                <Link to="/edit-blog">Edit</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contacts">Contacts</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
