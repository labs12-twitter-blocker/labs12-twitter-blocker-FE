import usersReducer from "./users";
import listsReducer from "./lists";
import loginReducer from "./login";
import tweetsReducer from "./tweets";
import voteReducer from "./vote";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    usersReducer,
    listsReducer,
    tweetsReducer,
    loginReducer,
    voteReducer
});

export default rootReducer;