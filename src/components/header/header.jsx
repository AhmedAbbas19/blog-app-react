import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { removeAuthUser, setAuthUser } from "../../actions/authActions";
import { getUserByUsername } from "../../actions/userActions";
import "./header.css";
import { connect } from "react-redux";
import { Fab } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";

class Header extends Component {
  state = {
    type: "",
    keyword: "",
    searchIsOpen: false,
  };
  async componentDidMount() {
    const username = localStorage.getItem("username");
    const gettedUser = await getUserByUsername(username);
    if (gettedUser.data) {
      this.props.setAuthUser(gettedUser.data);
    } else {
      if (localStorage.getItem("jwtToken")) {
        toast.error("Your session has expired");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("username");
      }
    }
  }
  searchInput = () => {
    this.setState({ searchIsOpen: !this.state.searchIsOpen });
  };
  changeType = (type) => {
    this.setState({ type });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { type, keyword } = this.state;
    this.props.history.push(`/search?type=${type}&keyword=${keyword}`);
    this.setState({ searchIsOpen: false });
  };
  changeHandler = ({ target }) => {
    const newKeyword = target.value;
    this.setState({ keyword: newKeyword });
  };
  logout = () => {
    this.props.removeAuthUser();
  };
  render() {
    const { type, keyword } = this.state;
    const { auth } = this.props;
    return (
      <header>
        {auth.isAuthenticated ? (
          <div className="add-blog">
            <Link to="/add-blog">
              <Fab color="secondary" aria-label="add">
                <AddCircle />
              </Fab>
            </Link>
          </div>
        ) : (
          ""
        )}
        {this.state.searchIsOpen ? (
          <div className="search-form">
            <i className="far fa-times-circle" onClick={this.searchInput}></i>
            <form onSubmit={this.onSubmit}>
              <ul className="filters">
                <span>Search By</span>
                <li
                  className={`filter ${type === "user" ? "active" : ""}`}
                  onClick={() => this.changeType("user")}
                >
                  User
                </li>
                <li
                  className={`filter ${type === "title" ? "active" : ""}`}
                  onClick={() => this.changeType("title")}
                >
                  Title
                </li>
                <li
                  className={`filter ${type === "tag" ? "active" : ""}`}
                  onClick={() => this.changeType("tag")}
                >
                  Tag
                </li>
              </ul>
              <input type="hidden" name="type" value={type} />
              <input
                type="text"
                name="keyword"
                placeholder="type then press enter..."
                value={keyword}
                onChange={this.changeHandler}
              />
            </form>
          </div>
        ) : (
          ""
        )}
        <div className="header__top">
          <div className="container">
            <ul className="social-icons sm-12">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-slack"></i>
              <i className="fab fa-linkedin"></i>
            </ul>
            <h1 className="title sm-12">
              <Link to="/">
                Blog<span>arena</span>
              </Link>
            </h1>
            <div className="header__right sm-12">
              <div className="nav-right">
                {auth.isAuthenticated ? (
                  <Fragment>
                    <li>
                      <Link to={`/profile/${auth.activeUser.username}`}>
                        Me
                      </Link>
                    </li>
                    <li onClick={this.logout} style={{ cursor: "pointer" }}>
                      Logout
                    </li>
                  </Fragment>
                ) : (
                  <Fragment>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                  </Fragment>
                )}
                {auth.isAuthenticated ? (
                  <i className="fas fa-search" onClick={this.searchInput}></i>
                ) : (
                  ""
                )}
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
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/comming-soon">Contacts</Link>
              </li>
              <li>
                <Link to="/comming-soon">FAQ</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default withRouter(
  connect(mapStateToProps, { setAuthUser, removeAuthUser })(Header)
);
