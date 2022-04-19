import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
} from "./login.types";

const initialState = {
  success: false
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        success: true
      };
    }
    case LOGIN_ERROR: {
      return {
        success: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default login;
