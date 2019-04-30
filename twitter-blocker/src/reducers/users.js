import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    GET_USERS_POINTS,
    GET_USERS_POINTS_SUCCESS,
    GET_USERS_POINTS_FAILURE,
    GET_PREMIUM_USERS,
    GET_PREMIUM_USERS_SUCCESS,
    GET_PREMIUM_USERS_FAILURE,
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
    EDIT_USER,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILURE,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE
} from '../actions/index.js';

const initialState = {
    users: [],
    error: null,
    currentProfile: null,
    fetchingProfile: false,
    editingProfile: false,
    addingProfile: false,
    deletingProfile: false,
};

const reducer = (state = initialState, action) => {
switch (action.type) {
    case GET_USERS:
    return {
        ...state,
        fetchingProfile: true,
        error: null
    };
    case GET_USERS_SUCCESS:
    return {
        ...state,
        fetchingProfile: false,
        currentProfile: action.payload
    };
    case GET_USERS_FAILURE:
    return {
        ...state,
        fetchingProfile: false,
        error: action.payload
    };
    case GET_USER:
    return {
        ...state,
        fetchingProfile: true,
        error: null
    };
    case GET_USER_SUCCESS:
    return {
        ...state,
        fetchingProfile: false,
        currentProfile: action.payload
    };
    case GET_USER_FAILURE:
    return {
        ...state,
        fetchingProfile: false,
        error: action.payload
    };
    case  GET_USERS_POINTS:
    return {
        ...state,
        fetchingProfile: true,
        error: null
    };
    case  GET_USERS_POINTS_SUCCESS:
    return {
        ...state,
        fetchingProfile: false,
        currentProfile: action.payload
    };
    case  GET_USERS_POINTS_FAILURE:
    return {
        ...state,
        fetchingProfile: false,
        error: action.payload
    };
    case  GET_PREMIUM_USERS:
    return {
        ...state,
        fetchingProfile: true,
        error: null
    };
    case  GET_PREMIUM_USERS_SUCCESS:
    return {
        ...state,
        fetchingProfile: false,
        currentProfile: action.payload
    };
    case  GET_PREMIUM_USERS_FAILURE:
    return {
        ...state,
        fetchingProfile: false,
        error: action.payload
    };
    case ADD_USER:
    return {
      ...state,
      addingProfile: true,
      error: null
    };
  case ADD_USER_SUCCESS:
    return {
      ...state,
      addingProfile: false,
      users: [...state.users, action.payload]
    };
  case ADD_USER_FAILURE:
    return {
      ...state,
      addingProfile: false,
      error: action.payload
    };
    case EDIT_USER:
    return {
        ...state,
        editingProfile: true,
        error: null
    };
    case EDIT_USER_SUCCESS:
    return {
        ...state,
        editingProfile: false,
        currentProfile: action.payload
    };
    case EDIT_USER_FAILURE:
    return {
        ...state,
        editingProfile: false,
        error: action.payload
    };
    case DELETE_USER:
    return {
        ...state,
        deletingProfile: true,
        error: null
    };
    case DELETE_USER_SUCCESS:
    return {
        ...state,
        deletingProfile: false,
        currentProfile: action.payload
    };
    case DELETE_USER_FAILURE:
    return {
        ...state,
        deletingProfile: false,
        error: action.payload
    };

    default:
    return state;
}
};


export default reducer;