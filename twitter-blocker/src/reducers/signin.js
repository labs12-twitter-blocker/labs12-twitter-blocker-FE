import {

    
} from '../actions/index.js';

const initialState = {
    error: null,
    signingIn: false,
    signedIn: false
  };

  //These ACTIONS need to be made

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGN_IN:
        return {
          ...state,
          signingIn: true,
          error: null
        };
      case SIGN_IN_SUCCESS:
        return {
          ...state,
          signingIn: false,
          signedIn: true
        };
      case SIGN_IN_FAILURE:
        return {
          ...state,
          signingIn: false,
          signedIn: false,
          error: action.payload
        };
      case SIGN_UP:
        return {
          ...state,
          signingIn: true,
          error: null
        };
      case SIGN_UP_SUCCESS:
        return {
          ...state,
          signingIn: false,
          signedIn: true
        };
      case SIGN_UP_FAILURE:
        return {
          ...state,
          signingIn: false,
          signedIn: false,
          error: action.payload
        };
      case SIGNED_IN:
        return {
          ...state,
          signedIn: true
        };
      case SIGNED_OUT:
        return {
          ...state,
          signedIn: false
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;