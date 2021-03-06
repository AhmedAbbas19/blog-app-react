import TYPES from "./types";
import { toast } from "react-toastify";

const initialState = {
  hotItems: [],
  latestItems: [],
  start: 4,
  size: 3,
  nomore: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.FETCH_HOT_BLOGS:
      return {
        ...state,
        hotItems: action.payload,
      };
    case TYPES.FETCH_LATEST_BLOGS:
      return {
        ...state,
        latestItems: action.payload,
      };
    case TYPES.FETCH_MORE_LATEST_BLOGS:
      if (action.payload.length) {
        return {
          ...state,
          latestItems: state.latestItems.concat(action.payload),
          start: state.start + action.payload.length,
        };
      } else {
        toast.info("No more blogs");
        return {
          ...state,
          nomore: true,
        };
      }
    case TYPES.ADD_BLOG:
      let blogs = state.latestItems;
      blogs.push(action.payload);
      return {
        ...state,
        latestItems: blogs,
      };
    case TYPES.MOVE_START:
      return {
        ...state,
        start: action.payload,
      };
    default:
      return state;
  }
}
