import { visitorsAPI, StatusEnum } from "../api/api";
import {
  VisitorType,
  NewVisitorType,
  UpdateVisitorType
} from "../components/Types/types";
import { AppStateType } from "./redux-store";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

const SET_VISITORS = "SET_VISITORS";
const CREATE_VISITOR = "CREATE_VISITOR";
const DELETE = "DELETE";
const UPDATE_SUCCESS = "UPDATE_SUCCESS";
const SET_PIECE_OF_VISITORS = "SET_PIECE_OF_VISITORS";
const SET_PAGE_NUMBER = "SET_PAGE_NUMBER";
const SET_TOTAL_VISITORS_COUNT = "SET_TOTAL_VISITORS_COUNT";

let initialState = {
  visitors: [] as Array<VisitorType>,
  pieceOfVisitors: [] as Array<VisitorType>,
  pageSize: 26,
  totalVisitorsCount: 0,
  pageNumber: 1
};

type InitialState = typeof initialState;

const visitorsReducer = (
  state = initialState,
  action: ActionsTypes
): InitialState => {
  switch (action.type) {
    case SET_VISITORS: {
      return { ...state, visitors: action.visitors };
    }
    case CREATE_VISITOR: {
      return {
        ...state,
        visitors: [...state.visitors] //hz
      };
    }
    case DELETE: {
      return {
        ...state
      };
    }
    case UPDATE_SUCCESS: {
      return {
        ...state
      };
    }
    case SET_PIECE_OF_VISITORS: {
      return {
        ...state,
        pieceOfVisitors: action.pieceOfVisitors
      };
    }
    case SET_PAGE_NUMBER: {
      return { ...state, pageNumber: action.pageNumber };
    }
    case SET_TOTAL_VISITORS_COUNT: {
      return { ...state, totalVisitorsCount: action.count };
    }
    default:
      return state;
  }
};

type ActionsTypes =
  | SetVizitorsType
  | DeleteSuccessType
  | SetAddVisitorType
  | UpdateSuccessType
  | PieceOfVisitorsType
  | SetPageNumberType
  | SetTotalVisitorsCountType;

//AC
type SetVizitorsType = {
  type: typeof SET_VISITORS;
  visitors: Array<VisitorType>;
};
export const setVizitors = (visitors: Array<VisitorType>): SetVizitorsType => ({
  type: SET_VISITORS,
  visitors
});

type DeleteSuccessType = {
  type: typeof DELETE;
};
export const deleteSuccess = (): DeleteSuccessType => ({ type: DELETE });

type SetAddVisitorType = {
  type: typeof CREATE_VISITOR;
};
export const setAddVisitor = (): SetAddVisitorType => ({
  type: CREATE_VISITOR
});

type UpdateSuccessType = {
  type: typeof UPDATE_SUCCESS;
};
export const updateSuccess = (): UpdateSuccessType => ({
  type: UPDATE_SUCCESS
});

type PieceOfVisitorsType = {
  type: typeof SET_PIECE_OF_VISITORS;
  pieceOfVisitors: Array<VisitorType>;
};
export const setPieceOfVisitors = (
  pieceOfVisitors: Array<VisitorType>
): PieceOfVisitorsType => ({
  type: SET_PIECE_OF_VISITORS,
  pieceOfVisitors
});

type SetPageNumberType = {
  type: typeof SET_PAGE_NUMBER;
  pageNumber: number;
};
export const setPageNumber = (pageNumber: number): SetPageNumberType => ({
  type: SET_PAGE_NUMBER,
  pageNumber
});

type SetTotalVisitorsCountType = {
  type: typeof SET_TOTAL_VISITORS_COUNT;
  count: number;
};
export const setTotalVisitorsCount = (
  totalVisitorsCount: number
): SetTotalVisitorsCountType => ({
  type: SET_TOTAL_VISITORS_COUNT,
  count: totalVisitorsCount
});

//psevdonim - first way for Thunk typing
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
//ThunkAction - from documentation
type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

//thunk
//: ThunkAction<void, RootState, unknown, AnyAction>
export const requestVizitors = (): ThunkType => {
  return async dispatch => {
    let data = await visitorsAPI.getVizitors();
    dispatch(setTotalVisitorsCount(data.length));
  };
};

export const requestVisitorsPerPage = (
  pageNumber: number,
  pageSize: number
): ThunkType => {
  return async dispatch => {
    dispatch(setPageNumber(pageNumber));
    let data = await visitorsAPI.getVisitorsPerPage(pageNumber, pageSize);
    dispatch(setVizitors(data));
    dispatch(requestImage(data));
  };
};

export const requestImage = (data: Array<VisitorType>): ThunkType => {
  return async dispatch => {
    //асинхронно обрабатывем data
    const promises = data.map(async (item: VisitorType) => {
      const response = await visitorsAPI.getImage(item.id);
      let itemWithPhoto = { ...item };
      itemWithPhoto.photo = response.data;
      return itemWithPhoto;
    });
    const contents = await Promise.all(promises);
    dispatch(setVizitors(contents));
  };
};

export const requestPieceOfVisitors = (): ThunkType => {
  return async dispatch => {
    let visData = await visitorsAPI.getVizitors();
    dispatch(setPieceOfVisitors(visData.reverse().slice(0, 10)));
  };
};

export const addNewVisitor = (
  visitor: NewVisitorType,
  pageNumber: number,
  pageSize: number
): ThunkType => {
  return async dispatch => {
    let data = await visitorsAPI.createVisitor(visitor);
    if (data.status === StatusEnum.Succes) {
      dispatch(setAddVisitor());
      dispatch(requestPieceOfVisitors());
      dispatch(requestVisitorsPerPage(pageNumber, pageSize));
    }
  };
};

export const deleteVisitors = (
  id: number,
  pageNumber?: number,
  pageSize?: number
): ThunkType => {
  return async dispatch => {
    let data = await visitorsAPI.deleteVisitor(id);
    if (data.status === StatusEnum.Succes) {
      dispatch(deleteSuccess());
      dispatch(
        requestVisitorsPerPage(pageNumber as number, pageSize as number)
      );
      if (!pageNumber && !pageSize) {
        dispatch(requestPieceOfVisitors());
      }
    }
  };
};

export const updateVisitors = (
  visitor: UpdateVisitorType,
  coachId: number,
  pageNumber: number,
  pageSize: number
): ThunkType => {
  return async dispatch => {
    let data = await visitorsAPI.updateVisitor(visitor);
    if (data.status === StatusEnum.Succes) {
      dispatch(addCoachToVisitor(visitor.id, coachId, pageNumber, pageSize));
      dispatch(updateSuccess());
    }
  };
};

export const addCoachToVisitor = (
  visitorId: number,
  coachId: number,
  pageNumber: number,
  pageSize: number
): ThunkType => {
  return async dispatch => {
    let data = await visitorsAPI.addCoach(visitorId, coachId);
    if (data.status === StatusEnum.Succes) {
      dispatch(requestVisitorsPerPage(pageNumber, pageSize));
    }
  };
};

export default visitorsReducer;
