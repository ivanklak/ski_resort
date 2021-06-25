import { AppStateType } from "./redux-store";

export const getVisitors = (state: AppStateType) => {
  return state.visitorsPage.visitors;
};

export const getPieceOfVisitors = (state: AppStateType) => {
  return state.visitorsPage.pieceOfVisitors;
};

export const getPageSize = (state: AppStateType) => {
  return state.visitorsPage.pageSize;
};

export const getTotalVisitorsCount = (state: AppStateType) => {
  return state.visitorsPage.totalVisitorsCount;
};

export const getPageNumber = (state: AppStateType) => {
  return state.visitorsPage.pageNumber;
};