import { STOCK_SUCCESS, STOCK_FETCHING, STOCK_FAILED } from "../Constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case STOCK_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };
    case STOCK_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case STOCK_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};
