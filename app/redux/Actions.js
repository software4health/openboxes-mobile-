import apiClient from "../utils/ApiClient";
import {HIDE_PROGRESS_DIALOG, SHOW_PROGRESS_DIALOG, USER_LOGS_IN} from "./Types";
import store from "./Store";
import showPopup from "../components/Popup";

export function loginUser(username, password) {
  return (dispatch) => {
    const url = "TODO";
    const request = {
      username: username,
      password: password
    };
    showProgressBar();
    apiClient.post(url, request)
      .then(response => {
        /*
        FIXME:
         1. The `response` object will contain data like `userid`, `username` and `authtoken`.
        */
        hideProgressBar()
        dispatch({
          type: USER_LOGS_IN,
          payload: response
        });
      })
      .catch(e => {
        setTimeout(() => {
          hideProgressBar();
          let message;
          if (e && e.message) {
            message = e.message;
          } else {
            message = "Network error encountered";
          }
          showPopup(message, "Ok");
        }, 2000)
      });
  };
}

export function showProgressBar() {
  store.dispatch({
    type: SHOW_PROGRESS_DIALOG
  });
}

export function hideProgressBar() {
  store.dispatch({
    type: HIDE_PROGRESS_DIALOG
  });
}
