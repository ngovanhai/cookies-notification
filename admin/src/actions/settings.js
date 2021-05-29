import axios from "axios";
import {
  GET_SETTINGS,
  REMOVE_TAG,
  ADD_TAG,
  RELOAD_IN_SETTINGS,
  SAVE_SETTINGS,
} from "../constants/constants";
import config from "../config/config";
import { setAlert } from "./alert";
const shop = config.shop;

export const getSettings = () => async (dispatch) => {
  try {
    const res = await axios.get(config.rootLink + "/services.php", {
      params: {
        shop: shop,
        action: "getSettings",
      },
    });
    dispatch({
      type: GET_SETTINGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};

export const saveSettingsPopUp = (formData) => async (dispatch) => {
  try {
    await axios.post(
      config.rootLink + "/services.php",
      {
        action: "saveSettingsPopUp",
        shop: shop,
        dataSave: formData,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    dispatch({
      type: SAVE_SETTINGS,
    });
    dispatch(setAlert("Save successful!"));
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};
export const saveSettingsPreferences = (formData) => async (dispatch) => {
  try {
    await axios.post(
      config.rootLink + "/services.php",
      {
        action: "saveSettingsPreferences",
        shop: shop,
        dataSave: formData,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    dispatch({
      type: SAVE_SETTINGS,
    });
    dispatch(setAlert("Save successful!"));
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};
export const saveSettingsAdvanced = (formData) => async (dispatch) => {
  try {
    await axios.post(
      config.rootLink + "/services.php",
      {
        action: "saveSettingsAdvanced",
        shop: shop,
        dataSave: formData,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    dispatch({
      type: SAVE_SETTINGS,
    });
    dispatch(setAlert("Save successful!"));
  } catch (err) {
    dispatch(setAlert(err.message));
  }
};
export const removeTag = (e, arrayCountryInDB) => async (dispatch) => {
  let index = arrayCountryInDB.indexOf(e);
  arrayCountryInDB.splice(index, 1);
  dispatch({
    type: REMOVE_TAG,
    payload: arrayCountryInDB,
  });
};
export const addTag = (e, arrayCountryInDB) => async (dispatch) => {
  if (arrayCountryInDB.indexOf(e) == -1) {
    arrayCountryInDB.push(e);
  }
  dispatch({
    type: ADD_TAG,
    payload: arrayCountryInDB,
  });
};
export const reloadSettings = () => async (dispatch) => {
  dispatch({
    type: RELOAD_IN_SETTINGS,
  });
};
