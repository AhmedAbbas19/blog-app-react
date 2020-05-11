import TYPES from "../reducers/types";
import axios from "axios";

export function fetchHotBlogs(start, size) {
  return function (dispatch) {
    axios
      .get(`http://localhost:4200/blogs?start=${start}&size=${size}`)
      .then((res) => {
        const blogs = res.data;
        dispatch({
          type: TYPES.FETCH_HOT_BLOGS,
          payload: blogs,
        });
      });
  };
}

export function fetchLatestBlogs(start, size) {
  return function (dispatch) {
    axios
      .get(`http://localhost:4200/blogs?start=${start}&size=${size}`)
      .then((res) => {
        const blogs = res.data;
        dispatch({
          type: TYPES.FETCH_LATEST_BLOGS,
          payload: blogs,
        });
      });
  };
}

export function fetchMoreLatestBlogs(start, size) {
  return function (dispatch) {
    axios
      .get(`http://localhost:4200/blogs?start=${start}&size=${size}`)
      .then((res) => {
        const blogs = res.data;
        dispatch({
          type: TYPES.FETCH_MORE_LATEST_BLOGS,
          payload: blogs,
        });
      });
  };
}

export function moveStart(start, size) {
  return function (dispatch) {
    dispatch({
      type: TYPES.MOVE_START,
      payload: start + size,
    });
  };
}

export function getDateString(blogDate) {
  let date = new Date(blogDate);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export async function addBlog(blog) {
  return await axios.post(`http://localhost:4200/blogs`, JSON.stringify(blog), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function editBlog(blog) {
  return await axios.patch(
    `http://localhost:4200/blogs`,
    JSON.stringify(blog),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function deleteBlog(id) {
  return await axios.delete(`http://localhost:4200/blogs`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      source: id,
    },
  });
}

export function sanitizeHtml(strInputCode) {
  return strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
}
