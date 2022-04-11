import * as Actions from "redux/actions/auth";

const initialState = {
  success: false
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOGIN_SUCCESS: {
      return {
        success: true
      };
    }
    case Actions.LOGIN_ERROR: {
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
