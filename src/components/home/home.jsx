import React, { Fragment } from "react";
import HotBlogs from "../blog/hot-blogs/hot-blogs";
import LatestBlogs from "../blog/latest-blogs/latest-blogs";
import Trends from "../category/trends/trends";

export function Home() {
  return (
    <Fragment>
      <HotBlogs />
      <LatestBlogs />
      <Trends />
    </Fragment>
  );
}
