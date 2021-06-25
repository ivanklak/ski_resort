import { AppStateType } from "./redux-store";

export const getCoaches = (state: AppStateType) => {
  return state.coachesPage.coaches;
};

export const getAllCoaches = (state: AppStateType) => {
  return state.coachesPage.allCoaches;
};

export const getPageSize = (state: AppStateType) => {
  return state.coachesPage.pageSize;
};

export const getPageNumber = (state: AppStateType) => {
  return state.coachesPage.pageNumber;
};

export const getTotalCoachesCount = (state: AppStateType) => {
  return state.coachesPage.totalCoachesCount;
};