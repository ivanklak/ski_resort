import { StatusEnum } from "./../api/api";
import { coachesAPI } from "../api/api";
import { CoachType, NewCoachType } from "../components/Types/types";
import { AppStateType } from "./redux-store";
import { ThunkAction } from "redux-thunk";

const SET_ALL_COACHES = "SET_ALL_COACHES";
const SET_COACHES = "SET_COACHES";
const CREATE_COACH = "CRETE_COACH";
const DELETE_SUCCESS = "DELETE_SUCCESS";
const UPDATE_SUCCESS = "UPDATE_SUCCESS";
const SET_PAGE_NUMBER = "SET_PAGE_NUMBER";
const SET_TOTAL_COACHES_COUNT = "SET_TOTAL_COACHES_COUNT";

let initialState = {
  coaches: [] as Array<CoachType>,
  allCoaches: [] as Array<CoachType>,
  pageSize: 26,
  totalCoachesCount: 0,
  pageNumber: 1
};

type InitialState = typeof initialState;

const coachesReducer = (
  state = initialState,
  action: ActionsTypes
): InitialState => {
  switch (action.type) {
    case SET_ALL_COACHES: {
      return { ...state, allCoaches: action.allCoaches };
    }
    case SET_COACHES: {
      return { ...state, coaches: action.coaches };
    }
    case CREATE_COACH: {
      return { ...state, coaches: [...state.coaches] };
    }
    case DELETE_SUCCESS: {
      return { ...state };
    }
    case UPDATE_SUCCESS: {
      return { ...state };
    }
    case SET_PAGE_NUMBER: {
      return { ...state, pageNumber: action.pageNumber };
    }
    case SET_TOTAL_COACHES_COUNT: {
      return { ...state, totalCoachesCount: action.count };
    }
    default:
      return state;
  }
};

type ActionsTypes =
  | SetAllCoachesType
  | SetCoachesType
  | SetAddCoachType
  | DeleteSuccessType
  | UpdateSuccessType
  | SetPageNumberType
  | SetTotalCoachesCountType;

//AC
type SetAllCoachesType = {
  type: typeof SET_ALL_COACHES;
  allCoaches: Array<CoachType>;
};
export const setAllCoaches = (
  allCoaches: Array<CoachType>
): SetAllCoachesType => ({
  type: SET_ALL_COACHES,
  allCoaches
});

type SetCoachesType = {
  type: typeof SET_COACHES;
  coaches: Array<CoachType>;
};
export const setCoaches = (coaches: Array<CoachType>): SetCoachesType => ({
  type: SET_COACHES,
  coaches
});

type SetAddCoachType = {
  type: typeof CREATE_COACH;
};
export const setAddCoach = (): SetAddCoachType => ({ type: CREATE_COACH });

type DeleteSuccessType = {
  type: typeof DELETE_SUCCESS;
};
export const deleteSuccess = (): DeleteSuccessType => ({
  type: DELETE_SUCCESS
});

type UpdateSuccessType = {
  type: typeof UPDATE_SUCCESS;
};
export const updateSuccess = (): UpdateSuccessType => ({
  type: UPDATE_SUCCESS
});

type SetPageNumberType = {
  type: typeof SET_PAGE_NUMBER;
  pageNumber: number;
};
export const setPageNumber = (pageNumber: number): SetPageNumberType => ({
  type: SET_PAGE_NUMBER,
  pageNumber
});

type SetTotalCoachesCountType = {
  type: typeof SET_TOTAL_COACHES_COUNT;
  count: number;
};
export const setTotalCoachesCount = (
  totalCoachesCount: number
): SetTotalCoachesCountType => ({
  type: SET_TOTAL_COACHES_COUNT,
  count: totalCoachesCount
});

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

//thunk
export const requestCoaches = (): ThunkType => {
  return async dispatch => {
    let data = await coachesAPI.getCoaches();
    dispatch(setAllCoaches(data));
    dispatch(setTotalCoachesCount(data.length));
  };
};

export const requestCoachesPerPage = (
  pageNumber: number,
  pageSize: number
): ThunkType => {
  return async dispatch => {
    dispatch(setPageNumber(pageNumber));
    let data = await coachesAPI.getCoachesPerPage(pageNumber, pageSize);
    dispatch(setCoaches(data));
  };
};

export const addNewCoach = (coach: NewCoachType): ThunkType => {
  return async dispatch => {
    let data = await coachesAPI.createCoaches(coach);
    if (data.status === StatusEnum.Succes) {
      dispatch(setAddCoach());
      dispatch(requestCoaches());
    }
  };
};

export const deleteCoaches = (id: number): ThunkType => {
  return async dispatch => {
    let data = await coachesAPI.deleteCoach(id);
    if (data.status === StatusEnum.Succes) {
      dispatch(deleteSuccess());
      dispatch(requestCoaches());
    }
  };
};

export const updateCoaches = (coach: NewCoachType): ThunkType => {
  return async dispatch => {
    let data = await coachesAPI.updateCoach(coach);
    if (data.status === StatusEnum.Succes) {
      dispatch(updateSuccess());
      dispatch(requestCoaches());
    }
  };
};

export default coachesReducer;
