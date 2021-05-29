import {
  GET_USERS,
  GET_OPTIONS_CATEGORIES_IN_USERS,
  GET_ALL_USERS_EXPORT,
  RELOAD_IN_USERS,
} from "../constants/constants";

const initialState = {
  listUsers: [],
  totalUsers: 0,
  optionsCategoriesInUsers: [{ value: "", label: "" }],
  loadingTableUsers: true,
  listAllUsersExport: [],
  loadingUsers: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        listUsers: payload.data,
        totalUsers: payload.total,
        loadingTableUsers: false,
        loadingUsers: false,
      };
    case GET_ALL_USERS_EXPORT:
      return {
        ...state,
        listAllUsersExport: payload,
      };
    case GET_OPTIONS_CATEGORIES_IN_USERS:
      return {
        ...state,
        optionsCategoriesInUsers: payload,
      };
    case RELOAD_IN_USERS:
      return {
        ...state,
        loadingUsers: true,
      };
    default:
      return state;
  }
}
