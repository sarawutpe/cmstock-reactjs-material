import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import stockReducer from "./stock.reducer";

export default combineReducers({
  loginReducer,
  stockReducer,
});
