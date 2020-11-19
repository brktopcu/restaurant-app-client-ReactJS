import { combineReducers } from "redux";
import testReducer from "./testReducer";
import toggleReducer from "./toggleRegisterScreenReducer";
import userReducer from "./userReducer";

export default combineReducers({
  test: testReducer,
  registerForm: toggleReducer,
  userDetails: userReducer,
});
