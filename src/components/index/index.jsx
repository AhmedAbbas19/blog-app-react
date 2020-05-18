import React, { Component, Fragment } from "react";
import Header from "../header/header";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "../home/home";
import ListBlogs from "../blog/list-blogs/list-blogs";
import Profile from "../users/profile/profile";
import SingleBlog from "../blog/single-blog/single-blog";
import NotFound from "../not-found/not-found";
import SearchResult from "../search-result/search-result";
import BlogEditor from "../blog/blog-editor/blog-editor";
import { ToastContainer } from "react-toastify";
import Register from "../users/register/register";
import Login from "../users/login/login";
import RouteGuard from "../route-guard/route-guard";
import CommingSoon from "../comming-soon/comming-soon";
import Followed from "../blog/followed/followed";
export class Index extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Redirect from="/" to="/home" exact />
          <Route path="/categories" component={ListBlogs} />
          <Route path="/tags" component={ListBlogs} />
          <RouteGuard path="/add-blog" component={BlogEditor} />
          <RouteGuard path="/edit-blog/:id" component={BlogEditor} />
          <RouteGuard path="/search" component={SearchResult} />
          <Route path="/register" component={Register} />
          <RouteGuard path="/followed" component={Followed} />
          <Route path="/login" component={Login} />
          <Route path="/comming-soon" component={CommingSoon} />
          <RouteGuard path="/profile/:username" component={Profile} />
          <Route path="/blog/:slug" component={SingleBlog} />
          <Route path="/home" component={Home} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
        <ToastContainer />
      </Fragment>
    );
  }
}
