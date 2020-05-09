import TYPES from "./types";

const initialState = {
  items: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.FETCH_CATS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
