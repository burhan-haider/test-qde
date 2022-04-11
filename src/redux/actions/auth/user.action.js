import AuthService from "services/auth/authService";
import authService from "services/auth/authService";
import history from "services/history";

export const SET_USER_DATA = "SET USER DATA";
export const SET_GUEST_USER_DATA = "SET GUEST USER";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const RESET_STATE_AFTER_LOGOUT = "RESET_STATE_AFTER_LOGOUT";
export const FETCH_ALL_LABELS = "FETCH_ALL_LABELS";

export function setUserData(user) {
  return (dispatch) => {
    dispatch({
      type: SET_USER_DATA,
      payload: user,
    });
  };
}

export function setGuestUserRole() {
  return (dispatch) => {
    dispatch({
      type: SET_GUEST_USER_DATA,
    });
  };
}

export function logoutUser() {
  console.log("yess");
  return (dispatch) => {
    AuthService.logout();
    dispatch(resetStoreAfterLogOut());
    document.title = "Cognifi";
    history.push({
      pathname: "/login",
    });

    dispatch({
      type: USER_LOGGED_OUT,
    });
  };
}

export function getDesiredLabels(lang, direction) {
  //console.log("user auth = ",lang+"---"+direction);
  return (dispatch) => {
    AuthService.fetchAllLabels(lang, direction).then((data) => {
      //Here user data also must be updated
      authService.signInWithToken().then((data) => {
        dispatch(setUserData(data));
      });
      return dispatch({
        type: FETCH_ALL_LABELS,
        payload: data,
      });
    });
  };
}

export const resetStoreAfterLogOut = () => {
  return {
    type: RESET_STATE_AFTER_LOGOUT,
  };
};
