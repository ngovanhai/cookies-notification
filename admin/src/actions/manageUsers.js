import axios from "axios";
import {
  GET_USERS,
  GET_OPTIONS_CATEGORIES_IN_USERS,
  GET_ALL_USERS_EXPORT,
  RELOAD_IN_USERS,
} from "../constants/constants";
import config from "../config/config";
import { setAlert } from "./alert";
const shop = config.shop;

export const getListUsers = (
  offset,
  textSearch,
  sort,
  checkedGiventConsent
) => async (dispatch) => {
  try {
    const res = await axios.get(config.rootLink + "/services.php", {
      params: {
        shop: shop,
        action: "getListUsers",
        offset: offset,
        textSearch: textSearch,
        sort: sort,
        checkedGiventConsent: checkedGiventConsent,
        // date: date,
      },
    });
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};
export const getAllUsersExport = () => async (dispatch) => {
  try {
    const res = await axios.get(config.rootLink + "/services.php", {
      params: {
        shop: shop,
        action: "getAllUsersExport",
      },
    });
    dispatch({
      type: GET_ALL_USERS_EXPORT,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};
export const getOptionsCategoriesInUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(config.rootLink + "/services.php", {
      params: {
        shop: shop,
        action: "getOptionsCategoriesInUsers",
      },
    });
    dispatch({
      type: GET_OPTIONS_CATEGORIES_IN_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};

export const deleteOneUser = (idUser) => async (dispatch) => {
  try {
    await axios.post(
      config.rootLink + "/services.php",
      {
        action: "deleteOneUser",
        shop: shop,
        idUser: idUser,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    dispatch(setAlert("Delete user successfully!"));
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};

export const deleteAllUsers = () => async (dispatch) => {
  try {
    await axios.post(
      config.rootLink + "/services.php",
      {
        action: "deleteAllUsers",
        shop: shop,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    dispatch(setAlert("Delete all users successfully!"));
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};
export const reloadUsers = () => async (dispatch) => {
  dispatch({ type: RELOAD_IN_USERS });
};
