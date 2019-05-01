import {
    
    ADD_POST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ERROR_HANDLER

} from '../actions/index.js';

const initialState = {
    posts: [],
    addingPost: false,
    error: null
  };

const reducer = (state = initialState, action) => {
switch (action.type) {
    case ADD_POST:
    return {
      ...state,
      addingPost: true,
      error: null
    };
  case ADD_POST_SUCCESS:
    return {
      ...state,
      addingPost: false,
      posts: [...state.posts, action.payload]
    };
  case ADD_POST_FAILURE:
    return {
      ...state,
      addingPost: false,
      error: action.payload
    };
    case ERROR_HANDLER:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

export default reducer;