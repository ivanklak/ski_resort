import { AppStateType } from "./redux-store";

export const getSkipasses = (state: AppStateType) => {
  return state.skipassesPage.skipasses;
};