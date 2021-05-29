import {
  GET_COOKIES,
  OPEN_UPDATE_MODAL,
  CLOSE_UPDATE_MODAL,
  RELOAD_IN_COOKIES,
  GET_COOKIES_SCAN,
} from "../constants/constants";

const initialState = {
  listCookies: [],
  countCookies: 0,
  loadingCookies: false,
  loadingTableCookies: true,
  listCookiesScanned: [],
  statusModalUpdate: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COOKIES:
      return {
        ...state,
        listCookies: payload.listCookies,
        countCookies: payload.count,
        loadingCookies: false,
        loadingTableCookies: false,
      };
    // case ADD_COOKIES:
    //   return {
    //     ...state,
    //     loadingCookies: false,
    //   };
    case RELOAD_IN_COOKIES:
      return {
        ...state,
        loadingCookies: true,
      };
    case GET_COOKIES_SCAN:
      return {
        ...state,
        listCookiesScanned: payload,
      };
    case CLOSE_UPDATE_MODAL:
      return {
        ...state,
        statusModalUpdate: false,
      };
    case OPEN_UPDATE_MODAL:
      return {
        ...state,
        statusModalUpdate: true,
      };
    default:
      return state;
  }
}
