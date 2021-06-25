import React, { useEffect, FC } from "react";
import { connect } from "react-redux";
import PartOfVisitors from "./Parts/PartOfVisitors";
import PartOfCoachs from "./Parts/PartOfCoachs";
import PartOfSkipasses from "./Parts/PartOfSkipasses";
import {
  requestPieceOfVisitors,
  deleteVisitors,
  updateVisitors,
  addCoachToVisitor,
  addNewVisitor
} from "../../Redux/visitors-reducer";
import { getPieceOfVisitors } from "../../Redux/visitors-selectors";
import { requestCoaches } from "../../Redux/coaches-reducer";
import { getAllCoaches } from "../../Redux/coaches-selectors";
import { VisitorType, CoachType, UpdateVisitorType, NewVisitorType } from "../Types/types";
import { AppStateType } from "../../Redux/redux-store";

type MapStatePropsType = {
  pieceOfVisitors: Array<VisitorType>;
  allCoaches: Array<CoachType>;
};

type MapDispatchPropsType = {
  requestPieceOfVisitors: () => void;
  requestCoaches: () => void;
  addNewVisitor: (
    visitor: NewVisitorType,
    pageNumber: number,
    pageSize: number
  ) => void;
  deleteVisitors: (id: number) => void;
  addCoachToVisitor: (
    visitorId: number,
    coachId: number,
    pageNumber: number,
    pageSize: number
  ) => void;
  updateVisitors: (
    visitor: UpdateVisitorType,
    coachId: number,
    pageNumber: number,
    pageSize: number
  ) => void;
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const ProfileContainer: FC<PropsType> = props => {
  useEffect(() => {
    props.requestPieceOfVisitors();
  }, []);

  useEffect(() => {
    props.requestCoaches();
  }, []);

  return (
    <div>
      <PartOfVisitors
        pieceOfVisitors={props.pieceOfVisitors}
        deleteVisitors={props.deleteVisitors}
        allCoaches={props.allCoaches}
        updateVisitors={props.updateVisitors}
        addCoachToVisitor={props.addCoachToVisitor}
        addNewVisitor={props.addNewVisitor}
      />
      <PartOfCoachs />
      <PartOfSkipasses />
    </div>
  );
};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    pieceOfVisitors: getPieceOfVisitors(state),
    allCoaches: getAllCoaches(state)
  };
};

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
  mapStateToProps, {
  requestPieceOfVisitors,
  addNewVisitor,
  deleteVisitors,
  requestCoaches,
  updateVisitors,
  addCoachToVisitor
})(ProfileContainer);
