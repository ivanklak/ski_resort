import { tokenAPI } from "../api/api";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";

const SET_TOKEN = "SET_TOKEN";

let initialState = {
  token: "",
  isAuth: false
};

type InitialState = typeof initialState;

const tokenReducer = (state = initialState, action: ActionsTypes): InitialState => {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
        isAuth: true
      };
    }
    default:
      return state;
  }
};

type ActionsTypes = SetTokenType;

type SetTokenType = {
  type: typeof SET_TOKEN;
  token: string;
};

const setToken = (token: string): SetTokenType => ({ type: SET_TOKEN, token });

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const requestToken = (username: string, password: string): ThunkType => {
  return async dispatch => {
    const response = await tokenAPI.getToken(username, password);
    if (response.access_token) {
      document.cookie = `token=${response.access_token}`;
      dispatch(setToken(response.access_token));
    }
  };
};

export default tokenReducer;
