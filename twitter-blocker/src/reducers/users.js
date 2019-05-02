import {
    GET_HELLO,
    GET_HELLO_SUCCESS,
    GET_HELLO_FAILURE,
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
    greeting: "",
    users: [],
    points: null,
    premiumUsers: [],
    error: null,
    fetchingHello: false,
    fetchingUsers: false,
    fetchingUsersPoints: false,
    fetchingPremiumUsers: false,
    currentUser: null,
    fetchingUser: false,
    editingUser: false,
    addingUser: false,
    deletingUser: false,
};

const reducer = (state = initialState, action) => {
switch (action.type) {
    case GET_HELLO:
    return {
        ...state,
        fetchingHello: true,
        error: null
    };
    case GET_HELLO_SUCCESS:
    return {
        ...state,
        fetchingHello: false,
        greeting: action.payload
    };
    case GET_HELLO_FAILURE:
    return {
        ...state,
        fetchingHello: false,
        error: action.payload
    };
    case GET_USERS:
    return {
        ...state,
        fetchingUsers: true,
        error: null
    };
    case GET_USERS_SUCCESS:
    return {
        ...state,
        fetchingUsers: false,
        users: action.payload
    };
    case GET_USERS_FAILURE:
    return {
        ...state,
        fetchingUsers: false,
        error: action.payload
    };
    case GET_USER:
    return {
        ...state,
        fetchingUser: true,
        error: null
    };
    case GET_USER_SUCCESS:
    return {
        ...state,
        fetchingUser: false,
        currentUser: action.payload
    };
    case GET_USER_FAILURE:
    return {
        ...state,
        fetchingUser: false,
        error: action.payload
    };
    case  GET_USERS_POINTS:
    return {
        ...state,
        fetchingUsersPoints: true,
        error: null
    };
    case  GET_USERS_POINTS_SUCCESS:
    return {
        ...state,
        fetchingUsersPoints: false,
        points: action.payload
    };
    case  GET_USERS_POINTS_FAILURE:
    return {
        ...state,
        fetchingUsersPoints: false,
        error: action.payload
    };
    case  GET_PREMIUM_USERS:
    return {
        ...state,
        fetchingPremiumUsers: true,
        error: null
    };
    case  GET_PREMIUM_USERS_SUCCESS:
    return {
        ...state,
        fetchingPremiumUsers: false,
        premiumUsers: action.payload
    };
    case  GET_PREMIUM_USERS_FAILURE:
    return {
        ...state,
        fetchingPremiumUsers: false,
        error: action.payload
    };
    case ADD_USER:
    return {
        ...state,
        addingUser: true,
        error: null
    };
  case ADD_USER_SUCCESS:
    return {
        ...state,
        addingUser: false,
        users: [...state.users, action.payload]
    };
  case ADD_USER_FAILURE:
    return {
        ...state,
        addingUser: false,
        error: action.payload
    };
    case EDIT_USER:
    return {
        ...state,
        editingUser: true,
        error: null
    };
    case EDIT_USER_SUCCESS:
    return {
        ...state,
        editingUser: false,
        currentUser: action.payload
    };
    case EDIT_USER_FAILURE:
    return {
        ...state,
        editingUser: false,
        error: action.payload
    };
    case DELETE_USER:
    return {
        ...state,
        deletingUser: true,
        error: null
    };
    case DELETE_USER_SUCCESS:
    return {
        ...state,
        deletingUser: false,
        currentUser: action.payload
    };
    case DELETE_USER_FAILURE:
    return {
        ...state,
        deletingUser: false,
        error: action.payload
    };

    default:
    return state;
}
};


export default reducer;