import TYPES from "../reducers/types";
import axios from "axios";

export function fetchCategories() {
  return function (dispatch) {
    axios.get("http://localhost:4200/categories").then((res) => {
      const categories = res.data;
      dispatch({
        type: TYPES.FETCH_CATS,
        payload: categories,
      });
    });
  };
}
