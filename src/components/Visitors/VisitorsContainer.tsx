import React, { useEffect, FC } from "react";
import { connect } from "react-redux";
import {
  requestVizitors,
  deleteVisitors,
  updateVisitors,
  addCoachToVisitor,
  requestVisitorsPerPage,
  addNewVisitor
} from "../../Redux/visitors-reducer";
import {
  getVisitors,
  getPageSize,
  getTotalVisitorsCount,
  getPageNumber
} from "../../Redux/visitors-selectors";
import { requestCoaches } from "../../Redux/coaches-reducer";
import Visitors from "./Visitors";
import { getAllCoaches } from "../../Redux/coaches-selectors";
import { VisitorType, CoachType, NewVisitorType, UpdateVisitorType } from "../Types/types";
import { AppStateType } from "../../Redux/redux-store";

type MapStatePropsType = {
  visitors: Array<VisitorType>;
  allCoaches: Array<CoachType>;
  pageSize: number;
  totalVisitorsCount: number;
  pageNumber: number;
};

type MapDispatchPropsType = {
  requestVizitors: () => void;
  deleteVisitors: (id: number, pageNumber?: number, pageSize?: number) => void;
  updateVisitors: (
    visitor: UpdateVisitorType,
    coachId: number,
    pageNumber: number,
    pageSize: number
  ) => void;
  addCoachToVisitor: (
    visitorId: number,
    coachId: number,
    pageNumber: number,
    pageSize: number
  ) => void;
  requestVisitorsPerPage: (pageNumber: number, pageSize: number) => void;
  addNewVisitor: (
    visitor: NewVisitorType,
    pageNumber: number,
    pageSize: number
  ) => void;
  requestCoaches: () => void;
};
type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const VisitorsContainer: FC<PropsType> = props => {
  useEffect(() => {
    props.requestVizitors();
    props.requestVisitorsPerPage(props.pageNumber, props.pageSize);
  }, []);

  useEffect(() => {
    props.requestCoaches();
  }, []);

  const onPageChanged = (pageNumber: number) => {
    props.requestVisitorsPerPage(pageNumber, props.pageSize);
  };

  return (
    <div>
      <Visitors
        visitors={props.visitors}
        allCoaches={props.allCoaches}
        deleteVisitors={props.deleteVisitors}
        updateVisitors={props.updateVisitors}
        addCoachToVisitor={props.addCoachToVisitor}
        pageNumber={props.pageNumber}
        pageSize={props.pageSize}
        totalVisitorsCount={props.totalVisitorsCount}
        onPageChanged={onPageChanged}
        addNewVisitor={props.addNewVisitor}
      />
    </div>
  );
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    visitors: getVisitors(state),
    allCoaches: getAllCoaches(state),
    pageSize: getPageSize(state),
    totalVisitorsCount: getTotalVisitorsCount(state),
    pageNumber: getPageNumber(state)
  };
};

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
  mapStateToProps,
  {
    requestVizitors,
    requestCoaches,
    deleteVisitors,
    updateVisitors,
    addCoachToVisitor,
    requestVisitorsPerPage,
    addNewVisitor
  }
)(VisitorsContainer);
