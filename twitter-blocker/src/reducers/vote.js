import {
    GET_LIST_VOTES,
    GET_LIST_VOTES_SUCCESS,
    GET_LIST_VOTES_FAILURE,
    GET_USER_VOTES,
    GET_USER_VOTES_SUCCESS,
    GET_USER_VOTES_FAILURE,
    ADD_USER_VOTE,
    ADD_USER_VOTE_SUCCESS,
    ADD_USER_VOTE_FAILURE,

} from '../actions/index.js';

const initialState = {
    listVotes: [],
    userVotes: [],
    userVote: [],
    gettingVotes: false,
    gettingUserVotes: false,
    addingVote: false,
    error: null,
  };

const reducer = (state = initialState, action) => {
switch (action.type) {
    case GET_LIST_VOTES:
    return {
      ...state,
      gettingVotes: true,
      error: null
    };
    case GET_LIST_VOTES_SUCCESS:
    return {
      ...state,
      gettingVotes: false,
      listVotes: [...state.listVotes, action.payload]
    };
    case GET_LIST_VOTES_FAILURE:
    return {
      ...state,
      gettingVotes: false,
      error: action.payload
    };

    case GET_USER_VOTES:
    return {
      ...state,
      gettingUserVotes: true,
      error: null
    };
    case GET_USER_VOTES_SUCCESS:
    return {
      ...state,
      gettingUserVotes: false,
      userVotes: [...state.userVotes, action.payload]
    };
    case GET_USER_VOTES_FAILURE:
    return {
      ...state,
      gettingUserVotes: false,
      error: action.payload
    };

    case ADD_USER_VOTE:
    return {
      ...state,
      addingVote: true,
      error: null
    };
    case ADD_USER_VOTE_SUCCESS:
    return {
      ...state,
      addingVote: false,
      userVote: [...state.userVote, action.payload]
    };
    case ADD_USER_VOTE_FAILURE:
    return {
      ...state,
      addingVote: false,
      error: action.payload
    };


    default:
      return state;
  }
};

export default reducer;







