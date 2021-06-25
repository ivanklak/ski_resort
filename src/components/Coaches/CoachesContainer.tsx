import React, { useEffect, FC } from "react";
import Coaches from "./Coaches";
import { connect } from "react-redux";
import {
  requestCoaches,
  addNewCoach,
  deleteCoaches,
  updateCoaches,
  requestCoachesPerPage
} from "../../Redux/coaches-reducer";
import {
  getCoaches,
  getTotalCoachesCount,
  getPageSize,
  getPageNumber
} from "../../Redux/coaches-selectors";
import { CoachType, NewCoachType } from "../Types/types";
import { AppStateType } from "../../Redux/redux-store";

type MapStatePropsType = {
  coaches: Array<CoachType>;
  pageSize: number;
  totalCoachesCount: number;
  pageNumber: number;
};

type MapDispatchPropsType = {
  requestCoaches: () => void;
  requestCoachesPerPage: (pageNumber: number, pageSize: number) => void;
  addNewCoach: (coach: NewCoachType) => void;
  updateCoaches: (coach: NewCoachType) => void;
  deleteCoaches: (id: number) => void;
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const CoachesContainer: FC<PropsType> = props => {
  useEffect(() => {
    props.requestCoaches();
    props.requestCoachesPerPage(props.pageNumber, props.pageSize);
  }, []);

  const onPageChanged = (pageNumber: number) => {
    props.requestCoachesPerPage(pageNumber, props.pageSize);
  };

  return (
    <div>
      <Coaches
        coaches={props.coaches}
        addNewCoach={props.addNewCoach}
        deleteCoaches={props.deleteCoaches}
        updateCoaches={props.updateCoaches}
        pageNumber={props.pageNumber}
        pageSize={props.pageSize}
        totalCoachesCount={props.totalCoachesCount}
        onPageChanged={onPageChanged}
      />
    </div>
  );
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    coaches: getCoaches(state),
    pageSize: getPageSize(state),
    pageNumber: getPageNumber(state),
    totalCoachesCount: getTotalCoachesCount(state)
  };
};

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
  mapStateToProps, 
  {
  requestCoaches,
  addNewCoach,
  deleteCoaches,
  updateCoaches,
  requestCoachesPerPage
}
)(CoachesContainer);
