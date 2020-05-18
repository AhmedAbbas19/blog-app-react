import TYPES from "../reducers/types";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function fetchHotBlogs(start, size) {
  return function (dispatch) {
    axios
      .get(`${BACKEND_URL}/blogs?start=${start}&size=${size}`)
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
      .get(`${BACKEND_URL}/blogs?start=${start}&size=${size}`)
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
      .get(`${BACKEND_URL}/blogs?start=${start}&size=${size}`)
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

export async function addBlog(blog, imageFile) {
  let bodyFormData = new FormData();
  bodyFormData.set("blog", JSON.stringify(blog));
  bodyFormData.append("image", imageFile);
  return await axios({
    method: "post",
    url: `${BACKEND_URL}/blogs`,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function editBlog(blog, imageFile) {
  let bodyFormData = new FormData();
  bodyFormData.set("blog", JSON.stringify(blog));
  bodyFormData.append("image", imageFile);
  return await axios({
    method: "patch",
    url: `${BACKEND_URL}/blogs`,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function deleteBlog(id) {
  return await axios.delete(`${BACKEND_URL}/blogs`, {
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

export function getBlogImageUrl(imageBuffer) {
  try {
    return `data:image/jpg;base64,${btoa(
      new Uint8Array(imageBuffer).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
      }, "")
    )}`;
  } catch (error) {
    console.log(error);
  }
}
