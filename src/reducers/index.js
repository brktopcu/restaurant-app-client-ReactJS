import { combineReducers } from "redux";
//import { combineReducers } from "redux";
import testReducer from "./testReducer";
import toggleReducer from "./toggleRegisterScreenReducer";

export default combineReducers({
  test: testReducer,
  registerForm: toggleReducer,
});
