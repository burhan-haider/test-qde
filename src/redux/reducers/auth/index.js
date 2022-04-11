import { combineReducers } from "redux";
import login from "./login.reducer";
import user from "./user.reducer";

const authReducers = combineReducers({
  login,
  user
});

export default authReducers;
