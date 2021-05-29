import axios from "axios";
import {
  GET_OPTIONS_CATEGORIES,
  GET_LIST_CATEGORIES,
  RELOAD_IN_CATEGORIES,
} from "../constants/constants";
import config from "../config/config";
import { setAlert } from "./alert";
const shop = config.shop;

export const getOptionsCategories = () => async (dispatch) => {
  try {
    const res = await axios.get(config.rootLink + "/services.php", {
      params: {
        shop: shop,
        action: "getOptionsCategories",
      },
    });
    dispatch({
      type: GET_OPTIONS_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};
export const getListCategories = (offset, queryValue, tabFilter) => async (
  dispatch
) => {
  try {
    const res = await axios.get(config.rootLink + "/services.php", {
      params: {
        shop: shop,
        action: "getListCategories",
        offset: offset,
        queryValue: queryValue,
        tabFilter: tabFilter,
      },
    });
    dispatch({
      type: GET_LIST_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};

export const addCategory = (title, description, status) => async (dispatch) => {
  try {
    await axios.post(
      config.rootLink + "/services.php",
      {
        action: "addCategory",
        shop: shop,
        title: title,
        description: description,
        status: status,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    dispatch(setAlert("Create category successfully!"));
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};
export const editCategory = (
  idCategoryEdit,
  title,
  description,
  status
) => async (dispatch) => {
  try {
    await axios.post(
      config.rootLink + "/services.php",
      {
        action: "editCategory",
        shop: shop,
        idCategoryEdit: idCategoryEdit,
        title: title,
        description: description,
        status: status,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    dispatch(setAlert("Edit category successfully!"));
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};
export const deleteCategory = (idCategory) => async (dispatch) => {
  try {
    await axios.post(
      config.rootLink + "/services.php",
      {
        action: "deleteCategory",
        shop: shop,
        idCategory: idCategory,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    dispatch(setAlert("Delete category successfully!"));
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};

export const reloadCategories = () => async (dispatch) => {
  dispatch({
    type: RELOAD_IN_CATEGORIES,
  });
};
