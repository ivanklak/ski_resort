import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk"
import visitorsReducer from "./visitors-reducer";
import coachesReducer from "./coaches-reducer";
import skipassesReducer from "./skipasses-reducer";
import tokenReducer from "./token-reducer";
import appReducer from "./app-reducer";

let reducers = combineReducers({
  visitorsPage: visitorsReducer,
  coachesPage: coachesReducer,
  skipassesPage: skipassesReducer,
  loginPage: tokenReducer,
  app: appReducer
});

type ReducerType = typeof reducers; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<ReducerType>;

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store;

export default store;
