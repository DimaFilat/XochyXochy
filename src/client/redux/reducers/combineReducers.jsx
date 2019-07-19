import { combineReducers } from "redux";
import giftReducer from "./giftReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  giftReducer,
  userReducer
});

export default rootReducer;