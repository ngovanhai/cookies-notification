import axios from "axios";
import {
  GET_COOKIES,
  // ADD_COOKIES,
  GET_COOKIES_SCAN,
  RELOAD_IN_COOKIES,
  OPEN_UPDATE_MODAL,
  CLOSE_UPDATE_MODAL,
} from "../constants/constants";
import config from "../config/config";
import { setAlert } from "./alert";
const shop = config.shop;

export const getListCookies = (
  queryValue,
  tabFilter,
  categoryFilter,
  offset
) => async (dispatch) => {
  try {
    const res = await axios.get(config.rootLink + "/services.php", {
      params: {
        shop: shop,
        action: "getListCookies",
        queryValue: queryValue,
        tabFilter: tabFilter,
        categoryFilter: categoryFilter,
        offset: offset,
      },
    });
    dispatch({
      type: GET_COOKIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};
export const getCookiesSan = () => async (dispatch) => {
  try {
    const res = await axios.get(config.rootLink + "/services.php", {
      params: {
        shop: shop,
        action: "getCookiesSan",
      },
    });
    dispatch({
      type: GET_COOKIES_SCAN,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};

export const addCookie = (
  idCategory,
  title,
  description,
  status,
  nameCategory
) => async (dispatch) => {
  try {
    await axios.post(
      config.rootLink + "/services.php",
      {
        action: "addCookie",
        shop: shop,
        idCategory: idCategory,
        title: title,
        description: description,
        status: status,
        nameCategory: nameCategory,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    // dispatch({
    //   type: ADD_COOKIES,
    // });
    dispatch(setAlert("Create cookie successfully!"));
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};
export const editCookie = (
  idCookie,
  idCategory,
  title,
  description,
  status,
  nameCategory
) => async (dispatch) => {
  try {
    await axios.post(
      config.rootLink + "/services.php",
      {
        action: "editCookie",
        shop: shop,
        idCookie: idCookie,
        idCategory: idCategory,
        title: title,
        description: description,
        status: status,
        nameCategory: nameCategory,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    dispatch(setAlert("Edit cookie successfully!"));
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};

export const deleteCookie = (idCookie) => async (dispatch) => {
  try {
    await axios.post(
      config.rootLink + "/services.php",
      {
        action: "deleteCookie",
        shop: shop,
        idCookie: idCookie,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    dispatch(setAlert("Delete cookie successfully!"));
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};

export const reloadCookies = () => async (dispatch) => {
  dispatch({
    type: RELOAD_IN_COOKIES,
  });
};
export const openUpdateModal = () => async (dispatch) => {
  dispatch({
    type: OPEN_UPDATE_MODAL,
  });
};
export const closeUpdateModal = () => async (dispatch) => {
  dispatch({
    type: CLOSE_UPDATE_MODAL,
  });
};
