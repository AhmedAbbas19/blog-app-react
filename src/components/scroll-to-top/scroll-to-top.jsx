import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default withRouter(ScrollToTop);
