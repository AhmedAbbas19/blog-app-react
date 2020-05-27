import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { removeAuthUser, setAuthUser } from "../../actions/authActions";
import { getUserByUsername } from "../../actions/userActions";
import "./header.css";
import { connect } from "react-redux";
import { Fab } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";

function Header(props) {
  const [type, setType] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    (async function () {
      const gettedUser = await getUserByUsername(username);
      if (gettedUser.data) {
        props.setAuthUser(gettedUser.data);
      } else {
        if (localStorage.getItem("jwtToken")) {
          toast.error("Your session has expired");
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("username");
        }
      }
    })();
  }, []);

  const searchInput = () => {
    setSearchIsOpen(!searchIsOpen);
  };
  const changeType = (type) => {
    setType(type);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    props.history.push(`/search?type=${type}&keyword=${keyword}`);
    setSearchIsOpen(false);
  };
  const changeHandler = ({ target }) => {
    const newKeyword = target.value;
    setKeyword(newKeyword);
  };
  const logout = () => {
    props.removeAuthUser();
  };
  const { auth } = props;
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
      {searchIsOpen ? (
        <div className="search-form">
          <i className="far fa-times-circle" onClick={searchInput}></i>
          <form onSubmit={onSubmit}>
            <ul className="filters">
              <span>Search By</span>
              <li
                className={`filter ${type === "user" ? "active" : ""}`}
                onClick={() => changeType("user")}
              >
                User
              </li>
              <li
                className={`filter ${type === "title" ? "active" : ""}`}
                onClick={() => changeType("title")}
              >
                Title
              </li>
              <li
                className={`filter ${type === "tag" ? "active" : ""}`}
                onClick={() => changeType("tag")}
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
              onChange={changeHandler}
            />
          </form>
        </div>
      ) : (
        ""
      )}
      <div className="header__top">
        <div className="container">
          <ul className="social-icons sm-12">
            <a href="https://www.facebook.com/AhmeddAbbas17">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/AHMabass">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://github.com/AhmedAbbas19">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/ahmeddabbas/">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/ahmed_abbas14">
              <i className="fab fa-instagram"></i>
            </a>
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
                    <Link to={`/profile/${auth.activeUser.username}`}>Me</Link>
                  </li>
                  <li onClick={logout} style={{ cursor: "pointer" }}>
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
                <i className="fas fa-search" onClick={searchInput}></i>
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
            {auth.isAuthenticated ? (
              <li>
                <Link to="/followed">What followers say!</Link>
              </li>
            ) : (
              <li>
                <Link to="/about">About</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default withRouter(
  connect(mapStateToProps, { setAuthUser, removeAuthUser })(Header)
);
