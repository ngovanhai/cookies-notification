import {
  GET_OPTIONS_CATEGORIES,
  GET_LIST_CATEGORIES,
  RELOAD_IN_CATEGORIES,
} from "../constants/constants";

const initialState = {
  optionsCategories: [{ value: "", label: "" }],
  listCategories: [],
  countCategories: 0,
  loadingCategories: false,
  loadingTableCategories: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_OPTIONS_CATEGORIES:
      return {
        ...state,
        optionsCategories: payload,
      };
    case GET_LIST_CATEGORIES:
      return {
        ...state,
        listCategories: payload.listCategories,
        countCategories: payload.count,
        loadingCategories: false,
        loadingTableCategories: false,
      };
    case RELOAD_IN_CATEGORIES:
      return {
        ...state,
        loadingCategories: true,
      };
    default:
      return state;
  }
}
