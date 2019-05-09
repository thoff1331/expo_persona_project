import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import auth from "./ducks/auth";
import userInfo from "./ducks/userInfo";
import portfoliolist from "./ducks/portfoliolist";

const rootReducer = combineReducers({ auth, userInfo, portfoliolist }); //userInfo

const store = createStore(rootReducer, applyMiddleware(promise));

export default store;
