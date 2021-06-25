import { skipassesAPI } from "../api/api";
import { SkiPassType } from "../components/Types/types";
import { AppStateType } from "./redux-store";
import { ThunkAction } from "redux-thunk";

const SET_SKIPASSES = "SET_SKIPASSES";

let initialState = {
  skipasses: [] as Array<SkiPassType>
};

type InitialState = typeof initialState;

const skipassesReducer = (
  state = initialState,
  action: ActionsTypes
): InitialState => {
  switch (action.type) {
    case SET_SKIPASSES: {
      return { ...state, skipasses: action.skipasses };
    }
    default:
      return state;
  }
};

type ActionsTypes = SetSkipassesType;

//AC
type SetSkipassesType = {
  type: typeof SET_SKIPASSES;
  skipasses: Array<SkiPassType>;
};
export const setSkipasses = (
  skipasses: Array<SkiPassType>
): SetSkipassesType => ({ type: SET_SKIPASSES, skipasses });

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

//thunk
export const requestSkipasses = (): ThunkType => {
  return async dispatch => {
    let data = await skipassesAPI.getSkipassess();
    dispatch(setSkipasses(data));
    console.log(data);
  };
};

export default skipassesReducer;
