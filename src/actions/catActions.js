import TYPES from "../reducers/types";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function fetchCategories() {
  return function (dispatch) {
    axios.get(`${BACKEND_URL}/categories`).then((res) => {
      const categories = res.data;
      dispatch({
        type: TYPES.FETCH_CATS,
        payload: categories,
      });
    });
  };
}
