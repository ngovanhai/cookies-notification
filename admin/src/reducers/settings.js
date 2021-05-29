import {
  GET_SETTINGS,
  REMOVE_TAG,
  ADD_TAG,
  RELOAD_IN_SETTINGS,
  SAVE_SETTINGS,
  // RESET_ARR_COUNTRIES,
} from "../constants/constants";

const initialState = {
  dataSettings: [],
  arrShowCountry: [],
  loadingSettings: false,
  // arrDefaultCountry: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SETTINGS:
      return {
        ...state,
        dataSettings: payload,
        arrShowCountry: payload.eu_countries,
      };
    case REMOVE_TAG:
      return {
        ...state,
        arrShowCountry: payload,
      };
    case ADD_TAG:
      return {
        ...state,
        arrShowCountry: payload,
      };
    case RELOAD_IN_SETTINGS:
      return {
        ...state,
        loadingSettings: true,
      };
    case SAVE_SETTINGS:
      return {
        ...state,
        loadingSettings: false,
      };
    default:
      return state;
  }
}
