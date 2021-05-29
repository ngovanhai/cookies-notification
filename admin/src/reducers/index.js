import { combineReducers } from "redux";
import alert from "./alert";
import cookies from "./manageCookies";
import categories from "./manageCategories";
import users from "./manageUsers";
import settings from "./settings";
export default combineReducers({
  alert,
  cookies,
  categories,
  users,
  settings,
});
