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

export function getDateString(blogDate) {
  let date = new Date(blogDate);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export async function addBlog(blog) {
  const { data } = await axios.post(
    `http://localhost:4200/blogs`,
    JSON.stringify(blog),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
}

export function sanitizeHtml(strInputCode) {
  return strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
}
