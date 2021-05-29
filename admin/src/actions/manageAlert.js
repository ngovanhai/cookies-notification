import { setAlert } from "./alert";

export const showAlert = (text) => async (dispatch) => {
  dispatch(setAlert(text));
};
