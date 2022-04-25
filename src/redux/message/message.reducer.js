import {
    HIDE_MESSAGE,
    SHOW_MESSAGE,
} from './message.types';

const initialState = {
    state: null,
    options: {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center"
      },
      autoHideDuration: 6000,
      message: "Cognifi",
      variant: null
    }
  };
  
  const genericMessage = function(state = initialState, action) {
    switch (action.type) {
      case SHOW_MESSAGE: {
        return {
          state: true,
          options: {
            ...initialState.options,
            ...action.options
          }
        };
      }
      case HIDE_MESSAGE: {
        return {
          ...state,
          state: null
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default genericMessage;