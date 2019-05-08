import usersReducer from "./users";
import listsReducer from "./lists";
import signInReducer from "./signin";
import tweetsReducer from "./tweets";
import voteReducer from "./vote";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    usersReducer,
    listsReducer,
    tweetsReducer,
    signInReducer,
    voteReducer
});

export default rootReducer;