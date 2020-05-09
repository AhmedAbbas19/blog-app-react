import React, { Component, Fragment } from "react";
import "./not-found.css";
import Trends from "../category/trends/trends";
export default class NotFound extends Component {
  render() {
    return (
      <Fragment>
        <div className="not-found">
          <div className="container">
            <h2 className="_404">404</h2>
            <p className="hint">This page is not found</p>
          </div>
        </div>
        <Trends />
      </Fragment>
    );
  }
}
