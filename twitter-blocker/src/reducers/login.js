import {
  GET_LOGIN,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILURE,
} from '../actions/index.js';

const initialState = {
    error: null,
    loggingIn: false,
    loggedIn: false,
    user: []
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_LOGIN:
        return {
          ...state,
          loggingIn: true,
          error: null
        };
      case GET_LOGIN_SUCCESS:
        return {
          ...state,
          loggingIn: false,
          loggedIn: true,
          user: action.payload
        };
      case GET_LOGIN_FAILURE:
        return {
          ...state,
          loggingIn: false,
          loggedIn: false,
          error: action.payload
        };
      
      // case SIGNED_IN:
      //   return {
      //     ...state,
      //     signedIn: true
      //   };
      // case SIGNED_OUT:
      //   return {
      //     ...state,
      //     signedIn: false
      //   };
  
      default:
        return state;
    }
  };
  
  export default reducer;